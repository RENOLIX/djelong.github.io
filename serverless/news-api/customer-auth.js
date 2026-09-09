const { randomBytes, createHash } = require("node:crypto");
const { mkdir, readFile, writeFile, rename } = require("node:fs/promises");
const { dirname } = require("node:path");
const { OAuth2Client } = require("google-auth-library");

const hash = (value) => createHash("sha256").update(value).digest("hex");
const token = () => randomBytes(32).toString("base64url");
const SESSION = "__Host-djelong-client";
const NONCE = "__Host-djelong-nonce";
const cookie = (name, value, seconds) => `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${seconds}`;
const cookies = (header = "") => Object.fromEntries(header.split(";").map((part) => part.trim().split("=")));

function createCustomerAuth({
  clientId = process.env.GOOGLE_CLIENT_ID,
  dataFile = process.env.CUSTOMER_DATA_FILE || "/opt/djelong-news-api/data/customers.json",
  origins = (process.env.CUSTOMER_ORIGINS || "https://www.djelong.com,https://djelong.com").split(","),
  verify = async (credential) => (await new OAuth2Client().verifyIdToken({ idToken: credential, audience: clientId })).getPayload(),
} = {}) {
  let queue = Promise.resolve();
  const attempts = new Map();

  // One Node process owns this file; serialize read-modify-write and replace atomically.
  function transaction(action) {
    const task = queue.then(async () => {
      let db;
      try { db = JSON.parse(await readFile(dataFile, "utf8")); }
      catch (error) {
        if (error.code !== "ENOENT") throw error;
        db = { users: [], sessions: [], nonces: [] };
      }
      db.sessions = db.sessions.filter((item) => item.expires > Date.now());
      db.nonces = db.nonces.filter((item) => item.expires > Date.now());
      const result = action(db);
      await mkdir(dirname(dataFile), { recursive: true, mode: 0o700 });
      const temporary = `${dataFile}.tmp`;
      await writeFile(temporary, JSON.stringify(db), { mode: 0o600 });
      await rename(temporary, dataFile);
      return result;
    });
    queue = task.catch(() => {});
    return task;
  }

  return async function customerAuth(event) {
    const path = event.path;
    if (!path.startsWith("/customer/")) return null;
    const origin = event.headers?.origin;
    const allowed = origins.includes(origin);
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Vary": "Origin",
      ...(allowed ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true" } : {}),
    };
    const reply = (statusCode, body, setCookies) => ({ statusCode, headers: { ...headers, ...(setCookies ? { "Set-Cookie": setCookies } : {}) }, body: JSON.stringify(body) });
    if (!allowed) return reply(403, { error: "Origine non autorisee." });
    if (event.httpMethod === "OPTIONS") return {
      statusCode: 204, headers: { ...headers, "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" }, body: "",
    };
    if (!clientId) return reply(503, { error: "La connexion Google n'est pas encore activee." });
    const jar = cookies(event.headers?.cookie);
    try {
      if (path === "/customer/me" && event.httpMethod === "GET") {
        const user = await transaction((db) => {
          const session = db.sessions.find((item) => item.hash === hash(jar[SESSION] || ""));
          return session ? db.users.find((item) => item.id === session.userId) : null;
        });
        return reply(200, { user: user ? { name: user.name, email: user.email, createdAt: user.createdAt } : null });
      }
      if (event.httpMethod !== "POST") return reply(404, { error: "Route inconnue." });
      if (!(event.headers?.["content-type"] || "").startsWith("application/json")) return reply(415, { error: "Format JSON requis." });
      if (path === "/customer/logout") {
        await transaction((db) => { db.sessions = db.sessions.filter((item) => item.hash !== hash(jar[SESSION] || "")); });
        return reply(200, { ok: true }, [cookie(SESSION, "", 0), cookie(NONCE, "", 0)]);
      }
      // Bound login attempts by the trusted socket/proxy address, never a client header.
      const now = Date.now();
      for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
      const key = event.remoteAddress || "unknown";
      const entry = attempts.get(key) || { count: 0, until: now + 60_000 };
      if (++entry.count > 20 || attempts.size > 10000) return reply(429, { error: "Trop de tentatives. Reessayez dans une minute." });
      attempts.set(key, entry);
      if (path === "/customer/google/start") {
        const nonce = token();
        await transaction((db) => {
          db.nonces = db.nonces.filter((item) => item.hash !== hash(jar[NONCE] || ""));
          db.nonces.push({ hash: hash(nonce), expires: now + 600_000 });
        });
        return reply(200, { clientId, nonce }, cookie(NONCE, nonce, 600));
      }
      if (path === "/customer/google") {
        let input;
        try { input = JSON.parse(event.body || "{}"); } catch { return reply(400, { error: "Requete invalide." }); }
        if (typeof input.credential !== "string" || input.credential.length > 16000 || !jar[NONCE]) return reply(401, { error: "Recommencez la connexion Google." });
        let identity;
        try { identity = await verify(input.credential); } catch { return reply(401, { error: "Compte Google non valide." }); }
        if (!identity?.sub || identity.email_verified !== true || !identity.email || identity.nonce !== jar[NONCE]) return reply(401, { error: "Compte Google non valide." });
        const sessionToken = token();
        const user = await transaction((db) => {
          const index = db.nonces.findIndex((item) => item.hash === hash(jar[NONCE]));
          if (index < 0) return null;
          db.nonces.splice(index, 1);
          let user = db.users.find((item) => item.googleSub === identity.sub);
          if (!user) {
            user = { id: token(), googleSub: identity.sub, createdAt: new Date().toISOString() };
            db.users.push(user);
          }
          user.name = String(identity.name || "Client Djelong").slice(0, 200);
          user.email = String(identity.email).slice(0, 320);
          db.sessions = db.sessions.filter((item) => item.hash !== hash(jar[SESSION] || ""));
          db.sessions.push({ hash: hash(sessionToken), userId: user.id, expires: Date.now() + 7 * 86400_000 });
          return { name: user.name, email: user.email, createdAt: user.createdAt };
        });
        if (!user) return reply(401, { error: "Connexion expiree. Recommencez." });
        return reply(200, { user }, [cookie(SESSION, sessionToken, 7 * 86400), cookie(NONCE, "", 0)]);
      }
      return reply(404, { error: "Route inconnue." });
    } catch {
      return reply(503, { error: "Connexion temporairement indisponible. Reessayez plus tard." });
    }
  };
}

module.exports = { createCustomerAuth };
