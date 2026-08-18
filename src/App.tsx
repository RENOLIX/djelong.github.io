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
  ChevronDown,
  ClipboardCheck,
  Factory,
  FileText,
  Globe2,
  Layers3,
  Leaf,
  LockKeyhole,
  ImageUp,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  PackageCheck,
  Pencil,
  Phone,
  Plus,
  Quote,
  Recycle,
  Send,
  ShieldCheck,
  Truck,
  Trash2,
  LogOut,
  X,
  type LucideIcon,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const phone = "0563042728";
const contactEmail = "contact@djelong-papiers.dz";
const mapUrl = "https://maps.app.goo.gl/zAZZtjYuU4ZGvjCv9?g_st=iw";
const mapEmbedUrl = "https://maps.google.com/maps?hl=fr&q=EURL%20DJELONG%20PAPIERS%2C%20A%C3%AFn%20Oussara%2C%20ILOT%202010%20CITE%20SLIMANI%20SELIMANE&z=16&iwloc=B&output=embed";
const newsApiUrl = import.meta.env.VITE_NEWS_API_URL?.replace(/\/$/, "") ?? "";

const images = {
  logo: asset("images/hero/djelong-logo-reference.jpeg"),
  gate: asset("images/hero/djelong-factory-gate.png"),
  production: asset("images/hero/paper-production-line.png"),
  logistics: asset("images/hero/paper-logistics-warehouse.png"),
  activity: asset("images/djelong-media/IMG-20260723-WA0004.jpg"),
  company: asset("images/djelong-media/IMG-20260723-WA0008.jpg"),
  quality: asset("images/djelong-media/IMG-20260723-WA0009.jpg"),
  workshop: asset("images/djelong-media/IMG-20260723-WA0010.jpg"),
  storage: asset("images/djelong-media/IMG-20260723-WA0012.jpg"),
  delivery: asset("images/djelong-media/IMG-20260723-WA0013.jpg"),
  video: asset("images/djelong-media/VID-20260723-WA0034.mp4"),
};

const galleryPhotos = [
  "IMG-20260723-WA0004.jpg", "IMG-20260723-WA0008.jpg", "IMG-20260723-WA0009.jpg", "IMG-20260723-WA0010.jpg",
  "IMG-20260723-WA0012.jpg", "IMG-20260723-WA0013.jpg", "IMG-20260723-WA0014.jpg", "IMG-20260723-WA0015.jpg",
  "IMG-20260723-WA0019.jpg", "IMG-20260723-WA0020.jpg", "IMG-20260723-WA0021.jpg", "IMG-20260723-WA0022.jpg",
  "IMG-20260723-WA0023.jpg", "IMG-20260723-WA0024.jpg", "IMG-20260723-WA0026.jpg", "IMG-20260723-WA0027.jpg",
  "IMG-20260723-WA0028.jpg", "IMG-20260723-WA0037.jpg", "IMG-20260723-WA0038.jpg", "IMG-20260723-WA0040.jpg",
  "IMG-20260723-WA0041.jpg", "IMG-20260723-WA0042.jpg", "IMG-20260723-WA0043.jpg", "IMG-20260723-WA0044.jpg",
].map((name) => asset(`images/djelong-media/${name}`));

const paperSpecifications = {
  types: ["Testliner", "Fluting"],
  weights: [90, 100, 110, 120, 130, 150],
  widths: [850, 900, 1000, 1050, 1100, 1250, 1300, 1400, 1410, 1450, 1500, 1600, 1700, 1900, 1950, 2000, 2050, 2100, 2110, 2150, 2160, 2200, 2220, 2250, 2300, 2310, 2350, 2400, 2450, 2500],
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

const aboutSubItems = [
  { label: "Histoire", path: "/a-propos/histoire" },
  { label: "Message du PDG", path: "/a-propos/message-du-pdg" },
];

const heroSlides = [
  {
    image: images.gate,
    eyebrow: "Transformation industrielle du papier",
    title: "Djelong Papiers, industrie du papier",
    text: "Une plateforme industrielle dédiée à la transformation du papier, avec des solutions fiables pour entreprises, distributeurs et collectivités.",
  },
  {
    image: images.production,
    eyebrow: "Production et finition",
    title: "Production maîtrisée, formats réguliers",
    text: "Des lignes pensées pour convertir, découper, contrôler et conditionner les produits papier avec régularité, propreté et rendement.",
  },
  {
    image: images.logistics,
    eyebrow: "Stockage et logistique",
    title: "Logistique organisée, livraison suivie",
    text: "Un stockage structuré pour préparer les lots, suivre les palettes et sécuriser les expéditions vers les clients professionnels.",
  },
];

const productLines = [
  {
    title: "Papier testliner",
    text: "Papier pour couverture et applications d'emballage, proposé selon les grammages et laizes disponibles.",
    icon: Layers3,
  },
  {
    title: "Papier fluting",
    text: "Support destiné à la cannelure et aux solutions d'emballage, avec préparation adaptée au besoin industriel.",
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
    image: images.quality,
    date: "Juillet 2026",
    title: "Mise en avant de l'identité Djelong Papiers",
    text: "La nouvelle présence digitale présente l'activité de transformation industrielle, les engagements qualité et les services pour clients professionnels.",
  },
  {
    image: images.storage,
    date: "Juin 2026",
    title: "Organisation commerciale et logistique",
    text: "Djelong Papiers structure la présentation de ses services pour faciliter les demandes de prix, les commandes et les projets sur mesure.",
  },
  {
    image: images.company,
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
              {navItems.map((item) => item.path === "/a-propos" ? (
                <div key={item.path} className="nav-dropdown">
                  <NavLink
                    to={item.path}
                    className={({ isActive }: { isActive: boolean }) =>
                      `nav-dropdown-trigger relative px-3 py-2 text-sm font-bold transition ${
                        isActive
                          ? "text-[#17492f] after:absolute after:inset-x-3 after:-bottom-1 after:h-[2px] after:bg-[#17492f] after:content-['']"
                          : "text-[#274b38] hover:text-[#17492f]"
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={14} aria-hidden="true" />
                  </NavLink>
                  <div className="nav-dropdown-menu">
                    {aboutSubItems.map((subItem) => (
                      <NavLink key={subItem.path} to={subItem.path} end className={({ isActive }) => clsx("nav-dropdown-link", isActive && "is-active")}>{subItem.label}</NavLink>
                    ))}
                  </div>
                </div>
              ) : (
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
          {navItems.map((item) => item.path === "/a-propos" ? (
            <div key={item.path} className="mobile-about-group">
              <p className="px-3 pt-3 text-xs font-black uppercase text-[#6d8377]">À propos</p>
              {aboutSubItems.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => clsx("mobile-subnav-link", isActive && "is-active")}
                >
                  {subItem.label}
                </NavLink>
              ))}
            </div>
          ) : (
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
          className={`hero-image-primary absolute inset-0 h-full w-full object-cover ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,30,19,0.74),rgba(5,30,19,0.38)_48%,rgba(5,30,19,0.04))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,30,19,0.08),rgba(5,30,19,0.04)_55%,rgba(5,30,19,0.54))]" />

      <div className="relative mx-auto flex min-h-[96svh] max-w-7xl items-end px-5 pb-16 pt-44 sm:px-8 sm:pt-48">
        <div className="max-w-4xl">
          <h1 className="hero-title reveal font-black leading-[0.94] text-white">{slide.title}</h1>
          <p className="reveal mt-6 max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">{slide.text}</p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white px-5 py-3 font-black text-[#17492f] transition hover:bg-[#dce9dd] rounded-lg">
              Demander un devis <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/12 px-5 py-3 font-black text-white backdrop-blur-xl transition hover:bg-white/22 rounded-lg">
              Recevoir une offre
            </Link>
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

function PaperSpecifications() {
  return (
    <section className="bg-[#eff5f0] px-5 py-24 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="reveal overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(19,63,42,0.12)] lg:sticky lg:top-32 lg:self-start">
          <img src={images.quality} alt="Papier Djelong Papiers" className="h-[360px] w-full object-cover" />
        </div>
        <div className="reveal">
          <p className="text-sm font-black uppercase text-[#2c7a4b]">Spécifications papier</p>
          <h2 className="mt-3 text-4xl font-black text-[#133f2a] sm:text-5xl">Des références préparées selon votre besoin.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#536a5e]">Djelong Papiers propose des papiers destinés à l'emballage et à la transformation, avec des formats à valider selon la disponibilité et votre cahier des charges.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="btn-card p-6"><p className="text-sm font-black uppercase text-[#2c7a4b]">Types</p><p className="mt-3 text-2xl font-black text-[#133f2a]">{paperSpecifications.types.join(" / ")}</p></div>
            <div className="btn-card p-6"><p className="text-sm font-black uppercase text-[#2c7a4b]">Grammages</p><p className="mt-3 text-2xl font-black text-[#133f2a]">{paperSpecifications.weights.join(" - ")} g</p></div>
          </div>
          <div className="btn-card mt-4 p-6">
            <p className="text-sm font-black uppercase text-[#2c7a4b]">Laizes disponibles</p>
            <div className="mt-4 flex flex-wrap gap-2">{paperSpecifications.widths.map((width) => <span key={width} className="rounded-md bg-[#dbeee0] px-3 py-2 text-sm font-black text-[#17492f]">{width} mm</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const context = gsap.context(() => {
      const words = title.querySelectorAll<HTMLElement>("[data-gallery-word]");
      gsap.set(words, { y: "calc(100% + 0.75em)" });
      gsap.to(words, {
        y: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: title,
          start: "top 90%",
          once: true,
        },
      });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let frame = 0;
    let previousY = window.scrollY;
    let previousTime = performance.now();
    let speed = 0;
    let offset = 0;

    const animate = (time: number) => {
      const elapsed = Math.max(time - previousTime, 1);
      const currentY = window.scrollY;
      speed = (currentY - previousY) / elapsed;
      offset += (40 * speed - offset) * Math.min(1, 0.0075 * elapsed);
      speed *= Math.pow(0.4, elapsed / (1000 / 60));
      grid.style.setProperty("--gallery-y", `${offset.toFixed(4)}px`);
      previousY = currentY;
      previousTime = time;
      frame = requestAnimationFrame(animate);
    };

    if (window.matchMedia("(min-width: 769px) and (prefers-reduced-motion: no-preference)").matches) {
      frame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section ref={sectionRef} className="media-gallery">
      <div ref={titleRef} className="gallery-large-title">
        <p className="gallery-uptitle">
          <span className="gallery-word-mask"><em data-gallery-word>notre</em></span>{" "}
          <span className="gallery-word-mask"><strong data-gallery-word>SAVOIR-FAIRE</strong></span>
        </p>
        <h2 className="gallery-title">
          <span className="gallery-title-line">
            <span className="gallery-word-mask"><em data-gallery-word>transforme la</em></span>{" "}
            <span className="gallery-word-mask"><strong data-gallery-word>MATIÈRE</strong></span>
          </span>
          <span className="gallery-title-line">
            <span className="gallery-word-mask"><em data-gallery-word>en une</em></span>{" "}
            <span className="gallery-word-mask"><strong data-gallery-word>SIGNATURE.</strong></span>
          </span>
        </h2>
      </div>

      <div className="gallery-grid-push">
        <ul ref={gridRef} className="gallery-vero-grid">
          {galleryPhotos.map((image, index) => (
            <li key={image} className="gallery-vero-item">
              <figure>
                <div className="gallery-vero-media"><img src={image} alt={`Djelong Papiers - galerie ${index + 1}`} loading="lazy" /></div>
                <figcaption><span>Djelong Papiers</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

    </section>
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

      <PaperSpecifications />

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
            <img src={images.workshop} alt="Atelier Djelong Papiers" className="h-[560px] w-full object-cover" />
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
      <MediaGallery />
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
          <div className="pointer-events-none absolute -left-2 top-0 h-full w-10 text-[#2c7a4b] lg:left-1/2 lg:w-16 lg:-translate-x-1/2">
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
              <article
                key={item.title}
                className={`reveal pl-12 lg:grid lg:grid-cols-2 lg:pl-0 ${
                  index % 2 === 0 ? "lg:pr-20" : "lg:pl-32"
                }`}
              >
                <div
                  className={`btn-card roadmap-card w-full p-4 sm:p-6 lg:w-[86%] ${
                    index % 2 === 0 ? "" : "lg:col-start-2 lg:ml-auto"
                  }`}
                >
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
  const [publishedNews, setPublishedNews] = useState(news);

  useEffect(() => {
    if (!newsApiUrl) return;
    fetch(`${newsApiUrl}/news`)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Actualités indisponibles"))))
      .then((payload: { items: Array<{ id: string; title: string; excerpt: string; coverImage: string; publishedAt: string | null }> }) => {
        if (!payload.items.length) return;
        setPublishedNews(payload.items.map((item) => ({
          image: item.coverImage,
          date: item.publishedAt ? new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date(item.publishedAt)) : "Actualité Djelong",
          title: item.title,
          text: item.excerpt,
        })));
      })
      .catch(() => undefined);
  }, []);

  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Actualités"
          title="Actualités de l'entreprise"
          text="Des cartes simples, professionnelles, illustrées et orientées communication corporate."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {publishedNews.map((item) => (
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
              Ouvrir Google Maps
            </a>
          </div>
          <div className="map-panel mt-6">
            <iframe
              title="Djelong Papiers sur Google Maps"
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[300px] w-full border-0"
            />
            <a href={mapUrl} target="_blank" rel="noreferrer" className="map-pin-label">
              <MapPin size={17} />
              EURL DJELONG PAPIERS
            </a>
            <p className="mt-4 text-sm font-bold text-[#536a5e]">Aïn Oussara, ILOT 2010 Cité Slimani Selimane</p>
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
      <PageHero title="À propos de Djelong Papiers" subtitle="Une entreprise de transformation industrielle du papier avec une identité claire, verte et professionnelle." icon={Building2} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="reveal grid gap-5 lg:grid-cols-2">
            <Link to="/a-propos/message-du-pdg" className="group overflow-hidden bg-white/82 shadow-[0_18px_48px_rgba(19,63,42,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(19,63,42,0.18)] rounded-lg">
              <div className="grid gap-0 md:grid-cols-[0.78fr_1fr]">
                <img src={images.workshop} alt="" className="h-64 w-full object-cover md:h-full" />
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
                <img src={images.storage} alt="" className="h-64 w-full object-cover md:h-full" />
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
      <PageHero title="Message du PDG" subtitle="Une vision industrielle claire : produire avec rigueur, servir avec confiance et construire une marque papier durable." icon={Quote} />
      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="reveal overflow-hidden bg-[#0b2f20] text-white shadow-[0_24px_70px_rgba(11,47,32,0.22)] rounded-lg">
            <img src={images.company} alt="" className="h-72 w-full object-cover opacity-85" />
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
      image: images.company,
    },
    {
      title: "L'atelier comme cœur de la confiance",
      text: "La croissance s'est organisée autour de gestes maîtrisés : réception, préparation, découpe, façonnage, contrôle et emballage. Chaque étape a été pensée pour réduire l'improvisation et donner aux clients une lecture claire de la qualité attendue.",
      image: images.workshop,
    },
    {
      title: "Une logistique pensée pour les commandes B2B",
      text: "Avec l'élargissement des besoins, Djelong Papiers a renforcé la préparation des lots, l'étiquetage, le stockage et la coordination commerciale. L'objectif : faciliter les commandes répétées, les volumes professionnels et les demandes spécifiques.",
      image: images.delivery,
    },
  ];

  return (
    <>
      <PageHero title="Histoire de Djelong Papiers" subtitle="Une histoire industrielle écrite autour du papier, de la discipline de production et d'une ambition ouverte sur les standards internationaux." icon={Factory} />
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

function PageHero({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: LucideIcon }) {
  return (
    <section className="page-hero relative min-h-[52svh] overflow-hidden px-5 pb-16 pt-44 text-white sm:px-8 sm:pt-48">
      <div className="page-hero-roll page-hero-roll-one" />
      <div className="page-hero-roll page-hero-roll-two" />
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

function SitesPage() {
  const steps = [
    ["01", "Réception et préparation", "Les supports papier et commandes entrantes sont identifiés, orientés et préparés avant le lancement d'une série."],
    ["02", "Transformation", "Les opérations sont organisées par format, usage, séquence de travail et exigences de conditionnement."],
    ["03", "Contrôle de présentation", "L'équipe vérifie visuellement l'aspect, la régularité, la propreté et la cohérence des lots préparés."],
    ["04", "Stockage et expédition", "Les commandes validées sont regroupées, étiquetées et préparées pour retrait ou livraison professionnelle."],
  ];
  return <>
    <PageHero title="Sites et organisation" subtitle="Un fonctionnement lisible, de la préparation matière à la remise de commande." icon={MapPin} />
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div className="reveal"><p className="text-sm font-black uppercase text-[#2c7a4b]">Un même cap opérationnel</p><h2 className="mt-3 text-4xl font-black text-[#133f2a] sm:text-5xl">Des zones pensées pour faire circuler le papier avec méthode.</h2><p className="mt-6 text-lg leading-9 text-[#536a5e]">Chez Djelong Papiers, chaque zone répond à une fonction précise : réceptionner, transformer, vérifier, conditionner puis mettre à disposition. Cette organisation donne aux interlocuteurs commerciaux une lecture simple de l'avancement de leur demande.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Référent commercial", "Préparation de série", "Contrôle de lot", "Suivi de commande"].map(item => <div key={item} className="flex items-center gap-2 font-black text-[#17492f]"><CheckCircle2 size={18} />{item}</div>)}</div></div><img src={images.storage} alt="Organisation et stockage Djelong" className="reveal h-[420px] w-full rounded-lg object-cover shadow-[0_20px_60px_rgba(19,63,42,0.14)]" /></div></section>
    <section className="bg-[#eff5f0] px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Parcours opérationnel" title="Quatre temps, un seul niveau d'exigence." text="L'organisation est conçue pour fiabiliser les échanges, les formats et la présentation finale des produits." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{steps.map(([number,title,text]) => <article key={number} className="btn-card reveal p-7"><span className="text-4xl font-black text-[#8ac59a]">{number}</span><h3 className="mt-8 text-2xl font-black text-[#133f2a]">{title}</h3><p className="mt-4 leading-8 text-[#536a5e]">{text}</p></article>)}</div></div></section>
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-6 md:grid-cols-3"><img src={galleryPhotos[5]} alt="Djelong Papiers" className="reveal h-80 w-full rounded-lg object-cover" /><img src={galleryPhotos[10]} alt="Djelong Papiers" className="reveal h-80 w-full rounded-lg object-cover" /><img src={galleryPhotos[15]} alt="Djelong Papiers" className="reveal h-80 w-full rounded-lg object-cover" /></div><div className="reveal mt-10 bg-[#133f2a] p-8 text-white rounded-lg sm:p-10"><p className="text-sm font-black uppercase text-[#a7d8ad]">Service professionnel</p><h2 className="mt-3 max-w-4xl text-3xl font-black sm:text-5xl">Une organisation conçue pour les commandes récurrentes comme pour les demandes spécifiques.</h2><p className="mt-5 max-w-3xl leading-8 text-white/75">Format, quantité, usage, conditionnement et délai peuvent être discutés dès le premier échange afin de préparer une réponse commerciale claire et exploitable.</p></div></div></section>
  </>;
}

function SustainabilityPage() {
  const commitments = [["Réduire les pertes évitables", "Mieux préparer les séries pour limiter les reprises, les découpes inutiles et les écarts de présentation."], ["Valoriser l'organisation", "Structurer les zones et les lots afin de simplifier les manipulations, le stockage et les contrôles."], ["Produire avec justesse", "Adapter les formats et conditionnements au besoin réellement exprimé par le client."], ["Améliorer en continu", "Identifier les retours terrain, ajuster les habitudes de travail et renforcer les points de contrôle utiles."]];
  return <>
    <PageHero title="Durabilité" subtitle="Une responsabilité concrète : mieux préparer, mieux transformer et mieux organiser la matière papier." icon={Leaf} />
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center"><img src={images.quality} alt="Djelong Papiers et la qualité" className="reveal h-[440px] w-full rounded-lg object-cover" /><div className="reveal"><p className="text-sm font-black uppercase text-[#2c7a4b]">Une démarche réaliste</p><h2 className="mt-3 text-4xl font-black text-[#133f2a] sm:text-5xl">La durabilité commence par une production mieux tenue.</h2><p className="mt-6 text-lg leading-9 text-[#536a5e]">Djelong Papiers présente la durabilité comme une discipline d'atelier : éviter ce qui peut l'être, organiser les opérations, protéger la qualité du papier et donner au client des produits cohérents avec son usage.</p><p className="mt-4 leading-8 text-[#536a5e]">Cette page décrit des axes de progrès et des engagements de travail. Les indicateurs chiffrés seront publiés lorsque les relevés internes auront été consolidés.</p></div></div></section>
    <section className="bg-[#eff5f0] px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Engagements" title="Transformer avec davantage de maîtrise." text="Des pratiques utiles, mesurables et adaptées au quotidien d'une activité papier." /><div className="mt-12 grid gap-5 md:grid-cols-2">{commitments.map(([title,text],index) => <article key={title} className="btn-card reveal flex gap-5 p-7"><span className="grid h-11 w-11 shrink-0 place-items-center bg-[#17492f] text-lg font-black text-white rounded-lg">0{index + 1}</span><div><h3 className="text-2xl font-black text-[#133f2a]">{title}</h3><p className="mt-3 leading-8 text-[#536a5e]">{text}</p></div></article>)}</div></div></section>
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"><div className="reveal bg-[#133f2a] p-8 text-white rounded-lg sm:p-10"><p className="text-sm font-black uppercase text-[#a7d8ad]">Référentiel de suivi</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">Les sujets suivis dans l'atelier.</h2><div className="mt-8 grid gap-4">{["Organisation des formats et des chutes", "Qualité de conditionnement", "Propreté des zones de travail", "Regroupement et rotation des lots", "Remontées clients et actions correctives"].map(item => <div key={item} className="flex items-center gap-3 border-b border-white/15 pb-4 font-bold"><CheckCircle2 size={19} className="text-[#a7d8ad]" />{item}</div>)}</div></div><img src={images.workshop} alt="Atelier Djelong" className="reveal h-full min-h-[400px] w-full rounded-lg object-cover" /></div></div></section>
  </>;
}

function InvestorsPage() {
  const pillars = [["Marché", "L'emballage et les usages professionnels du papier reposent sur des besoins concrets : continuité d'approvisionnement, formats adaptés et relation commerciale fiable."], ["Capacité", "Le développement passe par la structuration progressive des gammes, des procédés et de la préparation des commandes."], ["Partenariats", "Djelong Papiers recherche des relations durables avec fournisseurs, distributeurs, clients professionnels et partenaires industriels."], ["Gouvernance", "La priorité est donnée à une organisation lisible : demandes tracées, responsabilités claires et décisions fondées sur les besoins opérationnels."]];
  return <>
    <PageHero title="Investisseurs et partenaires" subtitle="Une vision industrielle fondée sur le papier, le service B2B et la construction de partenariats durables." icon={BarChart3} />
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div className="reveal"><p className="text-sm font-black uppercase text-[#2c7a4b]">La thèse Djelong</p><h2 className="mt-3 text-4xl font-black text-[#133f2a] sm:text-5xl">Développer une entreprise papier fiable, proche du besoin terrain.</h2><p className="mt-6 text-lg leading-9 text-[#536a5e]">Djelong Papiers se positionne sur la transformation industrielle, les solutions d'emballage et la préparation de produits papier pour les professionnels. L'ambition est d'assembler savoir-faire de production, exigence de présentation et capacité de dialogue commercial.</p><p className="mt-4 leading-8 text-[#536a5e]">Cette page présente le projet d'entreprise et ses axes de développement. Elle ne constitue pas une offre financière ni une promesse de rendement.</p></div><img src={images.company} alt="Djelong Papiers" className="reveal h-[420px] w-full rounded-lg object-cover" /></div></section>
    <section className="bg-[#eff5f0] px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Axes de création de valeur" title="Quatre leviers pour consolider le projet." text="Une approche construite autour de la demande industrielle, de l'exécution et de la qualité de relation." /><div className="mt-12 grid gap-5 md:grid-cols-2">{pillars.map(([title,text]) => <article key={title} className="btn-card reveal p-8"><h3 className="text-3xl font-black text-[#133f2a]">{title}</h3><p className="mt-4 leading-8 text-[#536a5e]">{text}</p></article>)}</div></div></section>
    <section className="px-5 py-24 sm:px-8"><div className="mx-auto max-w-7xl"><div className="reveal overflow-hidden rounded-lg bg-[#0b2f20] p-8 text-white sm:p-10"><p className="text-sm font-black uppercase text-[#a7d8ad]">Feuille de route</p><div className="mt-7 grid gap-6 md:grid-cols-3">{[["Structurer", "Clarifier les gammes, les spécifications, les demandes de devis et les outils de présentation."], ["Développer", "Étendre les relations commerciales, consolider la distribution et étudier les demandes à valeur ajoutée."], ["Pérenniser", "Renforcer les habitudes de qualité, les échanges partenaires et les repères de pilotage internes."]].map(([title,text],index) => <div key={title} className="border-t border-white/20 pt-5"><span className="text-2xl font-black text-[#a7d8ad]">0{index + 1}</span><h3 className="mt-4 text-2xl font-black">{title}</h3><p className="mt-3 leading-7 text-white/72">{text}</p></div>)}</div></div><div className="mt-10 grid gap-6 md:grid-cols-2"><img src={images.delivery} alt="Djelong Papiers" className="reveal h-80 w-full rounded-lg object-cover" /><div className="btn-card reveal p-8"><p className="text-sm font-black uppercase text-[#2c7a4b]">Parlons partenariat</p><h2 className="mt-3 text-3xl font-black text-[#133f2a]">Un projet à construire avec des interlocuteurs qui connaissent l'industrie.</h2><p className="mt-5 leading-8 text-[#536a5e]">Pour une discussion commerciale, industrielle ou de partenariat, l'équipe Djelong Papiers est joignable par téléphone ou via le formulaire de contact.</p><Link to="/contact" className="mt-7 inline-flex items-center gap-2 bg-[#17492f] px-5 py-3 font-black text-white rounded-lg">Contacter Djelong <ArrowRight size={18} /></Link></div></div></div></section>
  </>;
}

function SimplePage({ type }: { type: "actualites" | "sites" | "durabilite" | "investisseurs" | "contact" }) {
  useScrollReveal();
  if (type === "actualites") {
    return (
      <>
        <PageHero title="Actualités" subtitle="La communication officielle de Djelong Papiers : production, organisation, qualité et relation client." icon={Newspaper} />
        <NewsPreview />
      </>
    );
  }
  if (type === "contact") {
    return (
      <>
        <PageHero title="Contact" subtitle="Un formulaire clair, un téléphone direct et une carte Google Maps pour localiser l'entreprise." icon={Mail} />
        <ContactSection />
      </>
    );
  }
  return type === "sites" ? <SitesPage /> : type === "durabilite" ? <SustainabilityPage /> : <InvestorsPage />;
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
            <a href={mapUrl} target="_blank" rel="noreferrer" className="hover:text-white">Google Maps</a>
            <span>EURL DJELONG PAPIERS</span>
            <span>Aïn Oussara, ILOT 2010 Cité Slimani Selimane</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/12 pt-6 text-sm text-white/56 md:flex-row">
        <span>© 2026 Djelong Papiers. Tous droits réservés.</span>
        <span>Site officiel hébergé sur Huawei Cloud.</span>
      </div>
    </footer>
  );
}

type ManagedNews = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: "BROUILLON" | "PUBLIE";
  publishedAt: string | null;
  updatedAt: string;
};

type NewsDraft = Omit<ManagedNews, "id" | "updatedAt">;

const emptyNewsDraft: NewsDraft = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  status: "BROUILLON",
  publishedAt: null,
};

async function adminRequest<T>(path: string, token: string, options: RequestInit = {}) {
  const response = await fetch(`${newsApiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(payload.message ?? "Une erreur est survenue.");
  }

  return (await response.json()) as T;
}

async function uploadNewsImage(file: File, token: string) {
  if (!file.type.startsWith("image/")) throw new Error("Choisis un fichier image.");
  if (file.size > 6 * 1024 * 1024) throw new Error("L'image doit faire moins de 6 Mo.");
  const content = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(new Error("Lecture de l'image impossible."));
    reader.readAsDataURL(file);
  });
  return adminRequest<{ imageUrl: string }>("/admin/uploads", token, {
    method: "POST",
    body: JSON.stringify({ mimeType: file.type, content }),
  });
}

function AdminPortal() {
  const [token, setToken] = useState(() => sessionStorage.getItem("djelong-admin-token") ?? "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<ManagedNews[]>([]);
  const [draft, setDraft] = useState<NewsDraft>(emptyNewsDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadNews = async (currentToken = token) => {
    const payload = await adminRequest<{ items: ManagedNews[] }>("/admin/news", currentToken);
    setItems(payload.items);
  };

  useEffect(() => {
    if (!token || !newsApiUrl) return;
    loadNews().catch((error: Error) => {
      setNotice(error.message);
      sessionStorage.removeItem("djelong-admin-token");
      setToken("");
    });
  }, [token]);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsApiUrl) {
      setNotice("L'API Huawei n'est pas encore reliée. Le panneau est prêt mais la base de données doit être créée avant la première connexion.");
      return;
    }

    setLoading(true);
    setNotice("");
    try {
      const payload = await adminRequest<{ token: string }>("/auth/login", "", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      sessionStorage.setItem("djelong-admin-token", payload.token);
      setToken(payload.token);
      setPassword("");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  const saveNews = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    try {
      const payload = await adminRequest<{ item: ManagedNews }>(editingId ? `/admin/news/${editingId}` : "/admin/news", token, {
        method: editingId ? "PATCH" : "POST",
        body: JSON.stringify(draft),
      });
      setItems((current) => (editingId ? current.map((item) => (item.id === payload.item.id ? payload.item : item)) : [payload.item, ...current]));
      setDraft(emptyNewsDraft);
      setEditingId(null);
      setNotice(editingId ? "Actualité mise à jour." : "Actualité ajoutée.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Enregistrement impossible.");
    } finally {
      setLoading(false);
    }
  };

  const removeNews = async (id: string) => {
    if (!window.confirm("Supprimer définitivement cette actualité ?")) return;
    try {
      await adminRequest(`/admin/news/${id}`, token, { method: "DELETE" });
      setItems((current) => current.filter((item) => item.id !== id));
      setNotice("Actualité supprimée.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Suppression impossible.");
    }
  };

  const updateDraft = <Key extends keyof NewsDraft>(key: Key, value: NewsDraft[Key]) => setDraft((current) => ({ ...current, [key]: value }));

  const selectCoverImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setNotice("");
    try {
      const payload = await uploadNewsImage(file, token);
      updateDraft("coverImage", payload.imageUrl);
      setNotice("Image téléversée. Elle sera utilisée pour cette actualité.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Téléversement impossible.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  if (!token) {
    return (
      <main className="admin-shell">
        <section className="admin-login">
          <div className="admin-mark"><img src={images.logo} alt="Djelong Papiers" /></div>
          <p className="admin-eyebrow">DJELONG PAPIERS</p>
          <h1>Administration des actualités</h1>
          <p>Un accès réservé pour publier la communication officielle de l'entreprise.</p>
          <form onSubmit={signIn} className="admin-form">
            <label>Adresse e-mail<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@djelong.com" /></label>
            <label>Mot de passe<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Votre mot de passe" /></label>
            <button type="submit" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
          </form>
          {notice && <p className="admin-notice">{notice}</p>}
          <Link to="/" className="admin-back">Retour au site</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <section className="admin-dashboard">
        <header className="admin-header">
          <div className="admin-brand"><img src={images.logo} alt="Djelong Papiers" /><div><p className="admin-eyebrow">ESPACE PRIVÉ</p><h1>Actualités Djelong</h1></div></div>
          <div className="admin-actions"><Link to="/actualites">Voir le site</Link><button onClick={() => { sessionStorage.removeItem("djelong-admin-token"); setToken(""); }} aria-label="Se déconnecter"><LogOut size={18} /></button></div>
        </header>
        <div className="admin-grid">
          <section className="admin-editor">
            <div className="admin-section-title"><div><p>{editingId ? "Modifier" : "Nouvelle actualité"}</p><h2>{editingId ? "Mettre à jour la publication" : "Créer une publication"}</h2></div><Plus size={22} /></div>
            <form onSubmit={saveNews} className="admin-form admin-form-editor">
              <label>Titre<input required value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="Titre de l'actualité" /></label>
              <label>Résumé<textarea required rows={3} value={draft.excerpt} onChange={(event) => updateDraft("excerpt", event.target.value)} placeholder="Résumé court" /></label>
              <label>Contenu<textarea required rows={7} value={draft.content} onChange={(event) => updateDraft("content", event.target.value)} placeholder="Texte complet de l'actualité" /></label>
              <div className="admin-upload">
                <div><span>Image de couverture</span><p>Choisis une photo depuis cet appareil.</p></div>
                <label className="admin-upload-button"><ImageUp size={18} />{uploading ? "Téléversement..." : "Choisir une image"}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectCoverImage} disabled={uploading} /></label>
                {draft.coverImage && <div className="admin-cover-preview"><img src={draft.coverImage} alt="Aperçu de l'image de couverture" /><button type="button" onClick={() => updateDraft("coverImage", "")}><X size={16} />Retirer l'image</button></div>}
              </div>
              <div className="admin-form-row"><label>Statut<select value={draft.status} onChange={(event) => updateDraft("status", event.target.value as NewsDraft["status"])}><option value="BROUILLON">Brouillon</option><option value="PUBLIE">Publié</option></select></label><label>Date de publication<input type="datetime-local" value={draft.publishedAt ?? ""} onChange={(event) => updateDraft("publishedAt", event.target.value ? new Date(event.target.value).toISOString() : null)} /></label></div>
              <div className="admin-editor-actions"><button type="submit" disabled={loading}>{loading ? "Enregistrement..." : editingId ? "Enregistrer" : "Ajouter l'actualité"}</button>{editingId && <button type="button" className="admin-cancel" onClick={() => { setEditingId(null); setDraft(emptyNewsDraft); }}>Annuler</button>}</div>
            </form>
            {notice && <p className="admin-notice">{notice}</p>}
          </section>
          <section className="admin-list">
            <div className="admin-section-title"><div><p>Publications</p><h2>{items.length} actualité{items.length > 1 ? "s" : ""}</h2></div></div>
            <div className="admin-news-list">
              {items.map((item) => <article key={item.id} className="admin-news-item"><img src={item.coverImage} alt="" /><div><span className={item.status === "PUBLIE" ? "admin-status-published" : "admin-status-draft"}>{item.status === "PUBLIE" ? "Publié" : "Brouillon"}</span><h3>{item.title}</h3><p>{item.excerpt}</p><div className="admin-item-actions"><button onClick={() => { setEditingId(item.id); setDraft({ title: item.title, excerpt: item.excerpt, content: item.content, coverImage: item.coverImage, status: item.status, publishedAt: item.publishedAt }); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Modifier"><Pencil size={16} /></button><button onClick={() => removeNews(item.id)} aria-label="Supprimer"><Trash2 size={16} /></button></div></div></article>)}
              {!items.length && <p className="admin-empty">Aucune actualité. Crée la première publication.</p>}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/admin" element={<AdminPortal />} />
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
      {!isAdmin && <Footer />}
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
