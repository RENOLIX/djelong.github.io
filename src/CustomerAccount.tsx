import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import "./customer-account.css";

type Customer = { name: string; email: string; createdAt: string };
const api = (import.meta.env.VITE_NEWS_API_URL || "https://api.djelong.com").replace(/\/$/, "");

async function request(path: string, body?: object) {
  const response = await fetch(`${api}/customer/${path}`, { method: body ? "POST" : "GET", credentials: "include", headers: body ? { "Content-Type": "application/json" } : undefined, body: body ? JSON.stringify(body) : undefined });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Connexion impossible.");
  return data;
}

export function CustomerAccount() {
  const [user, setUser] = useState<Customer | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  useEffect(() => { request("me").then((data) => setUser(data.user)).catch(() => setError("Le service de connexion est indisponible. Veuillez réessayer plus tard.")).finally(() => setBusy(false)); }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try { const data = await request(mode === "login" ? "login" : "register", mode === "login" ? { email: form.email, password: form.password } : form); setUser(data.user); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Connexion impossible."); }
    finally { setBusy(false); }
  }
  async function logout() { setBusy(true); await request("logout", {}).catch(() => undefined); setUser(null); setBusy(false); }
  return <main className="customer-page"><div className="customer-heading"><span>ESPACE CLIENT</span><h1>Mon compte</h1></div><section className="customer-panel" aria-busy={busy}><UserRound size={32} className="customer-symbol" />
    {user ? <><h2>Bienvenue, {user.name}</h2><p>{user.email}</p><Link to="/contact" className="customer-contact">Contacter notre équipe</Link><button className="customer-logout" disabled={busy} onClick={() => void logout()}><LogOut size={17} /> Se déconnecter</button></> : <><h2>{mode === "login" ? "Connexion client" : "Créer votre compte"}</h2><form className="customer-form" onSubmit={submit}>{mode === "register" && <input required placeholder="Nom complet" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}<input required type="email" placeholder="E-mail" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><input required minLength={8} type="password" placeholder="Mot de passe (8 caractères minimum)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /><button className="customer-retry" disabled={busy}>{mode === "login" ? "Se connecter" : "Créer mon compte"}</button></form><button className="customer-switch" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>{mode === "login" ? "Créer un nouveau compte" : "J'ai déjà un compte"}</button><p className="customer-note"><ShieldCheck size={17} /> Vos identifiants sont chiffrés et protégés.</p></>}
    {error && <p className="customer-error" role="alert">{error}</p>}</section></main>;
}
