import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import "./customer-account.css";

type Customer = { name: string; email: string; createdAt: string };
type GoogleIdentity = {
  initialize: (options: { client_id: string; nonce: string; callback: (response: { credential: string }) => void }) => void;
  renderButton: (element: HTMLElement, options: Record<string, string | number>) => void;
};
declare global { interface Window { google?: { accounts: { id: GoogleIdentity } } } }
const api = (import.meta.env.VITE_NEWS_API_URL || "https://api.djelong.com").replace(/\/$/, "");
let googleScript: Promise<void> | undefined;
function loadGoogle() {
  if (window.google?.accounts.id) return Promise.resolve();
  if (!googleScript) googleScript = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => fail(), 15000);
    const fail = () => { clearTimeout(timeout); script.remove(); googleScript = undefined; reject(new Error("Google ne repond pas. Verifiez votre connexion puis reessayez.")); };
    script.src = "https://accounts.google.com/gsi/client?hl=fr";
    script.async = true;
    script.onload = () => { clearTimeout(timeout); resolve(); };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return googleScript;
}
async function request(path: string, body?: object) {
  const response = await fetch(`${api}/customer/${path}`, {
    method: body ? "POST" : "GET", credentials: "include", cache: "no-store",
    signal: AbortSignal.timeout(15000),
    ...(body ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) } : {}),
  }).catch(() => { throw new Error("Le service de connexion est indisponible. Veuillez réessayer plus tard."); });
  const data = await response.json().catch(() => { throw new Error("Le service de connexion est indisponible."); });
  if (!response.ok) throw new Error(data.error || "Connexion indisponible.");
  return data;
}

export function CustomerAccount() {
  const [user, setUser] = useState<Customer | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const button = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    const initialize = async () => {
      setBusy(true); setError("");
      try {
        const session = await request("me");
        if (cancelled) return;
        setUser(session.user);
        if (session.user) return;
        await loadGoogle();
        if (cancelled) return;
        const config = await request("google/start", {});
        if (cancelled || !button.current) return;
        window.google!.accounts.id.initialize({
          client_id: config.clientId, nonce: config.nonce,
          callback: async ({ credential }) => {
            if (cancelled) return;
            setBusy(true); setError("");
            try {
              const result = await request("google", { credential });
              if (!cancelled) setUser(result.user);
            } catch (err) { if (!cancelled) setError(err instanceof Error ? err.message : "Connexion impossible."); }
            finally { if (!cancelled) setBusy(false); }
          },
        });
        button.current.replaceChildren();
        window.google!.accounts.id.renderButton(button.current, { theme: "outline", size: "large", text: "continue_with", shape: "rectangular", width: 260, locale: "fr" });
      } catch (err) { if (!cancelled) setError(err instanceof Error ? err.message : "Connexion indisponible."); }
      finally { if (!cancelled) setBusy(false); }
    };
    void initialize();
    return () => { cancelled = true; };
  }, [attempt]);
  async function logout() {
    setBusy(true); setError("");
    try { await request("logout", {}); setUser(null); setAttempt((value) => value + 1); }
    catch { setError("Deconnexion impossible. Reessayez."); setBusy(false); }
  }
  return <main className="customer-page">
    <div className="customer-heading"><span>ESPACE CLIENT</span><h1>Mon compte</h1></div>
    <section className="customer-panel" aria-busy={busy}>
      <UserRound size={32} className="customer-symbol" />
      <h2>{user ? `Bienvenue, ${user.name}` : "Bienvenue chez Djelong"}</h2>
      {user ? <><p>{user.email}</p><p>Votre compte client est connecté avec Google.</p>
        <Link to="/contact" className="customer-contact">Contacter notre équipe</Link>
        <button className="customer-logout" disabled={busy} onClick={() => void logout()}><LogOut size={17} /> Se déconnecter</button></>
        : <><p>Connectez-vous ou créez votre compte avec Google.</p><div ref={button} className="customer-google" hidden={!!error} />
        <p className="customer-note"><ShieldCheck size={17} /> À votre première connexion, votre compte Djelong est créé automatiquement. Nous ne recevons jamais votre mot de passe Google.</p></>}
      {busy && <p role="status">Connexion en cours…</p>}
      {error && <div role="alert"><p className="customer-error">{error}</p><button className="customer-retry" disabled={busy} onClick={() => setAttempt((value) => value + 1)}>Réessayer</button></div>}
    </section>
  </main>;
}
