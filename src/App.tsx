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
  CheckCircle2,
  Factory,
  FileText,
  Globe2,
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
  X,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const heroImage = `${import.meta.env.BASE_URL}images/hero/djelong-factory-gate.png`;

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
    eyebrow: "Transformation industrielle du papier",
    title: "Djelong Papiers",
    text: "Un site industriel pensé pour transformer la fibre, structurer la qualité et livrer des produits papier fiables aux professionnels.",
  },
  {
    eyebrow: "Fabrication et finition",
    title: "Du rouleau au produit prêt à l'emploi",
    text: "Découpe, façonnage, conditionnement et contrôle qualité dans une chaîne claire, rapide et maîtrisée.",
  },
  {
    eyebrow: "Vision durable",
    title: "Une industrie papier plus responsable",
    text: "Optimisation matière, recyclabilité, sécurité et performance énergétique au cœur du développement Djelong.",
  },
];

const metrics = [
  { value: "24/7", label: "capacité de production organisée" },
  { value: "8", label: "familles de produits papier" },
  { value: "100%", label: "contrôle qualité sur les lots" },
  { value: "DZ", label: "ancrage industriel algérien" },
];

const products = [
  {
    title: "Papier industriel",
    text: "Supports destinés à la transformation, à l'intercalaire, au bobinage et aux usages techniques.",
    icon: Factory,
  },
  {
    title: "Emballage papier",
    text: "Solutions pour conditionner, protéger et présenter les produits avec une finition professionnelle.",
    icon: PackageCheck,
  },
  {
    title: "Produits d'hygiène",
    text: "Gammes papier pour usages quotidiens, professionnels et collectivités, avec suivi de conformité.",
    icon: ShieldCheck,
  },
  {
    title: "Produits sur mesure",
    text: "Formats, grammages, textures et conditionnements adaptés aux cahiers des charges clients.",
    icon: Boxes,
  },
];

const roadmap = [
  {
    title: "Sélection matière",
    text: "Choix des papiers, fibres et consommables selon le niveau de résistance, de blancheur et de finition attendu.",
  },
  {
    title: "Transformation",
    text: "Découpe, refente, pliage, embossage ou assemblage selon le produit et la cadence demandée.",
  },
  {
    title: "Contrôle qualité",
    text: "Mesures dimensionnelles, vérification visuelle, résistance, propreté et traçabilité des lots.",
  },
  {
    title: "Conditionnement",
    text: "Emballage, étiquetage, palettisation et préparation logistique pour livrer vite et proprement.",
  },
  {
    title: "Amélioration continue",
    text: "Suivi des retours, optimisation des pertes matière et évolution des produits avec les besoins du marché.",
  },
];

const news = [
  {
    date: "03 Juil. 2026",
    title: "Djelong Papiers prépare une nouvelle vitrine digitale",
    text: "Une présence web premium pour présenter l'usine, les produits, les engagements qualité et les actualités industrielles.",
  },
  {
    date: "18 Juin 2026",
    title: "Renforcement des standards qualité",
    text: "Mise en place d'une lecture plus fine des contrôles lot par lot pour les produits destinés aux professionnels.",
  },
  {
    date: "22 Mai 2026",
    title: "Nouveaux formats pour l'emballage papier",
    text: "Développement de formats dédiés aux clients qui recherchent résistance, présentation et régularité.",
  },
];

const commitments = [
  { title: "Sécurité", icon: ShieldCheck, text: "Procédures claires, zones maîtrisées et culture d'atelier orientée prévention." },
  { title: "Environnement", icon: Leaf, text: "Réduction des pertes matière, recyclabilité et amélioration continue des consommations." },
  { title: "Qualité", icon: Award, text: "Contrôles réguliers, lots suivis et cahiers des charges lisibles pour les clients." },
  { title: "Responsabilité", icon: Recycle, text: "Production utile, fournisseurs choisis avec soin et démarche industrielle durable." },
];

const innerPages = {
  "/a-propos": {
    icon: Building2,
    title: "À propos de Djelong Papiers",
    subtitle: "Une entreprise dédiée à la transformation industrielle du papier et à la fabrication de produits papier fiables.",
    sections: [
      "Djelong Papiers développe une approche industrielle claire : produire avec régularité, sécuriser la qualité et livrer des solutions adaptées aux usages professionnels.",
      "Le site valorise le savoir-faire de transformation, la maîtrise des formats et la capacité à accompagner les clients avec des produits bien finis.",
    ],
  },
  "/actualites": {
    icon: Newspaper,
    title: "Actualités",
    subtitle: "La page supplémentaire demandée pour suivre les annonces, innovations et évolutions de l'entreprise.",
    sections: news.map((item) => `${item.date} - ${item.title}. ${item.text}`),
  },
  "/sites": {
    icon: MapPin,
    title: "Sites industriels",
    subtitle: "Une présentation claire des implantations, capacités et espaces de production.",
    sections: [
      "Usine principale : réception matière, transformation, finition, stockage et expédition.",
      "Zone qualité : contrôle des lots, essais matière et validation des séries.",
      "Logistique : conditionnement, palettisation et préparation des commandes clients.",
    ],
  },
  "/produits": {
    icon: Boxes,
    title: "Produits et ventes",
    subtitle: "Les familles de produits sont organisées pour parler aux acheteurs, distributeurs et industriels.",
    sections: products.map((item) => `${item.title} - ${item.text}`),
  },
  "/durabilite": {
    icon: Leaf,
    title: "Durabilité",
    subtitle: "Une industrie papier moderne doit protéger la matière, l'énergie et la confiance.",
    sections: commitments.map((item) => `${item.title} - ${item.text}`),
  },
  "/investisseurs": {
    icon: BarChart3,
    title: "Investisseurs",
    subtitle: "Une page corporate pour présenter la vision, la croissance et les indicateurs stratégiques.",
    sections: [
      "Positionnement : transformation papier, emballage, hygiène et produits sur mesure.",
      "Priorités : capacité de production, qualité mesurable, efficacité matière et développement commercial.",
      "Vision : devenir une référence régionale du produit papier industriel et professionnel.",
    ],
  },
  "/contact": {
    icon: Mail,
    title: "Contact",
    subtitle: "Un espace direct pour les demandes commerciales, les partenariats et les projets sur mesure.",
    sections: [
      "Email : contact@djelong-papiers.dz",
      "Téléphone : +213 000 00 00 00",
      "Adresse : Zone industrielle, Algérie",
    ],
  },
};

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
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
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
      <div className="mx-auto flex max-w-7xl items-center justify-between border border-white/45 bg-white/58 px-4 py-3 shadow-[0_18px_50px_rgba(10,33,42,0.16)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/42 rounded-lg">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 shrink-0 place-items-center border border-white/60 bg-[#0d3d47] text-white shadow-inner rounded-lg">
            <Factory size={22} />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold text-[#092c34]">Djelong Papiers</span>
            <span className="block text-xs text-[#517078]">Transformation industrielle</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `px-3 py-2 text-sm font-medium transition rounded-lg ${
                  isActive ? "bg-[#0d3d47] text-white" : "text-[#244950] hover:bg-white/75 hover:text-[#0d3d47]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="grid h-11 w-11 place-items-center border border-[#d7e3e4] bg-white/70 text-[#0d3d47] lg:hidden rounded-lg"
          onClick={() => setOpen((value) => !value)}
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-2 grid max-w-7xl gap-1 border border-white/50 bg-white/84 p-2 shadow-xl backdrop-blur-xl lg:hidden rounded-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `px-3 py-3 text-sm font-semibold transition rounded-lg ${
                  isActive ? "bg-[#0d3d47] text-white" : "text-[#244950] hover:bg-[#eef6f4]"
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
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-[#082b32] text-white">
      <img src={heroImage} alt="Entrée industrielle Djelong Papiers" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,25,30,0.92),rgba(4,25,30,0.48)_45%,rgba(4,25,30,0.14))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,25,30,0.3),rgba(4,25,30,0.1)_55%,rgba(4,25,30,0.85))]" />

      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl items-end px-5 pb-12 pt-32 sm:px-8 lg:pb-16">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-3xl">
            <div className="reveal mb-5 inline-flex items-center gap-2 border border-white/30 bg-white/12 px-3 py-2 text-sm font-medium backdrop-blur-xl rounded-lg">
              <Sparkles size={16} />
              {slide.eyebrow}
            </div>
            <h1 className="reveal text-5xl font-black leading-[0.96] text-white sm:text-6xl lg:text-7xl">{slide.title}</h1>
            <p className="reveal mt-6 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">{slide.text}</p>
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Link to="/produits" className="inline-flex items-center gap-2 bg-white px-5 py-3 font-bold text-[#0d3d47] transition hover:bg-[#d7eadf] rounded-lg">
                Voir les produits <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-white/45 bg-white/12 px-5 py-3 font-bold text-white backdrop-blur-xl transition hover:bg-white/22 rounded-lg">
                Lancer un projet
              </Link>
            </div>
          </div>

          <div className="reveal border border-white/28 bg-white/12 p-4 backdrop-blur-2xl rounded-lg">
            <p className="text-sm font-semibold text-white/75">Hero {active + 1} / {heroSlides.length}</p>
            <div className="mt-4 grid gap-2">
              {heroSlides.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActive(index)}
                  className={`flex items-center justify-between border px-3 py-3 text-left text-sm transition rounded-lg ${
                    active === index ? "border-white bg-white text-[#0d3d47]" : "border-white/24 bg-white/8 text-white hover:bg-white/18"
                  }`}
                >
                  <span className="font-semibold">{item.eyebrow}</span>
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

function IconCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="reveal border border-[#d9e6e4] bg-white/76 p-5 shadow-[0_18px_45px_rgba(14,50,58,0.08)] backdrop-blur-xl rounded-lg">
      <div className="mb-5 grid h-12 w-12 place-items-center bg-[#0d3d47] text-white rounded-lg">
        <Icon size={22} />
      </div>
      <h3 className="text-xl font-bold text-[#0a2d35]">{title}</h3>
      <p className="mt-3 leading-7 text-[#557179]">{text}</p>
    </article>
  );
}

function SectionTitle({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text: string; dark?: boolean }) {
  return (
    <div className="reveal mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase text-[#b7772b]">{eyebrow}</p>
      <h2 className={`text-3xl font-black sm:text-5xl ${dark ? "text-white" : "text-[#0a2d35]"}`}>{title}</h2>
      <p className={`mt-5 text-lg leading-8 ${dark ? "text-white/72" : "text-[#557179]"}`}>{text}</p>
    </div>
  );
}

function VectorLine() {
  return (
    <svg viewBox="0 0 52 2047" fill="none" aria-hidden="true">
      <path
        ref={undefined}
        strokeWidth="6"
        className="svg-path"
        d="M26 0V314C12 314 1 326 1 339C1 352 11 364 26 364C41 364 51 353 51 339C51 325 28 318 26 339V636V654.5C13.5 654.5 1 664 1 679C1 694 12 703 26 703C40 703 50.5 692.5 50.5 679C49.2307 664.367 26 660 26 679V979V994.5C13.5 994.5 0.999993 1003.5 1 1019C1.00001 1034.5 12.3457 1044.15 26 1043.5C36.5163 1043 50.4852 1035.18 50.5 1019C50.5148 1002.82 28.4963 1000.64 26 1019V1327C26 1327 26 1333.7 26 1338C13 1338 1 1348.5 1 1363C1 1377.5 13.5 1388 26 1388C38.5 1388 50.9422 1381.19 51 1363C51.0578 1344.81 26 1346 26 1363C26 1380 26 1670 26 1670V1678.5C12.5 1678.5 1 1687.5 1 1703C1 1718.5 14 1727.5 26 1727.5C38 1727.5 50.5 1719 50.5 1703C50.5 1687 26 1687 26 1703C26 1719 26 2049 26 2049"
        stroke="currentColor"
      />
    </svg>
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
    <section id="processus" className="relative overflow-hidden bg-[#082b32] px-5 py-24 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Processus animé"
          title="La trajectoire Djelong"
          text="Le bloc inspiré de ton code GSAP : une ligne se dessine au scroll pour raconter la transformation du papier."
          dark
        />

        <div ref={containerRef} className="relative mt-16 grid gap-8 lg:grid-cols-[130px_minmax(0,1fr)]">
          <div className="pointer-events-none absolute left-6 top-0 hidden h-full w-16 text-[#d6b273] lg:block">
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

          <div />
          <div className="grid gap-5">
            {roadmap.map((item, index) => (
              <article key={item.title} className="reveal border border-white/18 bg-white/10 p-6 backdrop-blur-xl rounded-lg">
                <p className="mb-3 text-sm font-bold text-[#d6b273]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 max-w-3xl leading-8 text-white/74">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  useScrollReveal();

  return (
    <>
      <Hero />

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="reveal border border-[#d9e6e4] bg-white/72 p-5 backdrop-blur-xl rounded-lg">
              <p className="text-4xl font-black text-[#0d3d47]">{metric.value}</p>
              <p className="mt-2 leading-6 text-[#607980]">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Produits"
            title="Une gamme papier pensée pour l'industrie"
            text="Des familles lisibles pour donner confiance aux acheteurs : technique, emballage, hygiène et production sur mesure."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {products.map((item) => (
              <IconCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <RoadmapBlock />

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="reveal overflow-hidden rounded-lg">
            <img src={heroImage} alt="Facade de l'usine Djelong Papiers" className="h-[520px] w-full object-cover" />
          </div>
          <div>
            <SectionTitle
              eyebrow="Durabilité"
              title="Produire mieux, avec une matière mieux valorisée"
              text="Djelong Papiers peut raconter une vision moderne : moins de pertes, plus de contrôle, une fabrication utile et mesurable."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {commitments.map((item) => (
                <IconCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsPreview />
      <ContactBand />
    </>
  );
}

function NewsPreview() {
  return (
    <section className="bg-[#eef6f4] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Actualités"
            title="Le fil corporate Djelong"
            text="Une page news dédiée pour dépasser le site de référence et garder une communication active."
          />
          <Link to="/actualites" className="reveal inline-flex items-center justify-center gap-2 bg-[#0d3d47] px-5 py-3 font-bold text-white rounded-lg">
            Toutes les actualités <ArrowRight size={18} />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {news.map((item) => (
            <article key={item.title} className="reveal border border-[#d9e6e4] bg-white p-6 rounded-lg">
              <p className="text-sm font-bold text-[#b7772b]">{item.date}</p>
              <h3 className="mt-4 text-2xl font-black text-[#0a2d35]">{item.title}</h3>
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
      <div className="reveal mx-auto grid max-w-7xl gap-8 border border-[#d7e3e4] bg-[#0d3d47] p-6 text-white shadow-[0_25px_80px_rgba(13,61,71,0.22)] md:grid-cols-[1fr_auto] md:items-center md:p-10 rounded-lg">
        <div>
          <p className="font-bold text-[#d6b273]">Projet papier, emballage ou transformation ?</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Présentez Djelong comme une usine prête pour les grands comptes.</h2>
        </div>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white px-5 py-3 font-bold text-[#0d3d47] rounded-lg">
          Demander un devis <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

function InnerPage({ path }: { path: keyof typeof innerPages }) {
  useScrollReveal();
  const page = innerPages[path];
  const Icon = page.icon;

  return (
    <>
      <section className="relative min-h-[58svh] overflow-hidden bg-[#082b32] px-5 pb-16 pt-36 text-white sm:px-8">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
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
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {page.sections.map((section, index) => (
            <article key={section} className="reveal border border-[#d9e6e4] bg-white/78 p-6 shadow-[0_18px_45px_rgba(14,50,58,0.08)] backdrop-blur-xl rounded-lg">
              <p className="text-sm font-bold text-[#b7772b]">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-4 leading-8 text-[#395a62]">{section}</p>
            </article>
          ))}
        </div>
      </section>

      {path === "/actualites" && <NewsPreview />}
      {path === "/contact" && (
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            <IconCard icon={Phone} title="Téléphone" text="+213 000 00 00 00" />
            <IconCard icon={Mail} title="Email" text="contact@djelong-papiers.dz" />
            <IconCard icon={Globe2} title="Web" text="renolix.github.io/djelong.github.io" />
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
        <Link to="/" className="mt-6 inline-flex items-center gap-2 bg-[#0d3d47] px-5 py-3 font-bold text-white rounded-lg">
          Retour accueil <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#d9e6e4] bg-white/74 px-5 py-10 sm:px-8">
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
            <Link key={item.path} to={item.path} className="text-sm font-semibold text-[#395a62] hover:text-[#0d3d47]">
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
        {(Object.keys(innerPages) as Array<keyof typeof innerPages>).map((path) => (
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
