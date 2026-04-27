import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShieldCheck,
  FileText,
  Languages,
  Microscope,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Quote,
  Workflow,
  Lock,
  PenSquare,
} from "lucide-react";

// ===== VIDAME_REPERE_IMPORTS =====

// ===== VIDAME_REPERE_DONNEES_PAGES =====
const pages = [
  { id: "accueil", labelFr: "Accueil", labelEn: "Home" },
  { id: "apropos", labelFr: "À propos", labelEn: "About" },
  { id: "services", labelFr: "Offre de services", labelEn: "Services" },
  { id: "soumission", labelFr: "Obtenir un devis", labelEn: "Request a quote" },
  { id: "blog", labelFr: "Blog", labelEn: "Blog" },
];

// ===== VIDAME_REPERE_DONNEES_BLOG =====
const blogPosts = (lang: "fr" | "en") => [
  {
    title:
      lang === "fr"
        ? "Pourquoi la préparation des données est une étape scientifique à part entière"
        : "Why data preparation is a scientific step in its own right",
    excerpt:
      lang === "fr"
        ? "Transcrire, segmenter, anonymiser et structurer un corpus ne relève pas seulement de l'exécution technique : ce sont des opérations qui influencent directement la qualité du matériau de recherche."
        : "Transcribing, segmenting, anonymizing, and structuring a corpus is not merely technical execution — these operations directly shape the quality of the research material.",
    tag: lang === "fr" ? "Réflexion" : "Insight",
    date: lang === "fr" ? "Mars 2026" : "March 2026",
  },
  {
    title:
      lang === "fr"
        ? "L'IA en contexte sensible : garder la conformité au centre du workflow"
        : "AI in sensitive contexts: keeping compliance at the core of the workflow",
    excerpt:
      lang === "fr"
        ? "Quand les données touchent la santé, la recherche ou des milieux institutionnels, l'enjeu n'est pas seulement la performance des outils, mais la gouvernance de leur usage."
        : "When working with data related to health, research, or institutional settings, the challenge is not only tool performance, but the governance of their use.",
    tag: lang === "fr" ? "Conformité" : "Compliance",
    date: lang === "fr" ? "Mars 2026" : "March 2026",
  },
  {
    title:
      lang === "fr"
        ? "Du verbatim brut au corpus exploitable : les étapes du pipeline Vidame"
        : "From raw verbatim to usable corpus: the steps of the Vidame pipeline",
    excerpt:
      lang === "fr"
        ? "Un bon pipeline ne se limite pas à produire du texte. Il organise une chaîne opératoire complète : intégrité, anonymisation, structuration, traçabilité et réutilisation."
        : "A strong pipeline does more than produce text. It structures a complete operational chain: integrity, anonymization, structuring, traceability, and reuse.",
    tag: lang === "fr" ? "Méthode" : "Method",
    date: lang === "fr" ? "Mars 2026" : "March 2026",
  },
]; 
// ===== VIDAME_REPERE_TYPES =====
type SectionTitleProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

// ===== VIDAME_REPERE_BRIQUES_VISUELLES =====
function Card({
  className = "",
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={`rounded-3xl border bg-white ${className}`}>
      {children}
    </div>
  );
}

// ===== VIDAME_REPERE_BRIQUE_CARDHEADER =====
function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

// ===== VIDAME_REPERE_BRIQUE_CARDTITLE =====
function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h3 className={`font-semibold tracking-tight text-slate-900 ${className}`}>{children}</h3>;
}

// ===== VIDAME_REPERE_BRIQUE_CARDCONTENT =====
function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

// ===== VIDAME_REPERE_BRIQUE_BUTTON =====
function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  const base =
    "inline-flex items-center justify-center gap-2 border font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50";
  const variants = {
    default: "border-slate-900 bg-slate-900 text-white hover:bg-slate-800",
    outline: "border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    secondary: "border-white bg-white text-slate-900 hover:bg-slate-100",
  };
  const sizes = {
    default: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// ===== VIDAME_REPERE_BRIQUE_INPUT =====
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${className}`}
    />
  );
}

// ===== VIDAME_REPERE_BRIQUE_TEXTAREA =====
function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${className}`}
    />
  );
}

// ===== VIDAME_REPERE_BRIQUE_BADGE =====
function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center border border-transparent text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}

// ===== VIDAME_REPERE_BRIQUE_SECTIONTITLE =====
function SectionTitle({ eyebrow, title, text }: SectionTitleProps) {
  return (
    <div className="max-w-3xl space-y-3">
      <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{eyebrow}</div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {text ? <p className="text-base leading-8 text-slate-600 md:text-lg">{text}</p> : null}
    </div>
  );
}

// ===== VIDAME_REPERE_STRUCTURE_GLOBALE =====
function Shell({
  page,
  setPage,
  lang,
  setLang,
}: {
  page: string;
  setPage: (page: string) => void;
  lang: "fr" | "en";
  setLang: (lang: "fr" | "en") => void;
}) {
  const [open, setOpen] = useState(false);
const [showScrollTop, setShowScrollTop] = useState(false);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [page]);

useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

return (
  <div className="min-h-screen bg-white text-slate-800">
    {/* ===== VIDAME_REPERE_HEADER ===== */}
    <header className="sticky top-0 z-40 border-b border-slate-400 bg-slate-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* ===== VIDAME_REPERE_HEADER_MARQUE ===== */}
        <button onClick={() => setPage("accueil")} className="flex items-center gap-3 text-left">
          <div className="flex items-center gap-3">
            {/* ===== VIDAME_REPERE_LOGO ===== */}
            <img
              src="/vidame_favicon_blanc_noir_192x192.png"
              alt="Vidame"
              className="h-14 w-14 rounded-xl object-contain"
            />

            {/* ===== VIDAME_REPERE_SIGNATURE_MARQUE ===== */}
            <div className="leading-tight">
              <div className="text-sm font-semibold">Vidame</div>
              <div className="text-xs leading-snug text-slate-900">
                {lang === "fr" ? (
                  <span>Soutien à la recherche qualitative.</span>
                ) : (
                  <span>Support for qualitative research.</span>
                )}
              </div>
            </div>
          </div>
        </button>

        {/* ===== VIDAME_REPERE_NAVIGATION_PRINCIPALE ===== */}
        <nav className="hidden items-center gap-2 md:flex">
          {pages.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`rounded-full px-4 py-2 text-base font-medium transition ${
                page === item.id
                  ? "bg-black text-white"
                  : "text-slate-800 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {lang === "fr" ? item.labelFr : item.labelEn}
            </button>
          ))}
        </nav>

        {/* ===== VIDAME_REPERE_ACTIONS_HEADER ===== */}
        <div className="flex items-center gap-3">
          {/* ===== VIDAME_REPERE_SWITCH_LANGUE ===== */}
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setLang("fr")}
              className={`text-sm ${lang === "fr" ? "font-semibold underline" : "opacity-60"}`}
            >
              FR
            </button>
            <span className="text-slate-500">|</span>
            <button
              onClick={() => setLang("en")}
              className={`text-sm ${lang === "en" ? "font-semibold underline" : "opacity-60"}`}
            >
              EN
            </button>
          </div>

          {/* ===== VIDAME_REPERE_BOUTON_MENU_MOBILE ===== */}
          <button
            className="rounded-xl border border-slate-200 p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ===== VIDAME_REPERE_MENU_MOBILE ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {pages.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setPage(item.id);
                    setOpen(false);
                  }}
                  className="rounded-xl px-3 py-3 text-left text-sm text-slate-900 hover:bg-slate-100"
                >
                  {lang === "fr" ? item.labelFr : item.labelEn}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

      {/* ===== VIDAME_REPERE_CONTENU_PRINCIPAL ===== */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
{/* ===== VIDAME_REPERE_ROUTAGE_PAGES ===== */}
{page === "accueil" && <Accueil setPage={setPage} lang={lang} />}
{page === "apropos" && <APropos setPage={setPage} lang={lang} />}
{page === "services" && <ServicesPage setPage={setPage} lang={lang} />}
{page === "soumission" && <Soumission lang={lang} />}
{page === "blog" && <Blog lang={lang} />}
</motion.div>
</AnimatePresence>
</main>

    {/* ===== VIDAME_REPERE_FOOTER ===== */}
<footer className="border-t border-slate-300 bg-slate-200">
  <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8">

    {/* ===== VIDAME_REPERE_FOOTER_MARQUE ===== */}
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <img
          src="/vidame_favicon_blanc_noir_192x192.png"
          alt="Vidame"
          className="h-10 w-10 rounded-xl object-contain"
        />
        <div>
          <div className="font-semibold">Vidame</div>
          <div className="text-sm text-slate-500">
            {lang === "fr"
              ? "Soutien à la recherche qualitative"
              : "Support for qualitative research"}
          </div>
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-600">
        {lang === "fr"
          ? "Le pipeline Vidame (chaine opératoire) est conçu pour structurer les données de recherche qualitative en vue de leur analyse."
          : "The Vidame pipeline is designed to structure qualitative research data for analysis."}
      </p>
    </div>

   {/* ===== VIDAME_REPERE_FOOTER_NAVIGATION ===== */}
<div className="space-y-4">
  <div className="font-semibold">
    {lang === "fr" ? "Navigation" : "Navigation"}
  </div>

  <div className="grid gap-2 text-sm text-slate-600">
    {pages.map((item) => (
      <button
        key={item.id}
        onClick={() => setPage(item.id)}
        className="text-left hover:text-slate-900"
      >
        {lang === "fr" ? item.labelFr : item.labelEn}
      </button>
    ))}
  </div>
</div>

    {/* ===== VIDAME_REPERE_FOOTER_COORDONNEES ===== */}
    <div className="space-y-4">
      <div className="font-semibold">
        {lang === "fr" ? "Coordonnées" : "Contact"}
      </div>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4" /> contact@vidame.ca
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4" />
          {lang === "fr" ? "Sur demande" : "Available upon request"}
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4" />
          {lang === "fr" ? "Montréal, Québec" : "Montreal, Quebec"}
        </div>
      </div>
    </div>

  </div>
</footer>
      {/* ===== VIDAME_REPERE_BOUTON_RETOUR_HAUT ===== */}
    {showScrollTop && (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800 hover:scale-105"
    >
    ↑
    </button>
  )}
  </div>
  );
}

  // ===== VIDAME_REPERE_PAGE_ACCUEIL =====
  function Accueil({setPage,lang,}: {setPage: (page: string) => void;lang: "fr" | "en";
}) {
   const [charteOpen, setCharteOpen] = useState(false);
  return (
    <div>
          {/* ===== VIDAME_REPERE_HERO_ACCUEIL ===== */}
<section className="mx-auto max-w-6xl px-15 pt-18 pb-4 md:px-8 md:pt-16 md:pb-4">
  <div className="mx-auto max-w-6xl space-y-8 text-center">
    {/* ===== VIDAME_REPERE_BADGE_HERO_ACCUEIL ===== */}
    <div className="flex justify-center">
      <Badge className="rounded-full bg-slate-200 px-6 py-1.5 text-slate-900 hover:bg-slate-200">
        {lang === "fr"
          ? "Données sensibles · Conformité éthique · Cadre légal canadien, incluant la Loi 25"
          : "Sensitive data · Ethical compliance · Canadian legal framework, including Law 25"}
      </Badge>
    </div>

    {/* ===== VIDAME_REPERE_CONTENU_HERO_ACCUEIL ===== */}
    <div className="px-6 space-y-6 md:px-0">
      {/* ===== VIDAME_REPERE_TITRE_PRINCIPAL_ACCUEIL ===== */}
<h1 className="text-left text-[28px] font-[350] leading-[1.05] text-slate-900 antialiased md:mx-auto md:max-w-4xl md:text-center md:text-[48px] md:text-slate-800">
  {lang === "fr" ? (
    <>
      <span className="block">
        Un service de prétraitement des données brutes, dédié à l’analyse qualitative
      </span>
    </>
  ) : (
    <>
      <span className="block">
        A qualitative data preprocessing service
      </span>
      <span className="mt-2 block">
        designed for research
      </span>
    </>
  )}
</h1>
    <h2 className="mt-5 text-left text-[22px] font-[400] leading-7 text-slate-500 md:mx-auto md:max-w-xl md:text-center md:text-[26px] md:leading-8">
  {lang === "fr" ? (
    <>
      <span className="block md:inline">
        Respectueux de la souveraineté des données au Canada. 
      </span>
      <span className="mt-5 block md:mt-0 md:inline">
         {" "}Conçu pour répondre aux exigences gouvernementales et aux comités d’éthique en matière de résidence des données.
      </span>
    </>
  ) : (
    <>
      <span className="block md:inline">
        Respectful of Canadian data sovereignty.
      </span>
      <span className="mt-5 block md:mt-0 md:inline">
        Designed to meet government and research ethics requirements for data residency in Canada.
      </span>
    </>
  )}
</h2>

     {/* ===== VIDAME_REPERE_TEXTE_HERO_ACCUEIL ===== */}
<div className="mt-6 h-[2px] w-24 bg-slate-500 md:mx-auto"></div>
<div className="mt-8 text-left text-[20px] font-[350] leading-7 text-slate-600 md:mx-auto md:max-w-xl md:text-center">
  {lang === "fr" ? (
    <>
      <p>
        Dans le contexte actuel de transformation numérique de la recherche, les outils d’intelligence artificielle redéfinissent rapidement les pratiques de traitement des données qualitatives.
      </p>
     <div className="mt-6 text-[20px] font-[350] leading-7 text-slate-600 md:mx-auto md:max-w-xl md:text-center space-y-2">

      <p>L’accélération est réelle.</p>
      <p>Les gains sont importants.</p>
      <p className="mt-4 text-[20px] font-[350] leading-7 text-slate-600">
       Mais une question demeure.
      </p>

    <p className="mt-3 text-[20px] font-medium leading-[1.1] text-slate-600 md:mx-auto md:max-w-[520px] md:text-center">
        Comment intégrer ces outils sans perdre la maîtrise des données, du sens et des exigences éthiques qui encadrent la recherche ?
    </p>

</div>

<p className="mt-4 text-[20px] font-[350] leading-7 text-slate-600 md:mx-auto md:max-w-lg md:text-center">
    C'est pour répondre à cette question, que le pipeline Vidame a été conçue. Un service de soutien à la recherche qualitative qui intègre les outils contemporains tout en assurant la maîtrise des données, du sens et de la conformité éthique.
 </p>
    </>
  ) : (
    <>
      <p>
        In the current context of digital transformation in research, artificial intelligence tools are rapidly reshaping qualitative data processing practices.
      </p>
      <p className="mt-4">
        The acceleration is real. The gains are significant.
      </p>
      <p className="mt-4">
        But one question remains:{" "}
        <span className="font-medium text-slate-900">
          how can these tools be integrated without losing control over data,
          <br />
          meaning, and the ethical requirements that govern research?
        </span>
      </p>
      <p className="mt-4">
        <span className="font-medium text-slate-900">
          Vidame has developed a structured pipeline designed to integrate modern tools
        </span>
        <br />
        while ensuring control over data, meaning, and ethical compliance.
      </p>
    </>
  )}
</div>

     </div>
  </div>
</section>
     {/* ===== VIDAME_REPERE_SECTION_PIPELINE ===== */}
     <section>
      <div className="mx-auto max-w-7xl px-6 pt-0 pb-6 md:px-8 md:pt-0 md:pb-8">
        {/* ===== VIDAME_REPERE_TITRE_PIPELINE ===== */}
    <h2 className="mt-12 text-center text-2xl font-semibold text-slate-900 md:text-3xl">
      {lang === "fr" ? "Pipeline Vidame" : "Vidame Pipeline"}
    </h2>
             {/* ===== VIDAME_REPERE_BLOC_PNG_PIPELINE ===== */}
      <div className="mt-6 mb-8 max-w-7xl">
      <img
    src={lang === "fr" ? "/flowchart_vidame21.png" : "/flowchart_vidame21_eng.png"}
    alt={lang === "fr" ? "Pipeline Vidame" : "Vidame pipeline"}
    className="block h-auto w-full"
  />
</div>
       {/* ===== VIDAME_REPERE_CTA_APRES_PIPELINE ===== */}
<div className="mt-16 mb-12 flex flex-wrap gap-3 md:ml-[26rem]">
  <Button size="lg" className="rounded-full" onClick={() => setPage("soumission")}>
    {lang === "fr" ? "Obtenir un devis" : "Request a quote"}
  </Button>

  <Button
  size="lg"
  className="rounded-full border border-slate-300 bg-slate-200 text-slate-900 hover:bg-slate-300"
  onClick={() => setPage("services")}
>
  {lang === "fr" ? "Voir l'offre de services" : "View services"}
</Button>
</div>

{/* ===== VIDAME_REPERE_DETAIL_PIPELINE_ACCUEIL ===== */}
<section className="mx-auto mt-20 max-w-6xl px-6 md:px-8">

  {/* ===== TITRE ===== */}
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-[28px] leading-tight tracking-tight text-slate-900 md:text-[34px]">
      La chaîne opératoire Vidame repose sur une transformation progressive du corpus.
    </h2>
  </div>

  {/* ===== DEUX COLONNES ===== */}
  <div className="mt-16 grid gap-12 md:grid-cols-2">

    {/* ========================= */}
    {/* COLONNE GAUCHE (1 → 4) */}
    {/* ========================= */}
    <div className="space-y-12">

   {/* 1 */}
<div className="flex items-start gap-4">

  <div className="flex w-28 flex-col items-center">
    <img src="/icons/icon-donnees.png" className="h-[92px] w-[92px] object-contain scale-125" />

   <div className="-mt-2 text-slate-300 text-2xl leading-none">↓</div>
  </div>

<div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">Données terrain</h3>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      Le pipeline prend appui sur les données brutes produites sur le terrain. Le traitement ultérieur vise à structurer ce corpus sans en modifier le sens ni la valeur documentaire.
    </p>
  </div>

</div>
     {/* 2 */}
<div className="flex items-start gap-4">

  <div className="flex w-28 flex-col items-center">
    <img src="/icons/icon-transcription.png" className="h-[92px] w-[92px] object-contain scale-125" />

    <div className="-mt-2 text-slate-300 text-2xl leading-none">↓</div>
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Transcription automatisée
    </h3>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      La transcription transforme le corpus audio ou vidéo en texte exploitable. Certaines formes orales peuvent être mal reconnues, ce qui nécessite une validation humaine.
    </p>
  </div>

</div>

{/* 3 */}
<div className="flex items-start gap-4">

  <div className="flex w-28 flex-col items-center">
    <img
      src="/icons/icon-anonymisation.png"
      className="h-[92px] w-[92px] object-contain"
      alt="Anonymisation des données"
    />

    <div className="-mt-2 text-slate-300 text-2xl leading-none">↓</div>
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Anonymisation des données
    </h3>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      Cette étape protège les informations sensibles en préservant la structure et la lisibilité du corpus.
    </p>
  </div>

</div>
              {/* 4 */}
<div className="flex items-start gap-4">

  <div className="flex w-28 flex-col items-center">
    <img
      src="/icons/icon-validation.png"
      className="h-[92px] w-[92px] object-contain"
      alt="Validation humaine (fidélité et conformité)"
    />
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Validation humaine
    </h3>
    <div className="text-[13px] text-slate-500">(fidélité et conformité)</div>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      Une validation humaine vérifie la fidélité du texte et la conformité de l’anonymisation afin d’assurer la qualité du corpus.
    </p>
  </div>

</div>

</div>

    {/* ========================= */}
    {/* COLONNE DROITE (5 → 7) */}
    {/* ========================= */}
    <div className="space-y-12 md:pt-8">

     {/* 5 */}
<div className="flex items-start gap-4">

  <div className="flex w-28 flex-col items-center">
    <img
      src="/icons/icon-segmentation.png"
      className="h-[92px] w-[92px] object-contain"
      alt="Segmentation du corpus"
    />

    <div className="-mt-2 text-slate-300 text-2xl leading-none">↓</div>
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Segmentation du corpus
    </h3>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      La segmentation organise le texte en unités de sens cohérentes sans introduire d’interprétation.
    </p>
  </div>

</div>


      {/* 6 */}
<div className="flex items-start gap-4">

  <div className="flex w-28 flex-col items-center">
    <img
      src="/icons/icon-lexique.png"
      className="h-[92px] w-[92px] object-contain"
      alt="Lexique et collocations"
    />

    <div className="-mt-2 text-slate-300 text-2xl leading-none">↓</div>
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Lexique et collocations
    </h3>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      Cette étape met en évidence des régularités linguistiques à partir de cooccurrences observables, sans interprétation analytique.
    </p>
  </div>

</div>

 {/* 7 */}
<div className="flex items-start gap-4">
  <div className="flex w-28 flex-col items-center">
    <img
      src="/icons/icon-validationFin.png"
      className="h-[92px] w-[92px] object-contain"
      alt="Validation humaine (unités de sens)"
    />
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Validation humaine
    </h3>
    <div className="text-[13px] text-slate-500">(unités de sens)</div>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      Une validation finale assure la cohérence des unités de sens produites dans le corpus.
    </p>
  </div>
</div>

{/* 8 */}
<div className="flex items-start gap-4">
  <div className="flex w-28 flex-col items-center">
    <img
      src="/icons/icon-corpus.png"
      className="h-[92px] w-[92px] object-contain"
      alt="Corpus prêt pour l’analyse"
    />
  </div>

  <div className="mt-6">
    <h3 className="text-[16px] font-semibold text-slate-900">
      Corpus prêt pour l’analyse
    </h3>
    <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
      Le corpus est structuré, validé et prêt à être analysé avec des outils de codage qualitatif.
    </p>
  </div>
</div>

    </div>

  </div>

  {/* ===== CONCLUSION ===== */}
  <div className="mx-auto mt-16 max-w-2xl text-center">
    <h3 className="text-lg font-semibold text-slate-900">
      Du terrain à l'analyse
    </h3>

    <p className="mt-3 text-[15px] leading-relaxed text-slate-500">
      À partir des données brutes produites sur le terrain, la chaîne opératoire Vidame conduit à un corpus structuré, prêt pour l’analyse. À chaque étape, le traitement vise à organiser le contenu sans en altérer le sens, en combinant automatisation et validation humaine ciblée.
    </p>

    <p className="mt-4 text-[15px] leading-relaxed text-slate-500">
      Le résultat est un corpus segmenté en unités de sens, structuré dans un format tabulaire (compatible Excel ou CSV), prêt pour le codage en équipe ou pour l’utilisation avec des logiciels comme NVivo, MAXQDA, Delve et autres, dans le respect des exigences de confidentialité et de sécurité des données attendues dans les recherches encadrées par des comités d’éthique.
    </p>
  </div>

</section>
        
        </div>
      </section>
     {/* ===== VIDAME_REPERE_CHARTE_ACCUEIL ===== */}
<section id="charte" className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
  <div className="max-w-3xl space-y-8">
    {/* ===== VIDAME_REPERE_SURTITRE_CHARTE ===== */}
    <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-900">
      {lang === "fr" ? "Charte" : "Charter"}
    </div>

    {/* ===== VIDAME_REPERE_TITRE_CHARTE ===== */}
    <h2 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
      {lang === "fr"
        ? "Pour le traitement des données plus sensibles"
        : "For the processing of more sensitive data"}
    </h2>

    {/* ===== VIDAME_REPERE_BLOC_VISUEL_CHARTE ===== */}
    <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 md:p-8">
      <p className="text-xl font-medium leading-9 text-slate-900 md:text-2xl">
        {lang === "fr"
          ? "Préserver l’intégrité du matériau et protéger les participants."
          : "Preserving the integrity of the material and protecting participants."}
      </p>
    </div>

    {/* ===== VIDAME_REPERE_CONTROLE_CHARTE ===== */}
    <div>
      <button
        type="button"
        onClick={() => setCharteOpen(!charteOpen)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[16px] font-medium text-slate-900 transition hover:bg-slate-50"
      >
        {charteOpen
          ? lang === "fr"
            ? "Réduire"
            : "Collapse"
          : lang === "fr"
            ? "Voir le cadre de traitement"
            : "View framework"}
        <span className="text-slate-500">{charteOpen ? "−" : "+"}</span>
      </button>
    </div>

    {charteOpen && (
      <>
        {/* ===== VIDAME_REPERE_CONTENU_CHARTE ===== */}
        <div className="space-y-6">
          {/* ===== VIDAME_REPERE_CHARTE_PRINCIPE_DIRECTEUR ===== */}
          <div className="space-y-3 border-l-2 border-slate-300 pl-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {lang === "fr" ? "1. Principe directeur" : "1. Guiding principle"}
            </h3>
            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Le traitement des données qualitatives repose sur une exigence fondamentale : préserver l’intégrité du matériau et protéger les participants."
                : "The processing of qualitative data is grounded in a fundamental requirement: preserving the integrity of the material and protecting participants."}
            </p>
            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Les méthodes et outils utilisés sont sélectionnés en fonction du niveau de sensibilité des données et des exigences éthiques propres à chaque projet."
                : "The methods and tools used are selected according to the level of data sensitivity and the ethical requirements specific to each project."}
            </p>
          </div>

          {/* ===== VIDAME_REPERE_CHARTE_POSITIONNEMENT ===== */}
          <div className="space-y-3 border-l-2 border-slate-300 pl-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {lang === "fr" ? "2. Positionnement" : "2. Positioning"}
            </h3>
            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Vidame adopte une approche structurée du traitement des données, dans laquelle les choix techniques sont subordonnés aux impératifs méthodologiques et éthiques."
                : "Vidame adopts a structured approach to data processing, in which technical choices are subordinated to methodological and ethical requirements."}
            </p>
            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "L’objectif n’est pas d’automatiser systématiquement, mais de déterminer la méthode la plus appropriée au contexte."
                : "The objective is not to automate systematically, but to determine the method best suited to the context."}
            </p>
          </div>

          {/* ===== VIDAME_REPERE_CHARTE_DONNEES_SENSIBLES ===== */}
          <div className="space-y-3 border-l-2 border-slate-300 pl-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {lang === "fr" ? "3. Données sensibles" : "3. Sensitive data"}
            </h3>

            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Certains corpus présentent un niveau de sensibilité élevé, notamment lorsqu’ils impliquent :"
                : "Some corpora involve a high level of sensitivity, particularly when they include:"}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-700 md:text-[18px]">
              <li>{lang === "fr" ? "des personnes mineures" : "minors"}</li>
              <li>
                {lang === "fr"
                  ? "des situations de vulnérabilité (santé mentale, parcours de vie)"
                  : "situations of vulnerability (mental health, life trajectories)"}
              </li>
              <li>
                {lang === "fr"
                  ? "des milieux institutionnels sensibles (police, justice, milieu carcéral)"
                  : "sensitive institutional settings (police, justice, correctional environments)"}
              </li>
              <li>
                {lang === "fr"
                  ? "des contenus à risque (discours violents, extrémisme, situations conflictuelles)"
                  : "high-risk content (violent discourse, extremism, conflict situations)"}
              </li>
            </ul>

            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Dans ces cas, l’utilisation d’outils automatisés peut introduire des incertitudes incompatibles avec les exigences de la recherche."
                : "In such cases, the use of automated tools may introduce uncertainties that are incompatible with research requirements."}
            </p>

            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Ces incertitudes peuvent concerner :"
                : "These uncertainties may relate to:"}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-700 md:text-[18px]">
              <li>{lang === "fr" ? "la résidence des données" : "data residency"}</li>
              <li>
                {lang === "fr"
                  ? "la rétention temporaire liée aux mécanismes de sécurité"
                  : "temporary retention linked to security mechanisms"}
              </li>
              <li>
                {lang === "fr"
                  ? "les transformations involontaires du contenu (filtrage, reformulation, atténuation)"
                  : "unintended transformations of content (filtering, reformulation, attenuation)"}
              </li>
            </ul>
          </div>

          {/* ===== VIDAME_REPERE_CHARTE_TRAITEMENT_MANUEL ===== */}
          <div className="space-y-3 border-l-2 border-slate-300 pl-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {lang === "fr" ? "4. Traitement manuel" : "4. Manual processing"}
            </h3>

            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Lorsque la nature des données le requiert, le traitement est effectué entièrement de manière manuelle."
                : "When the nature of the data requires it, processing is carried out entirely manually."}
            </p>

            <ul className="list-disc space-y-2 pl-6 text-[17px] leading-8 text-slate-700 md:text-[18px]">
              <li>
                {lang === "fr"
                  ? "contrôle complet sur chaque étape"
                  : "full control over each step"}
              </li>
              <li>
                {lang === "fr"
                  ? "fidélité du discours et de ses nuances"
                  : "faithfulness to speech and its nuances"}
              </li>
              <li>
                {lang === "fr"
                  ? "préservation des éléments analytiques essentiels"
                  : "preservation of essential analytical elements"}
              </li>
              <li>
                {lang === "fr"
                  ? "anonymisation fine et contextualisée"
                  : "fine-grained, context-sensitive anonymization"}
              </li>
              <li>
                {lang === "fr"
                  ? "traçabilité des transformations"
                  : "traceability of transformations"}
              </li>
            </ul>
          </div>

          {/* ===== VIDAME_REPERE_CHARTE_IA_CADREE ===== */}
          <div className="space-y-3 border-l-2 border-slate-300 pl-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {lang === "fr"
                ? "5. Utilisation des outils assistés par IA"
                : "5. Use of AI-assisted tools"}
            </h3>

            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Les outils assistés par IA sont utilisés de manière ciblée, uniquement lorsque le niveau de sensibilité des données le permet."
                : "AI-assisted tools are used selectively, only when the level of data sensitivity allows it."}
            </p>

            <p className="text-[17px] leading-8 text-slate-700 md:text-[18px]">
              {lang === "fr"
                ? "Ils s’inscrivent dans un cadre méthodologique contrôlé et ne se substituent jamais au jugement professionnel."
                : "They are used within a controlled methodological framework and never replace professional judgment."}
            </p>
          </div>
        </div>

        {/* ===== VIDAME_REPERE_SIGNATURE_CHARTE ===== */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-xl font-semibold text-slate-900 md:text-2xl">
            {lang === "fr"
              ? "Intégrité des données. Protection des participants. Méthode avant outil."
              : "Data integrity. Participant protection. Method before tools."}
          </p>
        </div>

        {/* ===== VIDAME_REPERE_CTA_CHARTE ===== */}
        <div className="pt-6">
          <button
            onClick={() => setPage("soumission")}
            className="text-[17px] font-medium text-slate-900 underline underline-offset-4 hover:text-slate-700 md:text-[18px]"
          >
            {lang === "fr" ? "Discuter de votre projet" : "Discuss your project"}
          </button>
        </div>
      </>
    )}
  </div>
</section>
    </div>
  );
}

         // ===== VIDAME_REPERE_PAGE_APROPOS =====
function APropos({
  setPage,
  lang,
}: {
  setPage: (page: string) => void;
  lang: "fr" | "en";
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:px-8 md:py-24">
      {/* ===== VIDAME_REPERE_BLOC_INTRO_APROPOS ===== */}
      <div className="grid items-start gap-8 md:grid-cols-[0.5fr_1fr]">
        {/* ===== VIDAME_REPERE_PHOTO_APROPOS ===== */}
        <div className="h-full w-full overflow-hidden rounded-[2rem]">
          <img
            src="/monique.jpg"
            alt="Monique Provost"
            className="h-full w-full object-cover object-[center_20%]"
          />
        </div>

        {/* ===== VIDAME_REPERE_TEXTE_APROPOS ===== */}
        <div className="space-y-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">
            {lang === "fr" ? "À propos" : "About"}
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-4xl">
            {lang === "fr"
              ? "Un regard humain aguerri, au cœur des données complexes"
              : "An experienced human perspective at the core of complex data"}
          </h1>

          {lang === "fr" ? (
            <>
              <p className="text-lg leading-8 text-slate-700">
                Monique Provost est titulaire d’un Ph. D. en ethnologie et patrimoine de l’Université
                Laval (2016) et d’une maîtrise en ethnomusicologie de l’Université de Montréal (2010).
                Ses travaux s’inscrivaient alors dans l’étude des phénomènes de mutation et des
                processus d’adaptation locale des patrimoines culturels immatériels en contexte de
                mondialisation.
              </p>

              <p className="leading-8 text-slate-600">
                Elle a contribué à plusieurs projets de recherche en ethnologie, notamment au sein de
                la Chaire de recherche du Canada en patrimoine ethnologique (Université Laval), sous la
                direction de Laurier Turgeon, ainsi qu’au Laboratoire d’enquête ethnologique et
                multimédia (LEEM), dans le cadre des projets IREPI (Inventaire des ressources
                ethnologiques du patrimoine immatériel) et IPIR (Inventaire du patrimoine immatériel
                religieux du Québec). Elle a également participé à des activités de recherche et
                d’édition scientifique, notamment comme assistante à la rédaction pour la revue{" "}
                <em>Ethnologies</em> et comme responsable documentaire au Laboratoire de recherche sur
                les musiques du monde (LRMM).
              </p>

              <p className="leading-8 text-slate-600">
                Après plusieurs années de pratique professionnelle en traduction et en soutien à la
                recherche scientifique auprès de différentes équipes universitaires canadiennes, elle a
                développé le pipeline Vidame, conçu comme un cadre de traitement rigoureux des données
                qualitatives. Ses travaux actuels s’inscrivent dans un champ de recherche émergent,
                celui du patrimoine cognitif à l’ère de l’intelligence artificielle.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg leading-8 text-slate-700">
                Monique Provost holds a Ph.D. in Ethnology and Heritage from Université Laval (2016)
                and a Master’s degree in Ethnomusicology from Université de Montréal (2010). Her early
                work focused on processes of transformation and local adaptation of intangible cultural
                heritage in contexts of globalization.
              </p>

              <p className="leading-8 text-slate-600">
                She contributed to several research projects in ethnology, notably within the Canada
                Research Chair in Ethnological Heritage (Université Laval), under the supervision of
                Laurier Turgeon, as well as at the Laboratoire d’enquête ethnologique et multimédia
                (LEEM), through projects such as IREPI (Inventory of Ethnological Resources of
                Intangible Heritage) and IPIR (Inventory of Religious Intangible Heritage of Quebec).
                She also took part in research and academic publishing activities, including serving as
                editorial assistant for the journal <em>Ethnologies</em> and as documentation manager at
                the Laboratoire de recherche sur les musiques du monde (LRMM).
              </p>

              <p className="leading-8 text-slate-600">
                After several years of professional practice in translation and research support with
                various Canadian university teams, she developed the Vidame pipeline, designed as a
                rigorous framework for processing qualitative data. Her current work is situated within
                an emerging research field: cognitive heritage in the era of artificial intelligence.
              </p>
            </>
          )}
        </div>
      </div>

            {/* ===== VIDAME_REPERE_MISSION_VISION ===== */}
<div className="grid gap-8 md:grid-cols-2">
  <Card className="rounded-[2rem] border-slate-200">
    <CardHeader>
      <CardTitle>{lang === "fr" ? "Mission" : "Mission"}</CardTitle>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <p className="leading-8 text-slate-600">
        {lang === "fr"
          ? "Contribuer à la recherche en mobilisant mes ressources et mes compétences pour le développement de connaissances ancrées localement, au Québec et au Canada."
          : "To contribute to research by mobilizing my resources and expertise in support of knowledge development grounded in local realities in Quebec and across Canada."}
      </p>
    </CardContent>
  </Card>

  <Card className="rounded-[2rem] border-slate-200">
    <CardHeader>
      <CardTitle>{lang === "fr" ? "Vision" : "Vision"}</CardTitle>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <p className="leading-8 text-slate-600">
        {lang === "fr"
          ? "Une pratique de la recherche qualitative assistée par l’intelligence artificielle qui demeure profondément humaine : transparente, traçable, adaptée aux contraintes du terrain et respectueuse de la valeur scientifique des données."
          : "A practice of qualitative research assisted by artificial intelligence that remains fundamentally human: transparent, traceable, responsive to field constraints, and respectful of the scientific value of data."}
      </p>
    </CardContent>
  </Card>
</div>

{/* ===== VIDAME_REPERE_VALEURS_APROPOS ===== */}
<div className="grid gap-8 md:grid-cols-3">
  {(lang === "fr"
    ? [
        {
          title: "Intégrité",
          text: "Préserver la parole des participants en maintenant l’intégrité du sens tout au long de la chaîne opératoire Vidame.",
        },
        {
          title: "Rigueur",
          text: "Documenter les choix et encadrer les étapes sensibles par des pratiques méthodologiques explicites et traçables.",
        },
        {
          title: "Responsabilité",
          text: "Assumer des choix techniques conformes aux exigences éthiques, juridiques et scientifiques des contextes d’intervention, et veiller à la souveraineté des données scientifiques canadiennes.",
        },
      ]
    : [
        {
          title: "Integrity",
          text: "Preserve participants’ words by maintaining the integrity of meaning throughout the Vidame operational pipeline.",
        },
        {
          title: "Rigour",
          text: "Document decisions and frame sensitive stages through explicit, traceable methodological practices.",
        },
        {
          title: "Responsibility",
          text: "Make technical choices that align with ethical, legal, and scientific requirements in each context of intervention, while safeguarding the sovereignty of Canadian research data.",
        },
      ]
  ).map((item) => (
    <Card key={item.title} className="rounded-[1.5rem] border-slate-200">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
      </CardContent>
    </Card>
  ))}
</div>

              {/* ===== VIDAME_REPERE_CITATION_ET_COORDONNEES ===== */}
<div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">

  {/* ===== VIDAME_REPERE_CITATION_APROPOS ===== */}
  <Card className="rounded-[2rem] border-slate-200 bg-slate-50">
    <CardContent className="p-8">
      <Quote className="h-8 w-8 text-slate-400" />
      <p className="mt-5 text-xl leading-9 text-slate-800">
        {lang === "fr"
          ? "Vidame s’adresse aux équipes de recherche souhaitant intégrer des outils contemporains tout en maintenant la maîtrise de leurs données, de leurs textes et de leurs décisions."
          : "Vidame is designed for research teams seeking to integrate contemporary tools while maintaining control over their data, their texts, and their decisions."}
      </p>
    </CardContent>
  </Card>

{/* ===== VIDAME_REPERE_BLOC_COORDONNEES_APROPOS ===== */}
<div className="space-y-4 rounded-[2rem] border border-slate-200 p-8">
  <div className="text-sm uppercase tracking-[0.2em] text-slate-500">
    {lang === "fr" ? "Coordonnées" : "Contact"}
  </div>

  <p className="text-sm text-slate-600">
    {lang === "fr"
      ? "Pour toute question ou pour discuter de votre projet :"
      : "For any question or to discuss your project:"}
  </p>

  <div className="space-y-2 text-slate-700">
    <p>Monique Provost</p>
    <p>{lang === "fr" ? "Montréal, Québec" : "Montreal, Quebec"}</p>
    <p>
      <a href="mailto:info@monique-provost.com" className="underline underline-offset-2">
        info@monique-provost.com
      </a>
    </p>
  </div>

  {/* ===== VIDAME_REPERE_CTA_APROPOS ===== */}
  <Button className="mt-4 rounded-full" onClick={() => setPage("soumission")}>
    {lang === "fr" ? "Obtenir un devis" : "Request a quote"}
  </Button>
</div>

</div>
</div>
);
}
// ===== VIDAME_REPERE_PAGE_SERVICES =====
function ServicesPage({
  setPage,
  lang,
}: {
  setPage: (page: string) => void;
  lang: "fr" | "en";
}) {
  const [activeTab, setActiveTab] = useState<"carte" | "pipeline">("carte");
  const [expandedService, setExpandedService] = useState<number | null>(null);

 // ===== VIDAME_REPERE_DONNEES_SERVICES =====
const servicesACarte = [
  {
    icon: Languages,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    accent: "border-l-amber-400",
    badge: "bg-amber-50 text-amber-700",
    title: lang === "fr" ? "Traduction EN vers FR" : "EN to FR Translation",
    subtitle:
      lang === "fr"
        ? "Français canadien · Adaptation culturelle"
        : "Canadian French · Cultural adaptation",
    description:
      lang === "fr"
        ? "Traduction professionnelle de l'anglais vers le français canadien, avec révision linguistique complète, harmonisation terminologique et adaptation au registre et au public cible."
        : "Professional translation from English into Canadian French, including full linguistic revision, terminological harmonization, and adaptation to the appropriate register and target audience.",
    details:
      lang === "fr"
        ? [
            "Traduction fidèle au sens et à la nuance",
            "Adaptation au vocabulaire de la recherche qualitative",
            "Harmonisation des termes clés du corpus",
            "Révision par une spécialiste bilingue",
          ]
        : [
            "Translation faithful to meaning and nuance",
            "Adaptation to qualitative research vocabulary",
            "Harmonization of key corpus terminology",
            "Revision by a bilingual specialist",
          ],
    tag: lang === "fr" ? "Service à la carte" : "À la carte service",
  },
  {
    icon: FileText,
    color: "bg-sky-50 text-sky-700 border-sky-200",
    accent: "border-l-sky-400",
    badge: "bg-sky-50 text-sky-700",
    title: lang === "fr" ? "Transcription" : "Transcription",
    subtitle:
      lang === "fr"
        ? "Assistée par IA · Validée par un humain"
        : "AI-assisted · Human-validated",
    description:
      lang === "fr"
        ? "Transcription de verbatim assistée par intelligence artificielle, avec validation humaine systématique. Fidèle au discours réel, aux hésitations, aux nuances et au langage authentique des participants."
        : "AI-assisted verbatim transcription with systematic human validation. Faithful to real speech, including hesitations, nuances, and the authentic language of participants.",
    details:
      lang === "fr"
        ? [
            "Transcription intégrale ou sélective selon le besoin",
            "Respect des particularités langagières",
            "Marqueurs de discours conservés",
            "Livraison dans les formats requis (.docx, .txt)",
          ]
        : [
            "Full or selective transcription depending on needs",
            "Respect for linguistic particularities",
            "Preservation of discourse markers",
            "Delivery in required formats (.docx, .txt)",
          ],
    tag: lang === "fr" ? "Service à la carte" : "À la carte service",
  },
];

// ===== VIDAME_REPERE_DONNEES_PIPELINE_SERVICES =====
const pipelineSteps = [
  {
    step: "01",
    icon: FileText,
    title: lang === "fr" ? "Transcription validée" : "Validated transcription",
    description:
      lang === "fr"
        ? "Conversion du verbatim brut en texte exploitable, avec validation humaine à chaque segment sensible."
        : "Conversion of raw verbatim into usable text, with human validation at each sensitive segment.",
    color: "bg-teal-600",
  },
  {
    step: "02",
    icon: ShieldCheck,
    title: lang === "fr" ? "Anonymisation conforme" : "Compliant anonymization",
    description:
      lang === "fr"
        ? "Neutralisation des identifiants personnels selon les exigences éthiques et légales en vigueur (Canada)."
        : "Removal of personal identifiers in accordance with current ethical and legal requirements (Canada).",
    color: "bg-teal-700",
  },
  {
    step: "03",
    icon: Workflow,
    title: lang === "fr" ? "Segmentation et structuration" : "Segmentation and structuring",
    description:
      lang === "fr"
        ? "Organisation du corpus en unités de sens cohérentes, prêtes pour l'analyse qualitative."
        : "Organization of the corpus into coherent units of meaning, ready for qualitative analysis.",
    color: "bg-teal-800",
  },
  {
    step: "04",
    icon: Lock,
    title: lang === "fr" ? "Traçabilité et documentation" : "Traceability and documentation",
    description:
      lang === "fr"
        ? "Chaque opération est documentée, horodatée et traçable — pour la rigueur scientifique et les comités d'éthique."
        : "Each operation is documented, time-stamped, and traceable — for scientific rigour and ethics review boards.",
    color: "bg-slate-700",
  },
];
    return (
  <div className="min-h-screen bg-white">
     {/* ===== VIDAME_REPERE_HERO_SERVICES ===== */}
<section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/10 to-white px-4 py-20">
  <div className="relative mx-auto max-w-5xl text-center">
    {/* ===== VIDAME_REPERE_TEXTE_HERO_SERVICES ===== */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl"
    >
      <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl md:leading-[1.15]">
        {lang === "fr"
          ? "Vidame intervient pour préserver l’intégrité du sens et restituer fidèlement les discours et les concepts."
          : "Vidame supports the preservation of meaning and the faithful rendering of discourse and concepts."}
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
        {lang === "fr"
          ? "Ses opérations professionnelles comprennent des services à la carte en traduction et transcription, ainsi que la préparation des données qualitatives en amont de l’analyse."
          : "Its professional operations include à la carte services in translation and transcription, as well as the preparation of qualitative data prior to analysis."}
      </p>
    </motion.div>

    {/* ===== VIDAME_REPERE_ONGLETS_SERVICES ===== */}
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.5 }}
  className="mt-10 inline-flex gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1.5 shadow-sm backdrop-blur"
>
  <button
    onClick={() => setActiveTab("carte")}
    className={`rounded-full px-6 py-2 font-medium shadow-sm ${
      activeTab === "carte"
        ? "bg-gradient-to-b from-slate-800 to-slate-950 text-white"
        : "border border-slate-300 bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900"
    }`}
  >
    {lang === "fr" ? "Services à la carte" : "Custom services"}
  </button>

  <button
    onClick={() => setActiveTab("pipeline")}
    className={`rounded-full px-6 py-2 font-medium shadow-sm ${
      activeTab === "pipeline"
        ? "bg-gradient-to-b from-slate-800 to-slate-950 text-white"
        : "border border-slate-300 bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900"
    }`}
  >
    {lang === "fr" ? "Chaîne opératoire Vidame" : "Vidame workflow"}
  </button>
</motion.div>
  </div>
</section>

      {/* ===== VIDAME_REPERE_CONTENU_SERVICES ===== */}
      <AnimatePresence mode="wait">
        {activeTab === "carte" ? (
          <motion.div
            key="carte"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-5xl px-4 pb-16 pt-10"
          >
            {/* ===== VIDAME_REPERE_SECTION_SERVICES_CARTE ===== */}
            <div className="mb-10 text-center">
             <h2 className="text-2xl font-semibold text-slate-900">
              {lang === "fr"
                ? "Services linguistiques à la carte"
              : "À la carte language services"}
              </h2>
            </div>

            {/* ===== VIDAME_REPERE_GRILLE_SERVICES_CARTE ===== */}
            <div className="grid gap-6 md:grid-cols-2">
              {servicesACarte.map((service, i) => {
                const Icon = service.icon;
                const isExpanded = expandedService === i;

                return (
                  <motion.div
                    key={i}
                    layout
                    className={`cursor-pointer rounded-3xl border border-l-4 bg-white shadow-sm transition-shadow hover:shadow-md ${service.accent}`}
                    onClick={() => setExpandedService(isExpanded ? null : i)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${service.color}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <span
                          className={`mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${service.badge}`}
                        >
                          {service.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
                      <p className="mt-0.5 text-xs text-slate-400">{service.subtitle}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 overflow-hidden"
                          >
                            {/* ===== VIDAME_REPERE_DETAILS_SERVICE ===== */}
                            <ul className="space-y-2 border-t border-slate-100 pt-4">
                              {service.details.map((d, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                     {/* ===== VIDAME_REPERE_ETAT_EXPANSION_SERVICE ===== */}
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400">
              <ChevronRight
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
            />
              {lang === "fr"
              ? isExpanded
              ? "Réduire"
              : "Voir les détails"
              : isExpanded
              ? "Collapse"
              : "View details"}
              </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* ===== VIDAME_REPERE_CTA_SERVICES_CARTE ===== */}
            <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900">
            {lang === "fr"
              ? "Prêt à lancer votre projet ?"
              : "Ready to start your project?"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
            {lang === "fr"
              ? "Obtenez un devis personnalisé en moins de 48 heures."
              : "Get a tailored quote in less than 48 hours."}
            </p>
          <button
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={() => setPage("soumission")}
           >
          {lang === "fr" ? "Obtenir un devis" : "Request a quote"}{" "}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
     </motion.div>
        ) : (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mx-auto max-w-6xl px-4 pb-16 pt-10"
          >
            {/* ===== VIDAME_REPERE_SECTION_PIPELINE_SERVICES ===== */}
           <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">
            {lang === "fr"
            ? "Chaîne opératoire Vidame"
            : "Vidame operational pipeline"}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-slate-500">
              {lang === "fr"
              ? "Une séquence de traitement structurée pour transformer un matériau brut en corpus exploitable, traçable et conforme."
              : "A structured processing sequence to transform raw material into a usable, traceable, and compliant corpus."}
            </p>
          </div>

            {/* ===== VIDAME_REPERE_GRILLE_PIPELINE_SERVICES ===== */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {pipelineSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.step} className="overflow-hidden rounded-[2rem] border-slate-200">
                    <div className={`h-2 w-full ${step.color}`} />
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-sm font-semibold tracking-[0.18em] text-slate-400">
                          {step.step}
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                          <Icon className="h-6 w-6 text-slate-700" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* ===== VIDAME_REPERE_CTA_PIPELINE_SERVICES ===== */}
           <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
          {lang === "fr"
            ? "Besoin d’un cadre de traitement complet ?"
            : "Need a complete data processing framework?"}
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
          {lang === "fr"
            ? "Vidame peut intervenir en amont de l’analyse pour préparer, structurer et sécuriser vos données qualitatives."
            : "Vidame can step in upstream of analysis to prepare, structure, and secure your qualitative data."}
          </p>
          <button
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            onClick={() => setPage("soumission")}
          >
             {lang === "fr" ? "Obtenir un devis" : "Request a quote"}{" "}
              <ChevronRight className="h-4 w-4" />
            </button>
            </div>  
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_SOUMISSION =====
function Soumission({ lang = "fr" }: { lang?: "fr" | "en" }) {
  // ===== VIDAME_REPERE_DONNEES_FORMULAIRE_SOUMISSION =====
  const content = {
    fr: {
      eyebrow: "Demande de devis",
      title: "Précisez votre projet",
      text: "Un court formulaire pour structurer votre demande et amorcer une réflexion claire.",
      name: "Nom",
      org: "Organisation / Université",
      email: "Courriel",
      dept: "Département / Unité de recherche",
      chair: "Chaire de recherche (si applicable)",
      director: "Nom du directeur / de la directrice de projet",
      roleDefault: "Votre rôle",
      roles: [
        "Étudiant·e",
        "Assistant·e de recherche",
        "Professionnel·le de recherche",
        "Chercheur·e principal·e",
        "Autre",
      ],
      supportLabel: "Type de soutien souhaité",
      supportOptions: {
        transcription: "Transcription",
        anonymisation: "Anonymisation",
        segmentation: "Segmentation (timestamps / unités d'analyse)",
        structuration: "Nettoyage et mise en forme du corpus",
        segmentation_analytique: "Segmentation analytique",
        traduction: "Traduction",
        combine: "Soutien combiné",
      },
      requestLabel: "Décrivez brièvement votre demande",
      p1: "Les coûts varient selon le type de service, le volume, le domaine de spécialité et les exigences de protection des données. Les projets impliquant des vocabulaires techniques ou sensibles nécessitent une approche adaptée.",
      p2: "Pour faciliter l'évaluation de votre demande, vous pouvez indiquer le type de matériau, le volume approximatif, l'échéancier souhaité et toute contrainte particulière.",
      p3: "Chaque demande fait l'objet d'une évaluation contextualisée.",
      placeholder:
        "Ex. : 12 entrevues semi-dirigées en français, environ 9 heures d'audio, transcription et anonymisation souhaitées, échéancier de 3 semaines, projet universitaire soumis à des exigences éthiques.",
      submit: "Envoyer",
    },
    en: {
      eyebrow: "Quote request",
      title: "Tell me about your project",
      text: "A short form to structure your request and begin with a clear understanding of your needs.",
      name: "Name",
      org: "Organization / University",
      email: "Email",
      dept: "Department / Research Unit",
      chair: "Research Chair (if applicable)",
      director: "Project Supervisor / Director",
      roleDefault: "Your role",
      roles: [
        "Student",
        "Research Assistant",
        "Research Professional",
        "Principal Investigator",
        "Other",
      ],
      supportLabel: "Type of support requested",
      supportOptions: {
        transcription: "Transcription",
        anonymisation: "Anonymization",
        segmentation: "Segmentation (timestamps / units of analysis)",
        structuration: "Corpus cleaning and formatting",
        segmentation_analytique: "Analytical segmentation",
        traduction: "Translation",
        combine: "Combined support",
      },
      requestLabel: "Briefly describe your request",
      p1: "Costs vary depending on the type of service, volume, subject area, and data protection requirements. Projects involving technical or sensitive vocabulary require an adapted approach.",
      p2: "To support the assessment of your request, you may indicate the type of material, approximate volume, desired timeline, and any specific constraints.",
      p3: "Each request is assessed in its own context.",
      placeholder:
        "Example: 12 semi-structured interviews in French, approximately 9 hours of audio, transcription and anonymization requested, 3-week timeline, university project subject to ethics requirements.",
      submit: "Send",
    },
  } as const;

  const t = content[lang];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      {/* ===== VIDAME_REPERE_ENTETE_SOUMISSION ===== */}
      <SectionTitle eyebrow={t.eyebrow} title={t.title} text={t.text} />

      {/* ===== VIDAME_REPERE_FORMULAIRE_SOUMISSION ===== */}
      <form
        action="https://formspree.io/f/xwvwawel"
        method="POST"
        className="mt-8 space-y-6"
      >
        {/* ===== VIDAME_REPERE_CHAMPS_CACHES_SOUMISSION ===== */}
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="_redirect" value="https://google.com" />

        {/* ===== VIDAME_REPERE_CHAMPS_IDENTITE_SOUMISSION ===== */}
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder={t.name} />
          <Input name="organization" placeholder={t.org} />
        </div>

        {/* ===== VIDAME_REPERE_CHAMP_COURRIEL_SOUMISSION ===== */}
        <Input name="email" type="email" placeholder={t.email} />

        {/* ===== VIDAME_REPERE_CHAMPS_AFFILIATION_SOUMISSION ===== */}
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="department" placeholder={t.dept} />
          <Input name="research_chair" placeholder={t.chair} />
        </div>

        {/* ===== VIDAME_REPERE_CHAMPS_ROLE_DIRECTION_SOUMISSION ===== */}
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="project_director" placeholder={t.director} />

          <select
            name="role"
            className="w-full rounded-xl border border-slate-200 p-3 text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              {t.roleDefault}
            </option>
            {t.roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* ===== VIDAME_REPERE_CHECKBOX_SOUTIEN_SOUMISSION ===== */}
        <div>
          <label className="text-sm font-medium">{t.supportLabel}</label>
          <div className="mt-2 space-y-3 rounded-xl border border-slate-200 p-4">
            {Object.entries(t.supportOptions).map(([value, label]) => (
              <label key={value} className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  name="support_type"
                  value={label}
                  className="mt-0.5 h-4 w-4"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ===== VIDAME_REPERE_BLOC_DESCRIPTION_DEMANDE ===== */}
        <div className="space-y-2 rounded-xl bg-slate-50 p-5">
          <label className="text-sm font-medium">{t.requestLabel}</label>

          <p className="text-sm leading-6 text-slate-500">{t.p1}</p>
          <p className="text-sm leading-6 text-slate-500">{t.p2}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{t.p3}</p>

          <Textarea
            name="message"
            className="mt-2 border border-slate-300 bg-slate-100 focus:border-slate-400 focus:ring-0"
            placeholder={t.placeholder}
          />
        </div>

        {/* ===== VIDAME_REPERE_BOUTON_ENVOI_SOUMISSION ===== */}
        <Button type="submit" className="mt-8 rounded-full">
          {t.submit}
        </Button>
      </form>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_BLOG =====
function Blog({ lang }: { lang: "fr" | "en" }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      {/* ===== VIDAME_REPERE_ENTETE_BLOG ===== */}
      <SectionTitle
        eyebrow="Blog"
        title={
          lang === "fr"
            ? "Réflexions sur les données, le langage et l'IA"
            : "Reflections on data, language, and AI"
        }
        text={
          lang === "fr"
            ? "Une section pensée pour approfondir les enjeux méthodologiques, linguistiques et éthiques liés au traitement des corpus qualitatifs."
            : "A space designed to explore the methodological, linguistic, and ethical issues involved in working with qualitative corpora."
        }
      />

      {/* ===== VIDAME_REPERE_GRILLE_BLOG ===== */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {blogPosts(lang).map((post) => (
          <Card key={post.title} className="rounded-[1.5rem] border-slate-200">
            <CardContent className="p-6">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                {post.date}
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                {post.tag}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
// ===== VIDAME_REPERE_POINT_ENTREE_APP =====
export default function App() {
  // ===== VIDAME_REPERE_ETAT_APP =====
  const [page, setPage] = useState("accueil");
  const [lang, setLang] = useState<"fr" | "en">("fr");

  // ===== VIDAME_REPERE_RENDU_APP =====
  return <Shell page={page} setPage={setPage} lang={lang} setLang={setLang} />;
}
