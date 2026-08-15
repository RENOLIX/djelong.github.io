import bcrypt from "bcryptjs";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

const require = createRequire(import.meta.url);
const ObsClient = require("esdk-obs-nodejs");

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "https://djelong.com",
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
  return jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
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
  const result = await obs.getObject({ Bucket: bucket, Key: newsKey });
  if (result.CommonMsg.Status === 404) return [];
  if (result.CommonMsg.Status >= 300) throw new Error("Impossible de lire les actualités dans OBS.");
  const content = result.InterfaceResult.Content;
  return JSON.parse(Buffer.isBuffer(content) ? content.toString("utf8") : String(content));
}

async function writeNews(items) {
  const result = await obs.putObject({
    Bucket: bucket,
    Key: newsKey,
    Body: JSON.stringify(items, null, 2),
    ContentType: "application/json; charset=utf-8",
  });
  if (result.CommonMsg.Status >= 300) throw new Error("Impossible d'enregistrer les actualités dans OBS.");
}

export async function handler(event) {
  if (methodOf(event) === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };

  try {
    const method = methodOf(event);
    const path = pathOf(event).replace(/^\/api/, "");
    if (method === "POST" && path === "/auth/login") {
      const { email, password } = payload(event);
      const isValidEmail = email?.trim().toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase();
      const isValidPassword = await bcrypt.compare(password ?? "", process.env.ADMIN_PASSWORD_HASH ?? "");
      if (!isValidEmail || !isValidPassword) return json(401, { message: "E-mail ou mot de passe incorrect." });
      const token = jwt.sign({ sub: "djelong-admin", email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET, { expiresIn: "8h" });
      return json(200, { token });
    }

    if (method === "GET" && path === "/news") {
      const items = await readNews();
      return json(200, { items: items.filter((item) => item.status === "PUBLIE").sort((a, b) => String(b.publishedAt ?? "").localeCompare(String(a.publishedAt ?? ""))).map(({ content, ...item }) => item) });
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

    const id = path.match(/^\/admin\/news\/(\d+)$/)?.[1];
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
    const message = error instanceof jwt.JsonWebTokenError ? "Session invalide ou expirée." : error instanceof Error ? error.message : "Erreur serveur.";
    return json(message.includes("requis") || message.includes("champs") ? 400 : 500, { message });
  }
}
