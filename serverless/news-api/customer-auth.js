const { randomBytes, createHash, scryptSync, timingSafeEqual } = require("node:crypto");
const { mkdir, readFile, writeFile, rename } = require("node:fs/promises");
const { dirname } = require("node:path");

const hash = (value) => createHash("sha256").update(value).digest("hex");
const token = () => randomBytes(32).toString("base64url");
const SESSION = "__Host-djelong-client";
const cookie = (name, value, seconds) => `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${seconds}`;
const cookies = (header = "") => Object.fromEntries(header.split(";").map((part) => part.trim().split("=")));

function createCustomerAuth({ dataFile = process.env.CUSTOMER_DATA_FILE || "/opt/djelong-news-api/data/customers.json", origins = (process.env.CUSTOMER_ORIGINS || "https://www.djelong.com,https://djelong.com").split(",") } = {}) {
  let queue = Promise.resolve();
  function transaction(action) {
    const task = queue.then(async () => {
      let db;
      try { db = JSON.parse(await readFile(dataFile, "utf8")); } catch (error) { if (error.code !== "ENOENT") throw error; db = { users: [], sessions: [] }; }
      db.sessions = db.sessions.filter((item) => item.expires > Date.now());
      const result = action(db);
      await mkdir(dirname(dataFile), { recursive: true, mode: 0o700 });
      await writeFile(`${dataFile}.tmp`, JSON.stringify(db), { mode: 0o600 });
      await rename(`${dataFile}.tmp`, dataFile);
      return result;
    });
    queue = task.catch(() => {});
    return task;
  }
  return async function customerAuth(event) {
    if (!event.path.startsWith("/customer/")) return null;
    const origin = event.headers?.origin;
    const allowed = origins.includes(origin);
    const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", Vary: "Origin", ...(allowed ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Credentials": "true" } : {}) };
    const reply = (statusCode, body, setCookie) => ({ statusCode, headers: { ...headers, ...(setCookie ? { "Set-Cookie": setCookie } : {}) }, body: JSON.stringify(body) });
    if (!allowed) return reply(403, { error: "Origine non autorisee." });
    if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: { ...headers, "Access-Control-Allow-Methods": "GET,POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type" }, body: "" };
    const jar = cookies(event.headers?.cookie);
    try {
      if (event.path === "/customer/me" && event.httpMethod === "GET") {
        const user = await transaction((db) => { const session = db.sessions.find((item) => item.hash === hash(jar[SESSION] || "")); return session && db.users.find((item) => item.id === session.userId); });
        return reply(200, { user: user ? { name: user.name, email: user.email, createdAt: user.createdAt } : null });
      }
      if (event.path === "/customer/logout" && event.httpMethod === "POST") {
        await transaction((db) => { db.sessions = db.sessions.filter((item) => item.hash !== hash(jar[SESSION] || "")); });
        return reply(200, { ok: true }, cookie(SESSION, "", 0));
      }
      if (event.httpMethod !== "POST") return reply(404, { error: "Route inconnue." });
      let input; try { input = JSON.parse(event.body || "{}"); } catch { return reply(400, { error: "Requete invalide." }); }
      const email = String(input.email || "").trim().toLowerCase(); const password = String(input.password || "");
      if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return reply(400, { error: "Saisissez un e-mail valide et un mot de passe d'au moins 8 caracteres." });
      if (event.path === "/customer/register") {
        const name = String(input.name || "Client Djelong").trim().slice(0, 100) || "Client Djelong";
        const user = await transaction((db) => { if (db.users.some((item) => item.email === email)) return null; const salt = token(); const user = { id: token(), name, email, password: `${salt}:${scryptSync(password, salt, 64).toString("hex")}`, createdAt: new Date().toISOString() }; db.users.push(user); return user; });
        if (!user) return reply(409, { error: "Un compte existe deja avec cet e-mail." });
        const sessionToken = token(); await transaction((db) => db.sessions.push({ hash: hash(sessionToken), userId: user.id, expires: Date.now() + 7 * 86400_000 }));
        return reply(201, { user: { name: user.name, email: user.email, createdAt: user.createdAt } }, cookie(SESSION, sessionToken, 7 * 86400));
      }
      if (event.path === "/customer/login") {
        const user = await transaction((db) => db.users.find((item) => item.email === email));
        if (!user) return reply(401, { error: "E-mail ou mot de passe incorrect." });
        const [salt, stored] = user.password.split(":"); const calculated = scryptSync(password, salt, 64).toString("hex");
        if (!timingSafeEqual(Buffer.from(stored), Buffer.from(calculated))) return reply(401, { error: "E-mail ou mot de passe incorrect." });
        const sessionToken = token(); await transaction((db) => db.sessions.push({ hash: hash(sessionToken), userId: user.id, expires: Date.now() + 7 * 86400_000 }));
        return reply(200, { user: { name: user.name, email: user.email, createdAt: user.createdAt } }, cookie(SESSION, sessionToken, 7 * 86400));
      }
      return reply(404, { error: "Route inconnue." });
    } catch { return reply(503, { error: "Connexion temporairement indisponible. Reessayez plus tard." }); }
  };
}
module.exports = { createCustomerAuth };
