import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  FileText,
  Globe2,
  Layers3,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  PackageCheck,
  Phone,
  Recycle,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const phone = "0563042689";
const mapUrl = "https://maps.apple/p/U4_5vMcmMDYBYU";

const images = {
  logo: asset("images/hero/djelong-logo-reference.jpeg"),
  gate: asset("images/hero/djelong-factory-gate.png"),
  production: asset("images/hero/paper-production-line.png"),
  logistics: asset("images/hero/paper-logistics-warehouse.png"),
};

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Actualités", path: "/actualites" },
  { label: "Sites", path: "/sites" },
  { label: "Durabilité", path: "/durabilite" },
  { label: "Investisseurs", path: "/investisseurs" },
  { label: "Contact", path: "/contact" },
];

const heroSlides = [
  {
    image: images.gate,
    eyebrow: "Transformation industrielle du papier",
    title: "Djelong Papiers",
    text: "Fabrication et transformation de produits en papier pour les industriels, distributeurs, collectivités et clients professionnels.",
  },
  {
    image: images.production,
    eyebrow: "Production et finition",
    title: "Des produits papier réguliers, propres et prêts à livrer",
    text: "De la matière au format fini : découpe, façonnage, contrôle, emballage et préparation des lots avec une logique industrielle.",
  },
  {
    image: images.logistics,
    eyebrow: "Stockage et logistique",
    title: "Une organisation pensée pour les commandes professionnelles",
    text: "Conditionnement, palettes, étiquetage et suivi des commandes pour garder une livraison claire et maîtrisée.",
  },
];

const productLines = [
  {
    title: "Papier destiné à la transformation",
    text: "Supports papier pour découpe, façonnage, intercalaires, bobinage, emballage et besoins techniques.",
    icon: Layers3,
  },
  {
    title: "Produits papier pour professionnels",
    text: "Articles papier destinés aux entreprises, distributeurs, administrations, commerces et usages de service.",
    icon: PackageCheck,
  },
  {
    title: "Conditionnement et formats",
    text: "Mise en format, préparation des colis, regroupement par lots et présentation adaptée au circuit de vente.",
    icon: ClipboardCheck,
  },
  {
    title: "Demandes spécifiques",
    text: "Étude de formats, quantités, finition, grammage et contraintes de livraison selon le cahier des charges.",
    icon: Award,
  },
];

const strengths = [
  "Transformation industrielle du papier",
  "Fabrication de divers produits en papiers",
  "Préparation de lots professionnels",
  "Conditionnement propre et régulier",
  "Approche qualité par contrôle visuel et dimensionnel",
  "Organisation logistique pour commandes B2B",
  "Accompagnement des demandes sur mesure",
  "Communication directe avec le service commercial",
];

const roadmap = [
  {
    title: "Réception et sélection matière",
    text: "Contrôle de la matière entrante, vérification de l'état des bobines ou supports papier et préparation selon le produit à fabriquer.",
  },
  {
    title: "Réglage de la série",
    text: "Définition du format, du conditionnement, de la quantité et des paramètres de transformation avant lancement.",
  },
  {
    title: "Transformation papier",
    text: "Découpe, refente, façonnage, pliage, assemblage ou préparation selon la famille de produit et l'usage final.",
  },
  {
    title: "Contrôle et tri",
    text: "Vérification de la propreté, de l'aspect, des dimensions, de la régularité et du conditionnement avant validation.",
  },
  {
    title: "Emballage et stockage",
    text: "Mise en paquet, étiquetage, regroupement des lots et organisation du stockage pour faciliter l'expédition.",
  },
  {
    title: "Livraison client",
    text: "Préparation de la commande, coordination commerciale et orientation vers l'itinéraire ou le point de retrait communiqué.",
  },
];

const news = [
  {
    image: images.production,
    date: "Juillet 2026",
    title: "Mise en avant de l'identité Djelong Papiers",
    text: "La nouvelle présence digitale présente l'activité de transformation industrielle, les engagements qualité et les services pour clients professionnels.",
  },
  {
    image: images.logistics,
    date: "Juin 2026",
    title: "Organisation commerciale et logistique",
    text: "Djelong Papiers structure la présentation de ses services pour faciliter les demandes de prix, les commandes et les projets sur mesure.",
  },
  {
    image: images.gate,
    date: "Mai 2026",
    title: "Communication autour du site industriel",
    text: "Les pages corporate valorisent la production, le stockage, la durabilité, la qualité et les contacts utiles pour les partenaires.",
  },
];

const sustainability = [
  { title: "Matière valorisée", text: "Limiter les pertes, mieux organiser les formats et privilégier une transformation utile.", icon: Recycle },
  { title: "Production responsable", text: "Préparer les séries avec rigueur pour réduire les erreurs, reprises et déchets évitables.", icon: Leaf },
  { title: "Sécurité d'atelier", text: "Présenter une culture de travail organisée autour des procédures, zones et consignes.", icon: ShieldCheck },
  { title: "Livraison maîtrisée", text: "Limiter les ruptures de communication grâce à un contact clair et un suivi commercial direct.", icon: Truck },
];

const aboutBlocks = [
  {
    title: "Notre activité",
    text: "Djelong Papiers est spécialisée dans la transformation industrielle du papier et la fabrication de divers produits en papiers destinés aux usages professionnels.",
  },
  {
    title: "Notre promesse",
    text: "Produire des articles réguliers, bien présentés et adaptés aux attentes des clients : formats, conditionnement, volumes et délais.",
  },
  {
    title: "Notre méthode",
    text: "Comprendre le besoin, préparer la série, transformer la matière, contrôler la finition, conditionner et organiser la remise ou livraison.",
  },
  {
    title: "Notre relation client",
    text: "Un contact direct, simple et commercial : téléphone, formulaire, demande de devis et lien de localisation pour faciliter l'échange.",
  },
];

const investorBlocks = [
  {
    title: "Positionnement",
    text: "Une entreprise locale orientée vers la transformation papier, les produits professionnels, les formats adaptés et la relation B2B.",
  },
  {
    title: "Axes de développement",
    text: "Renforcer la visibilité commerciale, améliorer la présentation des gammes, structurer la demande client et consolider les canaux de contact.",
  },
  {
    title: "Différenciation",
    text: "Une identité visuelle verte, associée au papier, à la feuille, à la qualité et à une image d'entreprise sérieuse.",
  },
  {
    title: "Communication",
    text: "Un site complet qui présente l'entreprise, l'actualité, les sites, la durabilité, le contact et les informations utiles aux partenaires.",
  },
];

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function useScrollReveal() {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 84%" },
          },
        );
      });
    });

    return () => context.revert();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-white/86 px-4 py-3 shadow-[0_14px_42px_rgba(9,46,31,0.16)] backdrop-blur-2xl rounded-lg">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={images.logo} alt="Logo Djelong Papiers" className="h-12 w-12 rounded-lg object-cover" />
          <span className="min-w-0">
            <span className="block text-base font-black text-[#17492f]">Djelong Papiers</span>
            <span className="block text-xs text-[#486c59]">Transformation industrielle</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `px-3 py-2 text-sm font-bold transition rounded-lg ${
                  isActive ? "bg-[#17492f] text-white" : "text-[#274b38] hover:bg-[#e8efe9]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="btn-creuse grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Ouvrir le menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 grid max-w-7xl gap-1 bg-white/92 p-2 shadow-xl backdrop-blur-xl lg:hidden rounded-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `px-3 py-3 text-sm font-bold transition rounded-lg ${
                  isActive ? "bg-[#17492f] text-white" : "text-[#274b38] hover:bg-[#e8efe9]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[96svh] overflow-hidden bg-[#0b2f20] text-white">
      {heroSlides.map((item, index) => (
        <img
          key={item.image}
          src={item.image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,19,0.93),rgba(5,30,19,0.62)_48%,rgba(5,30,19,0.16))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,30,19,0.18),rgba(5,30,19,0.1)_55%,rgba(5,30,19,0.86))]" />

      <div className="relative mx-auto flex min-h-[96svh] max-w-7xl items-end px-5 pb-16 pt-32 sm:px-8">
        <div className="max-w-4xl">
          <div className="reveal mb-5 inline-flex items-center gap-2 bg-white/12 px-3 py-2 text-sm font-bold backdrop-blur-xl rounded-lg">
            <Sparkles size={16} />
            {slide.eyebrow}
          </div>
          <h1 className="hero-title reveal font-black leading-[0.94] text-white">{slide.title}</h1>
          <p className="reveal mt-6 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">{slide.text}</p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white px-5 py-3 font-black text-[#17492f] transition hover:bg-[#dce9dd] rounded-lg">
              Demander un devis <ArrowRight size={18} />
            </Link>
            <a href={`tel:${phone}`} className="inline-flex items-center gap-2 bg-white/12 px-5 py-3 font-black text-white backdrop-blur-xl transition hover:bg-white/22 rounded-lg">
              Appeler {phone}
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.eyebrow}
              aria-label={`Hero ${index + 1}`}
              onClick={() => setActive(index)}
              className={`hero-dot ${active === index ? "hero-dot-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-black uppercase text-[#2c7a4b]">{eyebrow}</p>
      <h2 className={`text-3xl font-black sm:text-5xl ${dark ? "text-white" : "text-[#133f2a]"}`}>{title}</h2>
      <p className={`mt-5 text-lg leading-8 ${dark ? "text-white/76" : "text-[#536a5e]"}`}>{text}</p>
    </div>
  );
}

function SoftCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="reveal btn-card p-6">
      <div className="mb-5 grid h-12 w-12 place-items-center bg-[#17492f] text-white rounded-lg">
        <Icon size={22} />
      </div>
      <h3 className="text-2xl font-black text-[#133f2a]">{title}</h3>
      <p className="mt-3 leading-7 text-[#536a5e]">{text}</p>
    </article>
  );
}

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Activité"
            title="Transformation industrielle du papier"
            text="Djelong Papiers accompagne les besoins professionnels en transformation, fabrication, conditionnement et préparation de produits papier."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productLines.map((item) => (
              <SoftCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#133f2a] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="reveal">
            <p className="text-sm font-black uppercase text-[#a7d8ad]">Entreprise réputée</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Une image plus sérieuse, plus verte, plus industrielle.</h2>
            <p className="mt-5 leading-8 text-white/76">
              La charte reprend l'esprit du logo : papier, feuille, vert profond, sobriété et confiance. Le site parle aux clients qui veulent comprendre l'activité avant d'appeler.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {strengths.map((item) => (
              <div key={item} className="dark-pill">
                <CheckCircle2 size={18} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="reveal overflow-hidden rounded-lg">
            <img src={images.production} alt="Ligne de production papier Djelong" className="h-[560px] w-full object-cover" />
          </div>
          <div className="btn-card reveal p-7">
            <p className="text-sm font-black uppercase text-[#2c7a4b]">Production</p>
            <h2 className="mt-3 text-4xl font-black text-[#133f2a]">Du support papier au produit prêt à livrer.</h2>
            <p className="mt-5 leading-8 text-[#536a5e]">
              Réception matière, préparation de série, transformation, contrôle, conditionnement et stockage : la présentation met en avant un flux clair et crédible.
            </p>
          </div>
        </div>
      </section>

      <RoadmapBlock />
      <NewsPreview />
      <ContactSection />
    </>
  );
}

function RoadmapBlock() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ballRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    const svg = pathRef.current;
    if (!element || !svg) return;

    const length = svg.getTotalLength();
    svg.style.strokeDasharray = String(length);
    svg.style.strokeDashoffset = String(length);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const draw = length * self.progress;
          svg.style.strokeDashoffset = String(length - draw);
        },
        onToggle: (self) => {
          if (ballRef.current) ballRef.current.style.opacity = self.isActive ? "0" : "1";
        },
      },
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="bg-[#ecf0f3] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Processus"
          title="La trajectoire Djelong"
          text="Un parcours clair depuis la matière jusqu'à la livraison, avec les cartes de droite volontairement plus éloignées pour respirer."
        />
        <div ref={containerRef} className="relative mt-16">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-16 -translate-x-1/2 text-[#2c7a4b] lg:block">
            <div ref={ballRef} className="roadmap-ball" />
            <svg viewBox="0 0 52 2047" fill="none" className="h-full w-full">
              <path
                ref={pathRef}
                strokeWidth="6"
                className="svg-path"
                d="M26 0V314C12 314 1 326 1 339C1 352 11 364 26 364C41 364 51 353 51 339C51 325 28 318 26 339V636V654.5C13.5 654.5 1 664 1 679C1 694 12 703 26 703C40 703 50.5 692.5 50.5 679C49.2307 664.367 26 660 26 679V979V994.5C13.5 994.5 0.999993 1003.5 1 1019C1.00001 1034.5 12.3457 1044.15 26 1043.5C36.5163 1043 50.4852 1035.18 50.5 1019C50.5148 1002.82 28.4963 1000.64 26 1019V1327C26 1327 26 1333.7 26 1338C13 1338 1 1348.5 1 1363C1 1377.5 13.5 1388 26 1388C38.5 1388 50.9422 1381.19 51 1363C51.0578 1344.81 26 1346 26 1363C26 1380 26 1670 26 1670V1678.5C12.5 1678.5 1 1687.5 1 1703C1 1718.5 14 1727.5 26 1727.5C38 1727.5 50.5 1719 50.5 1703C50.5 1687 26 1687 26 1703C26 1719 26 2049 26 2049"
                stroke="currentColor"
              />
            </svg>
          </div>
          <div className="grid gap-8">
            {roadmap.map((item, index) => (
              <article key={item.title} className={`reveal grid lg:grid-cols-2 ${index % 2 === 0 ? "lg:pr-20" : "lg:pl-32"}`}>
                <div className={`btn-card p-6 ${index % 2 === 0 ? "lg:w-[86%]" : "lg:col-start-2 lg:ml-auto lg:w-[86%]"}`}>
                  <p className="text-sm font-black text-[#2c7a4b]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-black text-[#133f2a]">{item.title}</h3>
                  <p className="mt-3 leading-8 text-[#536a5e]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsPreview() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Actualités"
          title="Actualités de l'entreprise"
          text="Des cartes simples, professionnelles, illustrées et orientées communication corporate."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="reveal overflow-hidden bg-white shadow-[0_16px_42px_rgba(19,63,42,0.12)] rounded-lg">
              <img src={item.image} alt="" className="h-56 w-full object-cover" />
              <div className="p-6">
                <p className="text-sm font-black text-[#2c7a4b]">{item.date}</p>
                <h3 className="mt-3 text-2xl font-black text-[#133f2a]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#536a5e]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-[#dfe7e1] px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal">
          <p className="text-sm font-black uppercase text-[#2c7a4b]">Contact</p>
          <h2 className="mt-3 text-4xl font-black text-[#133f2a]">Demande commerciale ou projet sur mesure</h2>
          <p className="mt-5 leading-8 text-[#536a5e]">
            Envoyez le type de produit papier recherché, la quantité estimée, le format, l'usage et le délai. L'équipe Djelong Papiers peut revenir vers vous pour clarifier la demande.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={`tel:${phone}`} className="btn-card p-5 font-black text-[#133f2a]">
              <Phone className="mb-3" />
              {phone}
            </a>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="btn-card p-5 font-black text-[#133f2a]">
              <MapPin className="mb-3" />
              Ouvrir Apple Maps
            </a>
          </div>
          <div className="map-panel mt-6">
            <MapPin size={34} />
            <div>
              <p className="font-black">Localisation Djelong Papiers</p>
              <p className="text-sm text-white/76">Lien officiel fourni par l'entreprise via Apple Maps.</p>
            </div>
          </div>
        </div>

        <form className="reveal bg-white p-6 shadow-[0_18px_46px_rgba(19,63,42,0.14)] rounded-lg" action="mailto:contact@djelong-papiers.dz" method="post" encType="text/plain">
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-black text-[#133f2a]">
              Nom et entreprise
              <input name="Nom et entreprise" required className="form-field" placeholder="Votre nom / société" />
            </label>
            <label className="grid gap-2 text-sm font-black text-[#133f2a]">
              Téléphone
              <input name="Téléphone" required className="form-field" placeholder="Votre numéro" />
            </label>
            <label className="grid gap-2 text-sm font-black text-[#133f2a]">
              Type de besoin
              <select name="Type de besoin" className="form-field">
                <option>Transformation papier</option>
                <option>Produits papier professionnels</option>
                <option>Conditionnement</option>
                <option>Demande sur mesure</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black text-[#133f2a]">
              Message
              <textarea name="Message" required rows={6} className="form-field" placeholder="Formats, quantités, délai, usage..." />
            </label>
            <button className="inline-flex items-center justify-center gap-2 bg-[#17492f] px-5 py-3 font-black text-white rounded-lg">
              Envoyer la demande <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function AboutPage() {
  useScrollReveal();
  return (
    <>
      <PageHero title="À propos de Djelong Papiers" subtitle="Une entreprise de transformation industrielle du papier avec une identité claire, verte et professionnelle." image={images.logo} icon={Building2} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="btn-card reveal p-7">
            <p className="text-sm font-black uppercase text-[#2c7a4b]">Message du PDG</p>
            <h2 className="mt-3 text-4xl font-black text-[#133f2a]">“Notre ambition est de faire de Djelong Papiers un partenaire fiable pour chaque client professionnel.”</h2>
            <p className="mt-5 leading-8 text-[#536a5e]">
              Chez Djelong Papiers, nous croyons qu'un produit papier réussi commence par une matière bien choisie, une transformation maîtrisée et une relation client directe. Notre objectif est simple : livrer des produits réguliers, propres et adaptés aux besoins du marché.
            </p>
            <p className="mt-5 font-black text-[#17492f]">Direction générale — Djelong Papiers</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {aboutBlocks.map((item) => (
              <article key={item.title} className="btn-card reveal p-6">
                <h3 className="text-2xl font-black text-[#133f2a]">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#536a5e]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({ title, subtitle, image, icon: Icon }: { title: string; subtitle: string; image: string; icon: LucideIcon }) {
  return (
    <section className="relative min-h-[60svh] overflow-hidden bg-[#0b2f20] px-5 pb-16 pt-36 text-white sm:px-8">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-44" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,19,0.94),rgba(5,30,19,0.64))]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="reveal grid h-14 w-14 place-items-center bg-white/12 backdrop-blur-xl rounded-lg">
          <Icon size={26} />
        </div>
        <h1 className="reveal mt-6 max-w-4xl text-4xl font-black sm:text-6xl">{title}</h1>
        <p className="reveal mt-6 max-w-3xl text-lg leading-8 text-white/78">{subtitle}</p>
      </div>
    </section>
  );
}

function SimplePage({ type }: { type: "actualites" | "sites" | "durabilite" | "investisseurs" | "contact" }) {
  useScrollReveal();
  if (type === "actualites") {
    return (
      <>
        <PageHero title="Actualités" subtitle="La communication officielle de Djelong Papiers : production, organisation, qualité et relation client." image={images.logistics} icon={Newspaper} />
        <NewsPreview />
      </>
    );
  }
  if (type === "contact") {
    return (
      <>
        <PageHero title="Contact" subtitle="Un formulaire clair, un téléphone direct et un lien Apple Maps pour localiser l'entreprise." image={images.gate} icon={Mail} />
        <ContactSection />
      </>
    );
  }
  const pageData = {
    sites: {
      title: "Sites et organisation",
      subtitle: "Présentation des zones clés : réception matière, production, contrôle, stockage et expédition.",
      image: images.logistics,
      icon: MapPin,
      blocks: [
        ["Réception matière", "Préparation et vérification des supports papier avant transformation."],
        ["Atelier de transformation", "Zone dédiée aux opérations de découpe, façonnage, préparation et conditionnement."],
        ["Contrôle", "Vérification de l'aspect, des dimensions, de la propreté et de la conformité de présentation."],
        ["Expédition", "Préparation des lots, palettes et commandes destinées aux clients professionnels."],
      ],
    },
    durabilite: {
      title: "Durabilité",
      subtitle: "Une logique plus responsable : valoriser la matière, limiter les pertes et améliorer l'organisation.",
      image: images.production,
      icon: Leaf,
      blocks: sustainability.map((item) => [item.title, item.text]),
    },
    investisseurs: {
      title: "Investisseurs et partenaires",
      subtitle: "Une lecture corporate pour comprendre le positionnement, les axes de croissance et la vision Djelong.",
      image: images.logo,
      icon: BarChart3,
      blocks: investorBlocks.map((item) => [item.title, item.text]),
    },
  }[type];

  return (
    <>
      <PageHero title={pageData.title} subtitle={pageData.subtitle} image={pageData.image} icon={pageData.icon} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          {pageData.blocks.map(([title, text]) => (
            <article key={title} className="btn-card reveal p-6">
              <h3 className="text-2xl font-black text-[#133f2a]">{title}</h3>
              <p className="mt-3 leading-8 text-[#536a5e]">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <FileText className="mx-auto text-[#17492f]" size={48} />
        <h1 className="mt-5 text-4xl font-black text-[#133f2a]">Page introuvable</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 bg-[#17492f] px-5 py-3 font-black text-white rounded-lg">
          Retour accueil <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0b2f20] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <img src={images.logo} alt="Djelong Papiers" className="h-20 w-32 rounded-lg object-cover" />
          <p className="mt-5 max-w-md leading-7 text-white/74">
            Transformation industrielle du papier et fabrication de divers produits en papiers pour clients professionnels.
          </p>
        </div>
        <div>
          <h3 className="font-black">Navigation</h3>
          <div className="mt-4 grid gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="text-white/72 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Activités</h3>
          <div className="mt-4 grid gap-2 text-white/72">
            <span>Transformation papier</span>
            <span>Conditionnement</span>
            <span>Produits professionnels</span>
            <span>Demandes sur mesure</span>
          </div>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-4 grid gap-3 text-white/72">
            <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
            <a href={mapUrl} target="_blank" rel="noreferrer" className="hover:text-white">Apple Maps</a>
            <span>Djelong Papiers</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/12 pt-6 text-sm text-white/56 md:flex-row">
        <span>© 2026 Djelong Papiers. Tous droits réservés.</span>
        <span>Site corporate React + GitHub Pages.</span>
      </div>
    </footer>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/actualites" element={<SimplePage type="actualites" />} />
        <Route path="/sites" element={<SimplePage type="sites" />} />
        <Route path="/durabilite" element={<SimplePage type="durabilite" />} />
        <Route path="/investisseurs" element={<SimplePage type="investisseurs" />} />
        <Route path="/contact" element={<SimplePage type="contact" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  );
}
