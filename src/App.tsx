import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Award,
  BarChart3,
  Boxes,
  Building2,
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
  ShieldCheck,
  Sparkles,
  Truck,
  X,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const heroImages = {
  gate: asset("images/hero/djelong-factory-gate.png"),
  production: asset("images/hero/paper-production-line.png"),
  logistics: asset("images/hero/paper-logistics-warehouse.png"),
};

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Actualités", path: "/actualites" },
  { label: "Sites", path: "/sites" },
  { label: "Produits", path: "/produits" },
  { label: "Durabilité", path: "/durabilite" },
  { label: "Investisseurs", path: "/investisseurs" },
  { label: "Contact", path: "/contact" },
];

const heroSlides = [
  {
    image: heroImages.gate,
    eyebrow: "Entreprise industrielle du papier",
    title: "Djelong Papiers",
    text: "Une vitrine premium pour une entreprise réputée : transformation, fabrication, contrôle qualité et livraison de produits papier pour les professionnels.",
  },
  {
    image: heroImages.production,
    eyebrow: "Lignes de transformation",
    title: "Transformer la matière en produits fiables",
    text: "Du rouleau mère aux formats finis, chaque étape est pensée pour garantir précision, régularité et finition industrielle.",
  },
  {
    image: heroImages.logistics,
    eyebrow: "Stockage et expédition",
    title: "Une organisation prête pour les grands volumes",
    text: "Conditionnement, palettisation, traçabilité et préparation des commandes pour servir distributeurs, industriels et collectivités.",
  },
];

const productFamilies = [
  {
    title: "Papier industriel",
    text: "Supports destinés à la transformation, à l'intercalaire, au bobinage et aux usages techniques.",
    icon: Factory,
    details: ["Bobines et formats", "Intercalaires", "Papier technique", "Approvisionnement régulier"],
  },
  {
    title: "Emballage papier",
    text: "Solutions pour conditionner, protéger et présenter les produits avec une finition professionnelle.",
    icon: PackageCheck,
    details: ["Formats découpés", "Conditionnement propre", "Protection produit", "Présentation commerciale"],
  },
  {
    title: "Produits d'hygiène",
    text: "Gammes papier pour usages quotidiens, professionnels et collectivités, avec suivi de conformité.",
    icon: ShieldCheck,
    details: ["Usage professionnel", "Qualité contrôlée", "Lots suivis", "Distribution organisée"],
  },
  {
    title: "Produits sur mesure",
    text: "Formats, grammages, textures et conditionnements adaptés aux cahiers des charges clients.",
    icon: Boxes,
    details: ["Cahier des charges", "Grammage adapté", "Formats spéciaux", "Séries dédiées"],
  },
];

const expertiseBlocks = [
  {
    title: "Transformation maîtrisée",
    text: "Une chaîne pensée pour passer de la matière première au produit fini avec une cadence stable, des pertes réduites et une finition régulière.",
    icon: Layers3,
  },
  {
    title: "Contrôle qualité visible",
    text: "Contrôles dimensionnels, propreté, résistance, aspect, conditionnement et traçabilité pour rassurer les acheteurs professionnels.",
    icon: ClipboardCheck,
  },
  {
    title: "Culture industrielle",
    text: "Un positionnement clair : produire proprement, respecter les délais, documenter les lots et livrer des produits utiles au marché.",
    icon: Award,
  },
  {
    title: "Logistique structurée",
    text: "Préparation des palettes, étiquetage, stockage organisé et livraison planifiée selon les priorités des clients.",
    icon: Truck,
  },
];

const marketBlocks = [
  "Industries et transformateurs",
  "Distributeurs de produits papier",
  "Entreprises d'emballage",
  "Collectivités et administrations",
  "Commerce de gros",
  "Marques à cahier des charges",
];

const qualityBlocks = [
  { title: "Régularité", text: "Même format, même finition, même niveau de contrôle sur les séries répétées." },
  { title: "Traçabilité", text: "Chaque lot peut être suivi depuis la matière jusqu'au conditionnement final." },
  { title: "Présentation", text: "Des produits propres, emballés et prêts à entrer dans une chaîne de vente ou d'usage." },
  { title: "Réactivité", text: "Une structure capable d'adapter les formats et les priorités selon les besoins clients." },
];

const roadmap = [
  {
    title: "Sélection matière",
    text: "Choix des papiers, fibres et consommables selon le niveau de résistance, de blancheur, de toucher et de finition attendu.",
  },
  {
    title: "Préparation production",
    text: "Réglage des formats, contrôle des bobines, planification des séries et vérification des paramètres avant lancement.",
  },
  {
    title: "Transformation",
    text: "Découpe, refente, pliage, embossage, assemblage ou conditionnement selon la famille de produit papier.",
  },
  {
    title: "Contrôle qualité",
    text: "Mesures dimensionnelles, vérification visuelle, résistance, propreté, emballage et validation des lots.",
  },
  {
    title: "Conditionnement",
    text: "Mise en paquet, étiquetage, palettisation et organisation des stocks pour une expédition propre.",
  },
  {
    title: "Livraison et suivi",
    text: "Préparation logistique, remise au client, retours d'expérience et amélioration continue des prochains lots.",
  },
];

const commitments = [
  { title: "Sécurité", icon: ShieldCheck, text: "Procédures d'atelier, zones maîtrisées et attention portée aux opérateurs." },
  { title: "Environnement", icon: Leaf, text: "Réduction des pertes matière, valorisation du papier et optimisation des consommations." },
  { title: "Qualité", icon: Award, text: "Contrôles réguliers, lots suivis et standards de finition lisibles pour les clients." },
  { title: "Recyclabilité", icon: Recycle, text: "Orientation vers des solutions utiles, sobres et cohérentes avec les attentes du marché." },
];

const news = [
  {
    date: "03 Juil. 2026",
    title: "Nouvelle vitrine digitale Djelong Papiers",
    text: "Un site corporate pour présenter l'usine, les produits, la qualité et les engagements industriels de l'entreprise.",
  },
  {
    date: "18 Juin 2026",
    title: "Renforcement des contrôles de production",
    text: "Les équipes structurent un suivi plus lisible des lots pour les produits destinés aux professionnels.",
  },
  {
    date: "22 Mai 2026",
    title: "Développement de formats d'emballage",
    text: "Djelong Papiers travaille de nouveaux formats pour les clients qui recherchent résistance, régularité et belle présentation.",
  },
  {
    date: "09 Mai 2026",
    title: "Organisation logistique améliorée",
    text: "La préparation des palettes et le stockage sont pensés pour accélérer les livraisons sans perdre en contrôle.",
  },
];

const innerPages = {
  "/a-propos": {
    icon: Building2,
    title: "À propos de Djelong Papiers",
    subtitle: "Une entreprise industrielle dédiée à la transformation du papier et à la fabrication de produits papier fiables.",
    intro:
      "Djelong Papiers doit apparaître comme une maison industrielle solide : une entreprise qui comprend la matière, la cadence, la qualité et les besoins des clients professionnels.",
    blocks: [
      { title: "Identité", text: "Transformation industrielle du papier, fabrication de divers produits en papiers et accompagnement des besoins professionnels." },
      { title: "Vision", text: "Devenir une référence reconnue pour les produits papier réguliers, bien finis et livrés avec sérieux." },
      { title: "Méthode", text: "Travailler avec des procédures claires, une lecture qualité simple et une organisation orientée client." },
      { title: "Valeur", text: "Offrir aux acheteurs un partenaire fiable, capable de tenir les formats, les délais et la présentation produit." },
    ],
  },
  "/actualites": {
    icon: Newspaper,
    title: "Actualités",
    subtitle: "Une page dédiée aux annonces, améliorations industrielles, nouveaux produits et évolutions de l'entreprise.",
    intro:
      "Cette rubrique donne de la vie au site et montre que Djelong Papiers communique comme une entreprise active, structurée et ambitieuse.",
    blocks: news.map((item) => ({ title: `${item.date} — ${item.title}`, text: item.text })),
  },
  "/sites": {
    icon: MapPin,
    title: "Sites industriels",
    subtitle: "Une présentation claire des espaces de production, de contrôle, de stockage et de logistique.",
    intro:
      "La page sites montre l'entreprise comme une organisation complète, depuis la réception matière jusqu'à l'expédition des produits finis.",
    blocks: [
      { title: "Réception matière", text: "Contrôle initial des bobines, papiers, consommables et éléments nécessaires à la production." },
      { title: "Atelier transformation", text: "Zone dédiée aux opérations de découpe, refente, façonnage, assemblage et finition." },
      { title: "Contrôle qualité", text: "Espace de vérification pour dimensions, aspect, propreté, résistance et conformité des lots." },
      { title: "Stockage et expédition", text: "Organisation des palettes, étiquetage, préparation et remise des commandes clients." },
    ],
  },
  "/produits": {
    icon: Boxes,
    title: "Produits et ventes",
    subtitle: "Une gamme claire pour parler aux distributeurs, industriels, collectivités et acheteurs professionnels.",
    intro:
      "Les produits sont présentés par usages pour rendre l'offre lisible : industrie, emballage, hygiène et demandes spécifiques.",
    blocks: productFamilies.map((item) => ({ title: item.title, text: `${item.text} ${item.details.join(" · ")}.` })),
  },
  "/durabilite": {
    icon: Leaf,
    title: "Durabilité",
    subtitle: "Une industrie papier moderne doit valoriser la matière, limiter les pertes et construire la confiance.",
    intro:
      "La durabilité n'est pas un slogan décoratif : elle se voit dans la sélection matière, les pertes réduites, le conditionnement et le suivi qualité.",
    blocks: commitments.map((item) => ({ title: item.title, text: item.text })),
  },
  "/investisseurs": {
    icon: BarChart3,
    title: "Investisseurs",
    subtitle: "Une page corporate pour présenter le potentiel industriel, la vision de croissance et les axes prioritaires.",
    intro:
      "Djelong Papiers peut se positionner comme une plateforme de transformation papier capable d'élargir ses gammes et de servir des marchés exigeants.",
    blocks: [
      { title: "Positionnement", text: "Transformation papier, emballage, produits d'hygiène, formats techniques et solutions sur mesure." },
      { title: "Priorités", text: "Capacité, régularité, qualité mesurable, logistique plus fluide et relation client structurée." },
      { title: "Croissance", text: "Développer les familles de produits, professionnaliser la communication et ouvrir de nouveaux marchés." },
      { title: "Différenciation", text: "Une image industrielle premium, des process lisibles et une promesse de fiabilité." },
    ],
  },
  "/contact": {
    icon: Mail,
    title: "Contact",
    subtitle: "Un espace direct pour les demandes commerciales, les projets sur mesure et les partenariats.",
    intro:
      "La page contact doit inspirer confiance et donner envie de lancer une demande précise : format, usage, quantité, délai et exigence de finition.",
    blocks: [
      { title: "Demandes commerciales", text: "Présentez votre besoin : famille de produit, format, quantité estimée et délai souhaité." },
      { title: "Projets sur mesure", text: "Djelong peut étudier un cahier des charges spécifique : grammage, texture, découpe ou emballage." },
      { title: "Coordonnées", text: "Email : contact@djelong-papiers.dz · Téléphone : +213 000 00 00 00 · Zone industrielle, Algérie." },
      { title: "Réponse structurée", text: "Les demandes sont orientées selon le type de produit, la faisabilité et le niveau de priorité." },
    ],
  },
};

type InnerPath = keyof typeof innerPages;

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
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
            },
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
      <div className="mx-auto flex max-w-7xl items-center justify-between border border-white/55 bg-[rgba(236,240,243,0.78)] px-4 py-3 shadow-[0_18px_50px_rgba(10,33,42,0.16)] backdrop-blur-2xl rounded-lg">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#0d3d47] text-white shadow-inner rounded-lg">
            <Factory size={22} />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-black text-[#092c34]">Djelong Papiers</span>
            <span className="block text-xs text-[#517078]">Transformation industrielle</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `px-3 py-2 text-sm font-bold transition rounded-lg ${
                  isActive ? "bg-[#0d3d47] text-white" : "text-[#244950] hover:bg-white/70 hover:text-[#0d3d47]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="soft-button grid h-11 w-11 place-items-center text-[#0d3d47] lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Ouvrir le menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 grid max-w-7xl gap-1 border border-white/50 bg-[rgba(236,240,243,0.92)] p-2 shadow-xl backdrop-blur-xl lg:hidden rounded-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `px-3 py-3 text-sm font-bold transition rounded-lg ${
                  isActive ? "bg-[#0d3d47] text-white" : "text-[#244950] hover:bg-white/70"
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
    <section className="relative min-h-[96svh] overflow-hidden bg-[#082b32] text-white">
      {heroSlides.map((item, index) => (
        <img
          key={item.image}
          src={item.image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${active === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,25,30,0.94),rgba(4,25,30,0.58)_48%,rgba(4,25,30,0.18))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,25,30,0.22),rgba(4,25,30,0.08)_54%,rgba(4,25,30,0.88))]" />

      <div className="relative mx-auto flex min-h-[96svh] max-w-7xl items-end px-5 pb-12 pt-32 sm:px-8 lg:pb-16">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div className="max-w-4xl">
            <div className="reveal mb-5 inline-flex items-center gap-2 border border-white/30 bg-white/12 px-3 py-2 text-sm font-bold backdrop-blur-xl rounded-lg">
              <Sparkles size={16} />
              {slide.eyebrow}
            </div>
            <h1 className="reveal text-5xl font-black leading-[0.94] text-white sm:text-6xl lg:text-7xl">{slide.title}</h1>
            <p className="reveal mt-6 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">{slide.text}</p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Link to="/produits" className="inline-flex items-center gap-2 bg-white px-5 py-3 font-black text-[#0d3d47] transition hover:bg-[#d7eadf] rounded-lg">
                Voir les produits <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-white/45 bg-white/12 px-5 py-3 font-black text-white backdrop-blur-xl transition hover:bg-white/22 rounded-lg">
                Lancer un projet
              </Link>
            </div>
          </div>

          <div className="reveal hero-selector p-4">
            <p className="text-sm font-bold text-white/80">Hero {active + 1} / {heroSlides.length}</p>
            <div className="mt-4 grid gap-3">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActive(index)}
                  className={`hero-tab text-left ${active === index ? "hero-tab-active" : ""}`}
                >
                  <span className="font-black">{item.eyebrow}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-black uppercase text-[#b7772b]">{eyebrow}</p>
      <h2 className={`text-3xl font-black sm:text-5xl ${dark ? "text-white" : "text-[#0a2d35]"}`}>{title}</h2>
      <p className={`mt-5 text-lg leading-8 ${dark ? "text-white/74" : "text-[#557179]"}`}>{text}</p>
    </div>
  );
}

function SoftCard({ icon: Icon, title, text, details }: { icon: LucideIcon; title: string; text: string; details?: string[] }) {
  return (
    <article className="reveal soft-card p-6">
      <div className="mb-5 grid h-12 w-12 place-items-center bg-[#0d3d47] text-white rounded-lg">
        <Icon size={22} />
      </div>
      <h3 className="text-2xl font-black text-[#0a2d35]">{title}</h3>
      <p className="mt-3 leading-7 text-[#557179]">{text}</p>
      {details && (
        <div className="mt-5 grid gap-2">
          {details.map((detail) => (
            <span key={detail} className="inline-flex items-center gap-2 text-sm font-bold text-[#365a61]">
              <CheckDot />
              {detail}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

function CheckDot() {
  return <span className="h-2.5 w-2.5 rounded-full bg-[#d6b273] shadow-[0_0_0_4px_rgba(214,178,115,0.16)]" />;
}

function SplitShowcase() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="reveal overflow-hidden rounded-lg">
          <img src={heroImages.production} alt="Ligne de transformation papier" className="h-[560px] w-full object-cover" />
        </div>
        <div className="soft-card reveal p-7">
          <p className="text-sm font-black uppercase text-[#b7772b]">Capacité industrielle</p>
          <h2 className="mt-3 text-4xl font-black text-[#0a2d35]">Un outil de production présenté comme une référence.</h2>
          <p className="mt-5 leading-8 text-[#557179]">
            L'objectif n'est pas seulement de montrer des produits. Le site doit faire sentir une entreprise sérieuse : machines,
            flux de matière, contrôle, équipes, stockage et livraisons maîtrisées.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {["Formats réguliers", "Finition propre", "Lots vérifiés", "Délais structurés"].map((item) => (
              <div key={item} className="soft-pill">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section className="bg-[#ecf0f3] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Gamme"
          title="Une gamme papier pensée pour l'industrie"
          text="Des familles lisibles pour donner confiance aux acheteurs : technique, emballage, hygiène et production sur mesure."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productFamilies.map((item) => (
            <SoftCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Savoir-faire"
          title="Tout le site doit respirer l'entreprise réputée"
          text="Des blocs forts, concrets, avec des cadres creusés qui suivent le fond et donnent une sensation premium, industrielle et propre."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {expertiseBlocks.map((item) => (
            <SoftCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketSection() {
  return (
    <section className="bg-[#0d3d47] px-5 py-24 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Marchés servis"
          title="Une offre qui parle aux vrais acheteurs"
          text="Le site explique à qui Djelong s'adresse, pas seulement ce qu'elle fabrique."
          dark
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marketBlocks.map((item, index) => (
            <article key={item} className="reveal soft-card-dark p-6">
              <p className="text-sm font-black text-[#d6b273]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-2xl font-black">{item}</h3>
              <p className="mt-3 leading-7 text-white/72">
                Une présentation claire, professionnelle et rassurante pour ouvrir la discussion commerciale.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="soft-card reveal p-7">
          <p className="text-sm font-black uppercase text-[#b7772b]">Qualité</p>
          <h2 className="mt-3 text-4xl font-black text-[#0a2d35]">Ce que le client doit sentir immédiatement.</h2>
          <p className="mt-5 leading-8 text-[#557179]">
            Djelong Papiers doit donner une impression de maîtrise : pas un simple catalogue, mais une entreprise capable de produire,
            documenter, contrôler et livrer.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {qualityBlocks.map((item) => (
            <article key={item.title} className="reveal soft-card p-6">
              <h3 className="text-2xl font-black text-[#0a2d35]">{item.title}</h3>
              <p className="mt-3 leading-7 text-[#557179]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
    <section id="processus" className="relative overflow-hidden bg-[#ecf0f3] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Processus industriel"
          title="La trajectoire Djelong"
          text="Une ligne dessinée au scroll, mais avec des cartes alternées gauche/droite pour raconter la transformation comme un vrai parcours premium."
        />

        <div ref={containerRef} className="relative mt-16">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-16 -translate-x-1/2 text-[#d6b273] lg:block">
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
              <article key={item.title} className={`reveal grid lg:grid-cols-2 ${index % 2 === 0 ? "" : "lg:[&>div]:col-start-2"}`}>
                <div className="soft-card p-6 lg:w-[92%]">
                  <p className="text-sm font-black text-[#b7772b]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-black text-[#0a2d35]">{item.title}</h3>
                  <p className="mt-3 leading-8 text-[#557179]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SustainabilityPreview() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="reveal overflow-hidden rounded-lg">
          <img src={heroImages.logistics} alt="Stockage et logistique des produits papier" className="h-[540px] w-full object-cover" />
        </div>
        <div>
          <SectionTitle
            eyebrow="Durabilité"
            title="Une production utile, propre et mieux organisée"
            text="La durabilité est intégrée dans les choix de matière, les pertes réduites, le conditionnement et la rigueur logistique."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {commitments.map((item) => (
              <SoftCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsPreview() {
  return (
    <section className="bg-[#ecf0f3] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Actualités"
            title="Un fil d'information qui remplit le site"
            text="Actualités produits, qualité, production et organisation : le site devient vivant et crédible."
          />
          <Link to="/actualites" className="soft-button reveal inline-flex items-center justify-center gap-2 px-5 py-3 font-black text-[#0d3d47]">
            Toutes les actualités <ArrowRight size={18} />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {news.map((item) => (
            <article key={item.title} className="reveal soft-card p-6">
              <p className="text-sm font-black text-[#b7772b]">{item.date}</p>
              <h3 className="mt-4 text-xl font-black text-[#0a2d35]">{item.title}</h3>
              <p className="mt-4 leading-7 text-[#557179]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="reveal mx-auto grid max-w-7xl gap-8 bg-[#0d3d47] p-6 text-white shadow-[0_25px_80px_rgba(13,61,71,0.22)] md:grid-cols-[1fr_auto] md:items-center md:p-10 rounded-lg">
        <div>
          <p className="font-black text-[#d6b273]">Projet papier, emballage ou transformation ?</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Présentez Djelong comme une entreprise prête pour les grands comptes.</h2>
        </div>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 font-black text-[#0d3d47] rounded-lg">
          Demander un devis <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />
      <ExpertiseSection />
      <ProductSection />
      <SplitShowcase />
      <MarketSection />
      <QualitySection />
      <RoadmapBlock />
      <SustainabilityPreview />
      <NewsPreview />
      <ContactBand />
    </>
  );
}

function InnerPage({ path }: { path: InnerPath }) {
  useScrollReveal();
  const page = innerPages[path];
  const Icon = page.icon;

  return (
    <>
      <section className="relative min-h-[62svh] overflow-hidden bg-[#082b32] px-5 pb-16 pt-36 text-white sm:px-8">
        <img src={path === "/sites" || path === "/contact" ? heroImages.logistics : path === "/produits" ? heroImages.production : heroImages.gate} alt="" className="absolute inset-0 h-full w-full object-cover opacity-48" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,25,30,0.94),rgba(4,25,30,0.62))]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="reveal grid h-14 w-14 place-items-center border border-white/24 bg-white/12 backdrop-blur-xl rounded-lg">
            <Icon size={26} />
          </div>
          <h1 className="reveal mt-6 max-w-4xl text-4xl font-black sm:text-6xl">{page.title}</h1>
          <p className="reveal mt-6 max-w-3xl text-lg leading-8 text-white/78">{page.subtitle}</p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal soft-card p-7">
            <p className="text-sm font-black uppercase text-[#b7772b]">Djelong Papiers</p>
            <h2 className="mt-3 text-3xl font-black text-[#0a2d35]">Une page complète, claire et orientée client.</h2>
            <p className="mt-4 max-w-4xl leading-8 text-[#557179]">{page.intro}</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {page.blocks.map((block, index) => (
              <article key={block.title} className="reveal soft-card p-6">
                <p className="text-sm font-black text-[#b7772b]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-2xl font-black text-[#0a2d35]">{block.title}</h3>
                <p className="mt-3 leading-8 text-[#557179]">{block.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {path === "/produits" && <ProductSection />}
      {path === "/actualites" && <NewsPreview />}
      {path === "/durabilite" && <SustainabilityPreview />}
      {path === "/contact" && (
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            <SoftCard icon={Phone} title="Téléphone" text="+213 000 00 00 00" />
            <SoftCard icon={Mail} title="Email" text="contact@djelong-papiers.dz" />
            <SoftCard icon={Globe2} title="Web" text="renolix.github.io/djelong.github.io" />
          </div>
        </section>
      )}
      <ContactBand />
    </>
  );
}

function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <FileText className="mx-auto text-[#0d3d47]" size={48} />
        <h1 className="mt-5 text-4xl font-black text-[#0a2d35]">Page introuvable</h1>
        <p className="mt-3 text-[#557179]">Cette page n'existe pas encore sur le site Djelong Papiers.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 bg-[#0d3d47] px-5 py-3 font-black text-white rounded-lg">
          Retour accueil <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d9e6e4] bg-[#ecf0f3] px-5 py-10 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center bg-[#0d3d47] text-white rounded-lg">
              <Factory size={22} />
            </span>
            <div>
              <p className="font-black text-[#0a2d35]">Djelong Papiers</p>
              <p className="text-sm text-[#607980]">Transformation industrielle du papier</p>
            </div>
          </div>
          <p className="mt-5 max-w-lg leading-7 text-[#557179]">
            Fabrication de divers produits en papiers, solutions industrielles, emballage, qualité et durabilité.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {navItems.slice(1).map((item) => (
            <Link key={item.path} to={item.path} className="text-sm font-bold text-[#395a62] hover:text-[#0d3d47]">
              {item.label}
            </Link>
          ))}
        </div>
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
        {(Object.keys(innerPages) as InnerPath[]).map((path) => (
          <Route key={path} path={path} element={<InnerPage path={path} />} />
        ))}
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
