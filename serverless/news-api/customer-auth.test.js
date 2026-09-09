const { test } = require("node:test");
const assert = require("node:assert/strict");
const { mkdtemp, readFile, rm } = require("node:fs/promises");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const { createCustomerAuth } = require("./customer-auth");

test("Google customer sessions: validation, isolation, persistence and logout", async () => {
  const dir = await mkdtemp(join(tmpdir(), "djelong-auth-"));
  try {
    let identity;
    const options = {
      clientId: "test-client", dataFile: join(dir, "customers.json"),
      verify: async (credential) => { if (credential === "invalid") throw new Error("invalid signature"); return identity; },
    };
    const auth = createCustomerAuth(options);
    const event = (path, body, cookie = "", origin = "https://www.djelong.com") => ({
      path: `/customer/${path}`, httpMethod: body ? "POST" : "GET",
      headers: { origin, cookie, "content-type": "application/json" }, body: body && JSON.stringify(body), remoteAddress: "test-ip",
    });
    const start = await auth(event("google/start", {}));
    assert.equal(start.statusCode, 200);
    const { nonce } = JSON.parse(start.body);
    const nonceCookie = start.headers["Set-Cookie"].split(";")[0];
    assert.match(start.headers["Set-Cookie"], /HttpOnly; Secure; SameSite=Lax/);
    assert.equal((await auth(event("google/start", {}, "", "https://evil.example"))).statusCode, 403);
    assert.equal((await auth(event("google", { credential: "invalid" }, nonceCookie))).statusCode, 401);
    identity = { sub: "google-user", email: "client@gmail.com", email_verified: true, name: "Client", nonce: "wrong" };
    assert.equal((await auth(event("google", { credential: "valid" }, nonceCookie))).statusCode, 401);
    identity.nonce = nonce;
    identity.email_verified = false;
    assert.equal((await auth(event("google", { credential: "valid" }, nonceCookie))).statusCode, 401);
    identity.email_verified = true;
    const login = await auth(event("google", { credential: "valid" }, nonceCookie));
    assert.equal(login.statusCode, 200);
    const sessionCookie = login.headers["Set-Cookie"][0].split(";")[0];
    assert.equal(JSON.parse(login.body).user.email, "client@gmail.com");
    assert.equal(JSON.parse(login.body).user.googleSub, undefined);
    assert.equal((await auth(event("google", { credential: "valid" }, nonceCookie))).statusCode, 401, "nonce cannot be replayed");
    const persisted = await readFile(options.dataFile, "utf8");
    assert.ok(!persisted.includes(sessionCookie.split("=")[1]), "store only hashed sessions");
    const restarted = createCustomerAuth(options);
    assert.equal(JSON.parse((await restarted(event("me", undefined, sessionCookie))).body).user.name, "Client");
    assert.equal(JSON.parse((await restarted(event("me", undefined, "__Host-djelong-client=forged"))).body).user, null);
    await restarted(event("logout", {}, sessionCookie));
    assert.equal(JSON.parse((await restarted(event("me", undefined, sessionCookie))).body).user, null);
    assert.equal(await auth({ path: "/admin/news" }), null, "admin uses a separate handler");
    const next = await auth(event("google/start", {}));
    identity.nonce = JSON.parse(next.body).nonce;
    await auth(event("google", { credential: "valid" }, next.headers["Set-Cookie"].split(";")[0]));
    assert.equal(JSON.parse(await readFile(options.dataFile, "utf8")).users.length, 1, "returning users do not create duplicates");
    const missing = createCustomerAuth({ clientId: "" });
    assert.equal((await missing(event("google/start", {}))).statusCode, 503);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
