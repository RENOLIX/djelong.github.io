import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

let pool;

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "https://djelong.com",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

function json(statusCode, body) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify(body) };
}

function database() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT ?? 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? "djelong",
      waitForConnections: true,
      connectionLimit: 4,
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: true } : undefined,
    });
  }
  return pool;
}

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

function toNews(row) {
  return {
    id: String(row.id),
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    status: row.status,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
  };
}

export async function handler(event) {
  if (methodOf(event) === "OPTIONS") return { statusCode: 204, headers: corsHeaders, body: "" };

  try {
    const method = methodOf(event);
    const path = pathOf(event).replace(/^\/api/, "");
    const db = database();

    if (method === "POST" && path === "/auth/login") {
      const { email, password } = payload(event);
      const [rows] = await db.execute("SELECT id, email, password_hash, name FROM admin_users WHERE email = ? LIMIT 1", [email?.trim().toLowerCase()]);
      const user = rows[0];
      if (!user || !(await bcrypt.compare(password ?? "", user.password_hash))) return json(401, { message: "E-mail ou mot de passe incorrect." });
      const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "8h" });
      return json(200, { token });
    }

    if (method === "GET" && path === "/news") {
      const [rows] = await db.execute("SELECT id, title, excerpt, cover_image, published_at FROM news WHERE status = 'PUBLIE' ORDER BY published_at DESC, id DESC");
      return json(200, { items: rows.map((row) => ({ id: String(row.id), title: row.title, excerpt: row.excerpt, coverImage: row.cover_image, publishedAt: row.published_at })) });
    }

    if (!path.startsWith("/admin/news")) return json(404, { message: "Route inconnue." });
    verifiedAdmin(event);

    if (method === "GET" && path === "/admin/news") {
      const [rows] = await db.execute("SELECT id, title, excerpt, content, cover_image, status, published_at, updated_at FROM news ORDER BY updated_at DESC, id DESC");
      return json(200, { items: rows.map(toNews) });
    }

    if (method === "POST" && path === "/admin/news") {
      const item = normalizeNews(payload(event));
      const [result] = await db.execute("INSERT INTO news (title, excerpt, content, cover_image, status, published_at) VALUES (?, ?, ?, ?, ?, ?)", [item.title, item.excerpt, item.content, item.coverImage, item.status, item.publishedAt]);
      const [rows] = await db.execute("SELECT id, title, excerpt, content, cover_image, status, published_at, updated_at FROM news WHERE id = ?", [result.insertId]);
      return json(201, { item: toNews(rows[0]) });
    }

    const id = path.match(/^\/admin\/news\/(\d+)$/)?.[1];
    if (!id) return json(404, { message: "Actualité introuvable." });

    if (method === "PATCH") {
      const item = normalizeNews(payload(event));
      await db.execute("UPDATE news SET title = ?, excerpt = ?, content = ?, cover_image = ?, status = ?, published_at = ? WHERE id = ?", [item.title, item.excerpt, item.content, item.coverImage, item.status, item.publishedAt, id]);
      const [rows] = await db.execute("SELECT id, title, excerpt, content, cover_image, status, published_at, updated_at FROM news WHERE id = ?", [id]);
      return json(200, { item: toNews(rows[0]) });
    }

    if (method === "DELETE") {
      await db.execute("DELETE FROM news WHERE id = ?", [id]);
      return json(200, { deleted: true });
    }

    return json(405, { message: "Méthode non autorisée." });
  } catch (error) {
    console.error(error);
    const message = error instanceof jwt.JsonWebTokenError ? "Session invalide ou expirée." : error instanceof Error ? error.message : "Erreur serveur.";
    return json(message.includes("requis") || message.includes("champs") ? 400 : 500, { message });
  }
}
