const { createHmac, randomUUID, scryptSync, timingSafeEqual } = require("node:crypto");
const { mkdir, readFile, rename, writeFile } = require("node:fs/promises");
const { dirname, extname, join } = require("node:path");
let ObsClient;
try {
  ObsClient = require("obs_client");
} catch {
  ObsClient = require("esdk-obs-nodejs");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "https://www.djelong.com",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

function json(statusCode, body) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify(body) };
}

const obs = new ObsClient({
  access_key_id: process.env.OBS_ACCESS_KEY_ID,
  secret_access_key: process.env.OBS_SECRET_ACCESS_KEY,
  server: process.env.OBS_ENDPOINT ?? "https://obs.af-south-1.myhuaweicloud.com",
});

const bucket = process.env.OBS_BUCKET ?? "djelong-papiers-web-2026";
const newsKey = "admin/news.json";
const localNewsFile = process.env.NEWS_DATA_FILE;
const initialNewsFile = process.env.INITIAL_NEWS_FILE;
const uploadsDirectory = process.env.UPLOADS_DIR ?? "/opt/djelong-news-api/uploads";
const publicApiUrl = (process.env.PUBLIC_API_URL ?? "https://api.djelong.com").replace(/\/$/, "");
const imageExtensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

function payload(event) {
  if (!event.body) return {};
  return typeof event.body === "string" ? JSON.parse(event.body) : event.body;
}

function pathOf(event) {
  return event.rawPath ?? event.path ?? event.requestContext?.http?.path ?? "/";
}

function methodOf(event) {
  return event.requestContext?.http?.method ?? event.httpMethod ?? "GET";
}

function verifiedAdmin(event) {
  const authorization = event.headers?.authorization ?? event.headers?.Authorization;
  if (!authorization?.startsWith("Bearer ")) throw new Error("Accès administrateur requis.");
  const [encodedPayload, signature] = authorization.slice(7).split(".");
  const expected = createHmac("sha256", process.env.JWT_SECRET).update(encodedPayload).digest("base64url");
  if (!signature || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error("Session invalide ou expirée.");
  const session = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
  if (!session.exp || Date.now() > session.exp) throw new Error("Session invalide ou expirée.");
  return session;
}

function passwordIsValid(password) {
  const [salt, storedHash] = (process.env.ADMIN_PASSWORD_HASH ?? "").split(":");
  if (!salt || !storedHash) return false;
  const calculatedHash = scryptSync(password ?? "", salt, 64).toString("hex");
  return timingSafeEqual(Buffer.from(calculatedHash), Buffer.from(storedHash));
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({ sub: "djelong-admin", exp: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  const signature = createHmac("sha256", process.env.JWT_SECRET).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function normalizeNews(input) {
  const status = input.status === "PUBLIE" ? "PUBLIE" : "BROUILLON";
  if (!input.title?.trim() || !input.excerpt?.trim() || !input.content?.trim() || !input.coverImage?.trim()) {
    throw new Error("Tous les champs de l'actualité sont requis.");
  }
  return {
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content.trim(),
    coverImage: input.coverImage.trim(),
    status,
    publishedAt: input.publishedAt ? new Date(input.publishedAt) : status === "PUBLIE" ? new Date() : null,
  };
}

async function readNews() {
  if (localNewsFile) return readLocalNews();
  const result = await obs.getObject({ Bucket: bucket, Key: newsKey });
  if (result.CommonMsg.Status === 404) return readLocalNews();
  if (result.CommonMsg.Status >= 300) {
    console.error("OBS getObject failed", {
      status: result.CommonMsg.Status,
      code: result.CommonMsg.Code,
      message: result.CommonMsg.Message,
    });
    return readLocalNews();
  }
  const content = result.InterfaceResult.Content;
  return JSON.parse(Buffer.isBuffer(content) ? content.toString("utf8") : String(content));
}

async function writeNews(items) {
  if (localNewsFile) {
    await writeLocalNews(items);
    return;
  }
  const result = await obs.putObject({
    Bucket: bucket,
    Key: newsKey,
    Body: JSON.stringify(items, null, 2),
    ContentType: "application/json; charset=utf-8",
  });
  if (result.CommonMsg.Status < 300) return;
  await writeLocalNews(items);
}

async function readLocalNews() {
  if (!localNewsFile) throw new Error("Impossible de lire les actualités dans OBS.");
  try {
    const items = JSON.parse(await readFile(localNewsFile, "utf8"));
    if (items.length || !initialNewsFile) return items;
    return JSON.parse(await readFile(initialNewsFile, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT" && initialNewsFile) return JSON.parse(await readFile(initialNewsFile, "utf8"));
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function writeLocalNews(items) {
  if (!localNewsFile) throw new Error("Impossible d'enregistrer les actualités dans OBS.");
  await mkdir(dirname(localNewsFile), { recursive: true });
  const temporaryPath = `${localNewsFile}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(items, null, 2), "utf8");
  await rename(temporaryPath, localNewsFile);
}

async function storeUpload(input) {
  const mimeType = String(input.mimeType ?? "").toLowerCase();
  const extension = imageExtensions[mimeType];
  const content = String(input.content ?? "");
  if (!extension || !content) throw new Error("Choisissez une image JPG, PNG ou WebP.");

  const file = Buffer.from(content, "base64");
  if (!file.length || file.length > 6 * 1024 * 1024) throw new Error("L'image doit faire moins de 6 Mo.");

  await mkdir(uploadsDirectory, { recursive: true });
  const filename = `${randomUUID()}${extension}`;
  await writeFile(join(uploadsDirectory, filename), file);
  return `${publicApiUrl}/uploads/${filename}`;
}

exports.handler = async function handler(event) {
  if (methodOf(event) === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };

  try {
    const method = methodOf(event);
    const path = pathOf(event).replace(/^\/api/, "");
    if (method === "POST" && path === "/auth/login") {
      const { email, password } = payload(event);
      const isValidEmail = email?.trim().toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
      const isValidPassword = passwordIsValid(password);
      if (!isValidEmail || !isValidPassword) return json(401, { message: "E-mail ou mot de passe incorrect." });
      const token = createToken();
      return json(200, { token });
    }

    if (method === "GET" && path === "/news") {
      const items = await readNews();
      return json(200, { items: items.filter((item) => item.status === "PUBLIE").sort((a, b) => String(b.publishedAt ?? "").localeCompare(String(a.publishedAt ?? ""))).map(({ content, ...item }) => item) });
    }

    if (method === "POST" && path === "/admin/uploads") {
      verifiedAdmin(event);
      const imageUrl = await storeUpload(payload(event));
      return json(201, { imageUrl });
    }

    if (!path.startsWith("/admin/news")) return json(404, { message: "Route inconnue." });
    verifiedAdmin(event);

    if (method === "GET" && path === "/admin/news") {
      const items = await readNews();
      return json(200, { items: items.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))) });
    }

    if (method === "POST" && path === "/admin/news") {
      const item = normalizeNews(payload(event));
      const items = await readNews();
      const created = { id: randomUUID(), ...item, updatedAt: new Date().toISOString() };
      await writeNews([created, ...items]);
      return json(201, { item: created });
    }

    const id = path.match(/^\/admin\/news\/([^/]+)$/)?.[1];
    if (!id) return json(404, { message: "Actualité introuvable." });

    if (method === "PATCH") {
      const item = normalizeNews(payload(event));
      const items = await readNews();
      const updated = { id, ...item, updatedAt: new Date().toISOString() };
      if (!items.some((news) => news.id === id)) return json(404, { message: "Actualité introuvable." });
      await writeNews(items.map((news) => news.id === id ? updated : news));
      return json(200, { item: updated });
    }

    if (method === "DELETE") {
      const items = await readNews();
      await writeNews(items.filter((news) => news.id !== id));
      return json(200, { deleted: true });
    }

    return json(405, { message: "Méthode non autorisée." });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erreur serveur.";
    return json(message.includes("requis") || message.includes("champs") ? 400 : 500, { message });
  }
};
