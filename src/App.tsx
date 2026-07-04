import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
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
  Quote,
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
const contactEmail = "contact@djelong-papiers.dz";
const mapUrl = "https://maps.apple/p/U4_5vMcmMDYBYU";

const images = {
  logo: asset("images/hero/djelong-logo-reference.jpeg"),
  gate: asset("images/hero/djelong-factory-gate.png"),
  production: asset("images/hero/paper-production-line.png"),
  logistics: asset("images/hero/paper-logistics-warehouse.png"),
  activity: asset("images/sections/paper-transformation-activity.png"),
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
  const location = useLocation();

  useEffect(() => {
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".reveal");
      gsap.set(elements, { autoAlpha: 1 });

      elements.forEach((element) => {
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

      window.setTimeout(() => ScrollTrigger.refresh(), 80);
    });

    return () => context.revert();
  }, [location.pathname]);
}

const buttonVariants = {
  initial: { x: 0, width: 100 },
  step1: { x: 0, width: 100 },
  step2: { x: -30, width: 180 },
};

const iconVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 16, opacity: 1 },
};

function isUnsupportedBrowser() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent.toLowerCase();
  const isSafari = ua.includes("safari") && !ua.includes("chrome") && !ua.includes("chromium") && !ua.includes("android") && !ua.includes("firefox");
  const isChromeOniOS = ua.includes("crios");

  return isSafari || isChromeOniOS;
}

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function GooeyFilter() {
  return (
    <svg className="gooey-filter" aria-hidden="true">
      <defs>
        <filter id="goo-effect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function GooeySearchIcon({ isUnsupported }: { isUnsupported: boolean }) {
  return (
    <motion.svg
      initial={{
        opacity: 0,
        scale: 0.8,
        x: -4,
        filter: isUnsupported ? "none" : "blur(5px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: -4,
        filter: isUnsupported ? "none" : "blur(5px)",
      }}
      transition={{
        delay: 0.1,
        duration: 1,
        type: "spring",
        bounce: 0.15,
      }}
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </motion.svg>
  );
}

function LoadingIcon() {
  return (
    <svg className="loading-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-label="Loading" role="status">
      <rect width="256" height="256" fill="none" />
      {[
        ["128", "32", "128", "64"],
        ["195.88", "60.12", "173.25", "82.75"],
        ["224", "128", "192", "128"],
        ["195.88", "195.88", "173.25", "173.25"],
        ["128", "224", "128", "192"],
        ["60.12", "195.88", "82.75", "173.25"],
        ["32", "128", "64", "128"],
        ["60.12", "60.12", "82.75", "82.75"],
      ].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
      ))}
    </svg>
  );
}

function GooeySearch() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState({
    step: 1,
    searchText: "",
    isLoading: false,
  });
  const debouncedSearchText = useDebounce(state.searchText, 500);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

  const handleButtonClick = () => {
    setState((prevState) => ({ ...prevState, step: 2 }));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, searchText: event.target.value }));
  };

  const resetSearch = () => {
    setState({ step: 1, searchText: "", isLoading: false });
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (state.step !== 2) return;
      const target = event.target as Node | null;
      if (target && wrapperRef.current?.contains(target)) return;
      resetSearch();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") resetSearch();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.step]);

  useEffect(() => {
    if (state.step === 2) {
      inputRef.current?.focus();
    } else {
      setState((prevState) => ({
        ...prevState,
        searchText: "",
        isLoading: false,
      }));
    }
  }, [state.step]);

  useEffect(() => {
    let isCancelled = false;

    if (debouncedSearchText) {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      const timer = window.setTimeout(() => {
        if (!isCancelled) {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        }
      }, 500);

      return () => {
        isCancelled = true;
        window.clearTimeout(timer);
      };
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: false,
    }));

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchText]);

  return (
    <div ref={wrapperRef} className={clsx("wrapper", isUnsupported && "no-goo")}>
      <GooeyFilter />

      <div className="button-content">
        <motion.div
          className="button-content-inner"
          initial="initial"
          animate={state.step === 1 ? "step1" : "step2"}
          transition={{ duration: 0.75, type: "spring", bounce: 0.15 }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key="search-text-wrapper"
              className="search-results"
              role="listbox"
              aria-label="Search results"
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                delay: isUnsupported ? 0.5 : 1.25,
                duration: 0.5,
              }}
            />
          </AnimatePresence>

          <motion.div
            variants={buttonVariants}
            onClick={handleButtonClick}
            whileHover={{ scale: state.step === 2 ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="search-btn"
            role="button"
          >
            {state.step === 1 ? (
              <span className="search-text">Search</span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Type to search..."
                aria-label="Search input"
                onChange={handleSearch}
              />
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            {state.step === 2 && (
              <motion.div
                key="icon"
                className="separate-element"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariants}
                transition={{
                  delay: 0.1,
                  duration: 0.85,
                  type: "spring",
                  bounce: 0.15,
                }}
              >
                {!state.isLoading ? <GooeySearchIcon isUnsupported={isUnsupported} /> : <LoadingIcon />}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="top-band">
        <div className="top-band-inner">
          <div className="top-contact">
            <a href={`mailto:${contactEmail}`} className="top-contact-link">
              <Mail size={16} />
              {contactEmail}
            </a>
            <a href={`tel:${phone}`} className="top-contact-link">
              <Phone size={16} />
              {phone}
            </a>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="main-header-inner">
          <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <img src={images.logo} alt="Logo Djelong Papiers" className="h-12 w-12 rounded-lg object-cover" />
            <span className="min-w-0">
              <span className="block text-base font-black text-[#17492f]">Djelong Papiers</span>
              <span className="block text-xs text-[#486c59]">Transformation industrielle</span>
            </span>
          </Link>

          <div className="header-right">
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }: { isActive: boolean }) =>
                    `relative px-3 py-2 text-sm font-bold transition ${
                      isActive
                        ? "text-[#17492f] after:absolute after:inset-x-3 after:-bottom-1 after:h-[2px] after:bg-[#17492f] after:content-['']"
                        : "text-[#274b38] hover:text-[#17492f]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="header-search">
              <GooeySearch />
            </div>

            <button className="btn-creuse grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Ouvrir le menu">
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }: { isActive: boolean }) =>
                `relative px-3 py-3 text-sm font-bold transition ${
                  isActive
                    ? "text-[#17492f] after:absolute after:inset-x-3 after:bottom-1 after:h-[2px] after:bg-[#17492f] after:content-['']"
                    : "text-[#274b38] hover:text-[#17492f]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a href={`tel:${phone}`} className="mt-2 flex items-center gap-2 px-3 py-3 text-sm font-black text-[#17492f]">
            <Phone size={17} />
            {phone}
          </a>
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
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-1000 ${index === 0 ? "hero-image-primary" : ""} ${active === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,19,0.74),rgba(5,30,19,0.38)_48%,rgba(5,30,19,0.04))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,30,19,0.08),rgba(5,30,19,0.04)_55%,rgba(5,30,19,0.54))]" />
      <div className="hero-bottom-fade" />

      <div className="relative mx-auto flex min-h-[96svh] max-w-7xl items-end px-5 pb-16 pt-44 sm:px-8 sm:pt-48">
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
          <div className="reveal mt-14 overflow-hidden bg-white/82 shadow-[0_24px_70px_rgba(19,63,42,0.14)] rounded-lg">
            <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
              <img src={images.activity} alt="Transformation industrielle du papier" className="h-[360px] w-full object-cover sm:h-[440px] lg:h-full" />
              <div className="p-7 sm:p-10">
                <p className="text-sm font-black uppercase text-[#2c7a4b]">Activité principale</p>
                <h3 className="mt-3 text-3xl font-black text-[#133f2a] sm:text-5xl">Transformer le papier avec précision industrielle.</h3>
                <p className="mt-5 text-lg leading-9 text-[#536a5e]">
                  Djelong Papiers organise la matière papier autour d'un flux clair : réception, préparation, transformation, contrôle, conditionnement et mise à disposition des commandes professionnelles.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {["Formats réguliers", "Conditionnement propre", "Contrôle de lot", "Demandes sur mesure"].map((item) => (
                    <div key={item} className="flex items-center gap-2 font-black text-[#17492f]">
                      <CheckCircle2 size={18} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-10 -translate-x-1/2 text-[#2c7a4b] lg:w-16">
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
              <article key={item.title} className={`reveal grid grid-cols-2 ${index % 2 === 0 ? "pr-8 sm:pr-12 lg:pr-20" : "pl-10 sm:pl-16 lg:pl-32"}`}>
                <div className={`btn-card roadmap-card p-4 sm:p-6 ${index % 2 === 0 ? "w-[92%] lg:w-[86%]" : "col-start-2 ml-auto w-[92%] lg:w-[86%]"}`}>
                  <p className="text-sm font-black text-[#2c7a4b]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-black text-[#133f2a] sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#536a5e] sm:text-base sm:leading-8">{item.text}</p>
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
      <PageHero title="À propos de Djelong Papiers" subtitle="Une entreprise de transformation industrielle du papier avec une identité claire, verte et professionnelle." image={images.gate} icon={Building2} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal grid gap-5 lg:grid-cols-2">
            <Link to="/a-propos/message-du-pdg" className="group overflow-hidden bg-white/82 shadow-[0_18px_48px_rgba(19,63,42,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(19,63,42,0.18)] rounded-lg">
              <div className="grid gap-0 md:grid-cols-[0.78fr_1fr]">
                <img src={images.production} alt="" className="h-64 w-full object-cover md:h-full" />
                <div className="p-7">
                  <p className="text-sm font-black uppercase text-[#2c7a4b]">Sous-catégorie</p>
                  <h2 className="mt-3 text-3xl font-black text-[#133f2a]">Message du PDG</h2>
                  <p className="mt-4 leading-8 text-[#536a5e]">Une prise de parole forte sur la vision, la qualité industrielle et la confiance avec les partenaires.</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-black text-[#17492f]">Lire le message <ArrowRight size={18} /></span>
                </div>
              </div>
            </Link>

            <Link to="/a-propos/histoire" className="group overflow-hidden bg-white/82 shadow-[0_18px_48px_rgba(19,63,42,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(19,63,42,0.18)] rounded-lg">
              <div className="grid gap-0 md:grid-cols-[0.78fr_1fr]">
                <img src={images.logistics} alt="" className="h-64 w-full object-cover md:h-full" />
                <div className="p-7">
                  <p className="text-sm font-black uppercase text-[#2c7a4b]">Sous-catégorie</p>
                  <h2 className="mt-3 text-3xl font-black text-[#133f2a]">Histoire</h2>
                  <p className="mt-4 leading-8 text-[#536a5e]">Le parcours Djelong Papiers, entre transformation papier, discipline industrielle et ambition internationale.</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-black text-[#17492f]">Découvrir l'histoire <ArrowRight size={18} /></span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutBlocks.map((item) => (
              <article key={item.title} className="reveal bg-white/72 p-6 shadow-[0_14px_36px_rgba(19,63,42,0.1)] rounded-lg">
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

function PdgMessagePage() {
  useScrollReveal();
  return (
    <>
      <PageHero title="Message du PDG" subtitle="Une vision industrielle claire : produire avec rigueur, servir avec confiance et construire une marque papier durable." image={images.production} icon={Quote} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="reveal overflow-hidden bg-[#0b2f20] text-white shadow-[0_24px_70px_rgba(11,47,32,0.22)] rounded-lg">
            <img src={images.gate} alt="" className="h-72 w-full object-cover opacity-85" />
            <div className="p-7">
              <p className="text-sm font-black uppercase text-white/62">Direction générale</p>
              <h2 className="mt-3 text-3xl font-black">Djelong Papiers</h2>
              <p className="mt-4 leading-8 text-white/72">Une parole tournée vers les clients professionnels, les équipes, les partenaires et l'industrie papier.</p>
            </div>
          </aside>

          <article className="reveal bg-white/88 p-7 shadow-[0_20px_60px_rgba(19,63,42,0.12)] rounded-lg sm:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center bg-[#17492f] text-white rounded-lg">
                <Quote size={28} />
              </div>
              <div>
                <p className="text-sm font-black uppercase text-[#2c7a4b]">Message de la direction</p>
                <h2 className="text-3xl font-black text-[#133f2a]">Chers partenaires, chers clients</h2>
              </div>
            </div>

            <div className="grid gap-5 text-lg leading-9 text-[#536a5e]">
              <p>Chez <strong className="text-[#133f2a]">Djelong Papiers</strong>, nous considérons le papier comme une matière industrielle noble : simple en apparence, exigeante dans sa transformation et essentielle dans la vie des entreprises.</p>
              <p>Notre engagement est de bâtir une organisation fiable, capable de répondre aux besoins des professionnels avec des produits réguliers, un conditionnement propre, des délais maîtrisés et une communication directe.</p>
              <p>Chaque lot qui quitte notre atelier doit porter la même exigence : respect du cahier des charges, contrôle de présentation, soin dans l'emballage et sens du service. C'est cette discipline qui transforme une commande papier en relation de confiance.</p>
              <p>Notre ambition est de faire de Djelong Papiers une référence industrielle algérienne, ouverte aux standards internationaux et prête à accompagner les distributeurs, les collectivités et les entreprises dans leurs besoins quotidiens comme dans leurs projets sur mesure.</p>
              <p>Je remercie nos équipes pour leur engagement, nos partenaires pour leur confiance et nos clients pour leurs exigences, car elles nous poussent chaque jour à mieux produire, mieux organiser et mieux servir.</p>
            </div>

            <div className="mt-10 border-t border-[#d9e4dc] pt-7">
              <p className="font-black text-[#133f2a]">La Direction Générale</p>
              <p className="mt-2 text-[#2c7a4b]">Djelong Papiers</p>
              <div className="mt-5 h-px w-48 bg-[#17492f]" />
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function HistoryPage() {
  useScrollReveal();
  const storyBlocks = [
    {
      title: "Une naissance autour de la matière papier",
      text: "Djelong Papiers s'est construite autour d'une idée simple : donner au papier une transformation industrielle propre, lisible et adaptée aux besoins des professionnels. L'entreprise a placé dès le départ la régularité, le format et le conditionnement au centre de son organisation.",
      image: images.gate,
    },
    {
      title: "L'atelier comme cœur de la confiance",
      text: "La croissance s'est organisée autour de gestes maîtrisés : réception, préparation, découpe, façonnage, contrôle et emballage. Chaque étape a été pensée pour réduire l'improvisation et donner aux clients une lecture claire de la qualité attendue.",
      image: images.production,
    },
    {
      title: "Une logistique pensée pour les commandes B2B",
      text: "Avec l'élargissement des besoins, Djelong Papiers a renforcé la préparation des lots, l'étiquetage, le stockage et la coordination commerciale. L'objectif : faciliter les commandes répétées, les volumes professionnels et les demandes spécifiques.",
      image: images.logistics,
    },
  ];

  return (
    <>
      <PageHero title="Histoire de Djelong Papiers" subtitle="Une histoire industrielle écrite autour du papier, de la discipline de production et d'une ambition ouverte sur les standards internationaux." image={images.logistics} icon={Factory} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12">
          {storyBlocks.map((block, index) => (
            <article key={block.title} className={`reveal grid items-center gap-8 lg:grid-cols-2 ${index % 2 === 1 ? "lg:[&>img]:order-2" : ""}`}>
              <img src={block.image} alt="" className="h-[360px] w-full object-cover shadow-[0_20px_60px_rgba(19,63,42,0.14)] rounded-lg" />
              <div className="bg-white/78 p-8 shadow-[0_14px_42px_rgba(19,63,42,0.1)] rounded-lg">
                <p className="text-sm font-black uppercase text-[#2c7a4b]">Étape {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-3xl font-black text-[#133f2a] sm:text-4xl">{block.title}</h2>
                <p className="mt-5 text-lg leading-9 text-[#536a5e]">{block.text}</p>
              </div>
            </article>
          ))}

          <div className="reveal bg-[#0b2f20] p-8 text-white shadow-[0_24px_70px_rgba(11,47,32,0.22)] rounded-lg sm:p-10">
            <p className="text-sm font-black uppercase text-white/58">Standards des grandes entreprises chinoises</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-black sm:text-5xl">Une culture industrielle inspirée par la rigueur, le volume et l'amélioration continue.</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                ["Discipline de production", "Des séries préparées avec méthode, des contrôles visibles et une logique de répétabilité."],
                ["Organisation à grande échelle", "Une vision qui anticipe les volumes, les familles de produits et la stabilité des approvisionnements."],
                ["Relation long terme", "Construire avec les clients et les partenaires une confiance durable, claire et mesurable."],
              ].map(([title, text]) => (
                <div key={title} className="bg-white/10 p-6 backdrop-blur rounded-lg">
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({ title, subtitle, image, icon: Icon }: { title: string; subtitle: string; image: string; icon: LucideIcon }) {
  return (
    <section className="relative min-h-[60svh] overflow-hidden bg-[#0b2f20] px-5 pb-16 pt-44 text-white sm:px-8 sm:pt-48">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,19,0.72),rgba(5,30,19,0.28))]" />
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
        <Route path="/a-propos/message-du-pdg" element={<PdgMessagePage />} />
        <Route path="/a-propos/histoire" element={<HistoryPage />} />
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
