import PipelineDiagram from "./components/PipelineDiagram";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShieldCheck,
  FileText,
  Languages,
  GraduationCap,
  FileSearch,
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

// ===== VIDAME_REPERE_DONNEES_PAGES =====
// Navigation principale du site.
// À modifier si tu veux changer les noms du menu.
const pages = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "À propos" },
  { id: "services", label: "Offre de services" },
  { id: "soumission", label: "Demande de soumission" },
  { id: "blog", label: "Blog" },
];
// ===== VIDAME_REPERE_DONNEES_SERVICES =====
// Liste courte des services affichés sur la page d’accueil.
// Ici, tu modifies les titres et textes des cartes de services.
const services = [
  {
    title: "Traduction et révision EN→FR",
    icon: Languages,
    text: "Traduction vers le français canadien, avec révision linguistique, harmonisation terminologique et adaptation au public.",
  },
  {
    title: "Transcription",
    icon: FileText,
    text: "Transcription assistée avec validation humaine, fidèle au discours, aux nuances et au langage réel des participants.",
  },
  {
    title: "Anonymisation des données",
    icon: ShieldCheck,
    text: "Traitement des données sensibles et neutralisation des identifiants, conforme aux exigences éthiques et légales.",
  },
  {
    title: "Segmentation et structuration",
    icon: Workflow,
    text: "Organisation du corpus en unités de sens et structuration pour une analyse qualitative claire et exploitable.",
  },
];
 // ===== VIDAME_REPERE_DONNEES_PILIERS =====
// Petites phrases de repère affichées sur la page d’accueil.
const pillars = [
  "Données hébergées et traitées avec priorité au Canada",
  "Approche conformité d’abord pour les équipes de recherche",
  "Validation humaine structurée, documentée et traçable à chaque étape sensible",
  "Clarté documentaire, traçabilité et rigueur linguistique",
];

// ===== VIDAME_REPERE_DONNEES_BLOG =====
// Articles affichés sur la page Blog.
const blogPosts = [
  {
    title: "Pourquoi la préparation des données est une étape scientifique à part entière",
    excerpt:
      "Transcrire, segmenter, anonymiser et structurer un corpus ne relève pas seulement de l’exécution technique : ce sont des opérations qui influencent directement la qualité du matériau de recherche.",
    tag: "Réflexion",
    date: "Mars 2026",
  },
  {
    title: "L’IA en contexte sensible : garder la conformité au centre du workflow",
    excerpt:
      "Quand les données touchent la santé, la recherche ou des milieux institutionnels, l’enjeu n’est pas seulement la performance des outils, mais la gouvernance de leur usage.",
    tag: "Conformité",
    date: "Mars 2026",
  },
  {
    title: "Du verbatim brut au corpus exploitable : les étapes du pipeline Vidame",
    excerpt:
      "Un bon pipeline ne se limite pas à produire du texte. Il organise une chaîne opératoire complète : intégrité, anonymisation, structuration, traçabilité et réutilisation.",
    tag: "Méthode",
    date: "Mars 2026",
  },
];

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  text?: string;
};

// ===== VIDAME_REPERE_BRIQUES_VISUELLES =====
// À partir d’ici : petits composants réutilisés partout dans le site.
// En général, ne pas modifier sans raison précise.
function Card({ className = "", children, onClick }: { className?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`rounded-3xl border bg-white ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardTitle({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={`font-semibold tracking-tight text-slate-900 ${className}`}>{children}</h3>;
}

function CardDescription({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <p className={`mt-1 text-sm text-slate-500 ${className}`}>{children}</p>;
}

function CardContent({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "lg";
  onClick?: () => void;
}) {
  const base = "inline-flex items-center justify-center gap-2 border font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50";
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
    <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${className}`} />;
}

function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${className}`} />;
}

function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <span className={`inline-flex items-center border border-transparent text-xs font-medium ${className}`}>{children}</span>;
}

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
// SHELL = squelette global du site.
// Ici se trouvent : le header, le menu, le logo, le footer.
function Shell({ page, setPage }: { page: string; setPage: (page: string) => void }) {
  const [open, setOpen] = useState(false);
  const currentLabel = useMemo(() => pages.find((p) => p.id === page)?.label ?? "Accueil", [page]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* ===== VIDAME_REPERE_HEADER ===== */}
      {/* En-tête fixe du site : logo + navigation + bouton de soumission */}
      <header className="sticky top-0 z-40 border-b border-slate-400 bg-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <button onClick={() => setPage("accueil")} className="flex items-center gap-3 text-left">
            <div className="flex items-center gap-3">
            {/* ===== VIDAME_REPERE_LOGO ===== */}
            {/* Changer ici le fichier du logo affiché en haut du site */}
            <img src="/vidame_favicon_blanc_noir_192x192.png" alt="Vidame" style={{ height: "56px" }} />
            <div className="leading-tight">
            <div className="text-sm font-semibold">Vidame</div>
            <div className="text-xs text-slate-700">Services linguistiques et traitement de données</div>
          </div>
        </div>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {pages.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
               className={`rounded-full px-4 py-2 text-base font-medium transition ${page === item.id? "bg-slate-900 text-white":"text-slate-800 hover:bg-slate-100 hover:text-slate-900"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

        <div className="flex items-center gap-3">
        <button className="rounded-xl border border-slate-200 p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Ouvrir le menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      </div>

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
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {page === "accueil" && <Accueil setPage={setPage} />}
            {page === "apropos" && <APropos setPage={setPage} />}
            {page === "services" && <Services />}
            {page === "soumission" && <Soumission />}
            {page === "blog" && <Blog />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ===== VIDAME_REPERE_FOOTER ===== */}
      {/* Pied de page : coordonnées et rappel de navigation */}
      <footer className="border-t border-slate-300 bg-slate-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 font-semibold text-white">V</div>
              <div>
                <div className="font-semibold">Vidame</div>
                <div className="text-sm text-slate-500">Clarté linguistique. Rigueur documentaire. Flux sécurisés.</div>
              </div>
            </div>
            <p className="text-sm leading-7 text-slate-600">
              Vidame accompagne les équipes qui travaillent avec des données sensibles, des corpus complexes et des exigences élevées en matière de qualité linguistique.
            </p>
          </div>

          <div className="space-y-4">
            <div className="font-semibold">Navigation</div>
            <div className="grid gap-2 text-sm text-slate-600">
              {pages.map((item) => (
                <button key={item.id} onClick={() => setPage(item.id)} className="text-left hover:text-slate-900">
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-semibold">Coordonnées</div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4" /> contact@vidame.ca</div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4" /> Sur demande</div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Montréal, Québec</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_ACCUEIL =====
// Page d’accueil du site.
function Accueil({ setPage }: { setPage: (page: string) => void }) {
  const [activeStep, setActiveStep] = useState(0);

    // ===== VIDAME_REPERE_PIPELINE_ACCUEIL =====
  // Étapes du pipeline interactif affiché sur la page d’accueil.
  const steps = [
    { icon: FileText, title: "Corpus brut", text: "Entrevues audio/vidéo", detail: "Données issues du terrain : riches, mais non exploitables telles quelles." },
    { icon: PenSquare, title: "Transcription", text: "Fidélité du discours", detail: "Transcription assistée + validation humaine visant la restitution du sens de la parole au texte, avec respect des nuances et du langage réel. Transcrire, c’est préserver le sens — pas seulement les mots.", highlight: "Validation humaine" },
    { icon: ShieldCheck, title: "Préparation", text: "Anonymisation, segmentation", detail: "Nettoyage du texte, anonymisation et mise en forme du corpus.", highlight: "Conformité" },
    { icon: Workflow, title: "Segmentation analytique", text: "Organisation analytique", detail: "Repérage de thèmes et structuration pour faciliter l’analyse." },
    { icon: Microscope, title: "Analyse", text: "Corpus exploitable", detail: "Corpus prêt pour NVivo, MAXQDA ou autre, structuré et traçable.", highlight: "Intégrité analytique" },
  ];

  return (
    <div>
      {/* ===== VIDAME_REPERE_HERO_ACCUEIL ===== */}
      {/* Grand bloc du haut sur la page d’accueil */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-24">
        <div className="space-y-8">
          <Badge className="rounded-full bg-slate-100 px-4 py-1 text-slate-700 hover:bg-slate-100">Conformité éthique · Loi 25 · Données sensibles protégées</Badge>
          <div className="space-y-5">
            {/* ===== VIDAME_REPERE_TITRE_PRINCIPAL_ACCUEIL ===== */}
            {/* h1 = titre principal de la page */}
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl md:leading-[1.05]">
              Traduction, transcription et préparation des données pour l'analyse qualitative
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Vidame propose des services de soutien à la recherche qualitative, couvrant la transcription, la traduction et la préparation des données — incluant la post-édition, l’anonymisation, la segmentation et l’organisation analytique — afin de produire un corpus structuré, navigable et prêt pour l’analyse.
            </p>
          </div>
            
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" onClick={() => setPage("soumission")}>
              Demander une soumission
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" onClick={() => setPage("services")}>
              Voir l’offre de services
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <CheckCircle2 className="mt-0.4 h-4 w-4 shrink-0" />
                <div className="text-sm leading-6 text-slate-700">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <Card className="w-full rounded-2x1 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Pourquoi Vidame?</CardTitle>
              <CardDescription>Une chaîne de traitement pensée pour les contextes de recherche exigeants.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5 px-6 pb-6">
              {[
                { icon:GraduationCap, title: "Expérience en recherche qualitative", text: "Niveau doctoral et plus de 10 ans de collaboration avec des unités de recherche universitaires" },
                { icon: Lock, title: "Conformité intégrée", text: "Intégration des exigences des comités d’éthique et de la Loi 25 à chaque étape" },
                { icon: PenSquare, title: "Maîtrise du sens", text: "Traduire au-delà des mots, en respectant le domaine de spécialité, le contexte et le niveau de langage" },
                { icon: Workflow, title: "Rigueur méthodologique", text: "Un pipeline fonctionnel pensé pour l’analyse qualitative" },
                { icon: FileSearch, title: "De l’oral à l’analyse", text: "Structuration et formatage des corpus d’entrevues en données prêtes à analyser" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl bg-slate-50 p-3.5">
                   <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.text}</p>
                    </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>

     {/* ===== VIDAME_REPERE_SECTION_PIPELINE ===== */}
      <section className="border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <SectionTitle
            eyebrow="Pipeline Vidame"
            title="Du terrain à l’analyse, une chaîne opératoire claire"
            text="Cliquez sur chaque étape pour comprendre le rôle précis de Vidame dans la transformation du corpus."
          />
          
         <div className="mt-10 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                Un cadre de traitement conforme aux exigences des comités d’éthique et aux lois canadiennes
                </h2>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Les données qualitatives comportent des informations sensibles. Vidame intègre les exigences des comités d’éthique et de la Loi 25 dès le traitement du corpus, afin d’assurer la confidentialité, la sécurité et la conformité des données tout au long du processus.
                </p>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  Le traitement informatisé est encadré par une validation humaine rigoureuse à chaque étape critique, garantissant la traçabilité et la qualité des transformations appliquées aux données.
                </p>
              </div>
              </div>
 
         {/* VIDAME_REPERE_PIPELINE_DIAGRAM */}
          <PipelineDiagram /> 
          
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <div key={step.title} className="relative">
                  <Card
                      onClick={() => setActiveStep(i)}
                     className={`relative h-full cursor-pointer rounded-[1.5rem] border-slate-200 transition-colors duration-200 ${isActive ? "ring-2 ring-slate-900 bg-slate-100" : "hover:bg-slate-100 hover:shadow"}`}
>
                      <CardContent className="p-5">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                          <Icon className="h-5 w-5" />
                         </div>
                          <div className="text-sm font-semibold">{i + 1}. {step.title}</div>
                          <p className="mt-1 text-xs leading-6 text-slate-600">{step.text}</p>
                          {step.highlight && (
                            <div className="mt-2 text-[10px] font-medium uppercase tracking-wide text-slate-500">
                              {step.highlight}
                             </div>
                              )}

                      <div className="pointer-events-none absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2 text-4xl font-light leading-none text-slate-400 transition-colors duration-200 group-hover:text-slate-600">
                        +
                      </div>
                      </CardContent>
                    </Card>

                  {i < steps.length - 1 && (
                    <div className="absolute right-[-12px] top-1/2 hidden translate-y-[-50%] md:block">
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">Étape {activeStep + 1}</div>
            <div className="text-lg font-semibold">{steps[activeStep].title}</div>
            <p className="mt-2 leading-7 text-slate-600">{steps[activeStep].detail}</p>
          </div>
        </div>
      </section>

     <section className="mx-auto max-w-7xl px-4 pb-4 md:px-8">
  <div className="group rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-[1px] shadow-sm">
    <div className="rounded-[calc(2rem-1px)] bg-white p-6 transition-colors duration-200 group-hover:bg-slate-100 md:p-8">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Badge className="rounded-full bg-slate-900 px-4 py-1 text-white hover:bg-slate-900">
          Parcours doctorant
        </Badge>
        <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
          Du matériau brut à l’analyse
        </div>
      </div>

      <details>
        <summary className="list-none cursor-pointer rounded-[1.5rem]">
          <div className="relative grid gap-6 rounded-[1.5rem] md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Passons à l’analyse
              </div>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
                L’étape qui révèle votre plein potentiel de chercheur.
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-slate-50 p-5 transition-colors duration-200 group-hover:bg-slate-100">
              <div className="text-sm font-semibold text-slate-900">
                Pourquoi ouvrir cette section
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Pour parler directement à celles et ceux qui portent le corpus au quotidien :
                doctorants, assistants et assistantes de recherche, équipes terrain.
               </p>
              </div>

            <div className="pointer-events-none absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-1/2 text-4xl font-light leading-none text-slate-400">
              +
            </div>
          </div>
        </summary>

        <div className="mt-6 space-y-6 leading-8 text-slate-600">
          <p>
                  Le projet commence souvent par des heures d’entrevues. Les données s’accumulent rapidement. Les enregistrements sont riches, mais difficiles à mobiliser tels quels.
                </p>
                <p>
                  Une première transformation est nécessaire : passer de l’audio au texte. Mais ce texte reste encore un matériau brut. Il faut ensuite le structurer, l’anonymiser, le segmenter et le rendre navigable.
                </p>
                <p>
                  C’est à ce moment que se joue la qualité de l’analyse — et où votre expertise peut réellement se déployer. Sans préparation rigoureuse, le corpus devient difficile à explorer, à comparer et à interpréter.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-3 font-semibold">Ce que Vidame prend en charge</div>
                  <ol className="space-y-2 text-sm leading-7 text-slate-600">
                    <li>1. Transformer le matériau brut en corpus exploitable</li>
                    <li>2. Sécuriser la transcription et la traçabilité</li>
                    <li>3. Préparer le corpus pour la navigation et l’analyse</li>
                    <li>4. Soutenir l’organisation analytique en amont</li>
                  </ol>
                </div>

                <p>
                  Vidame intervient dans cet espace critique : entre le terrain et l’analyse. L’objectif n’est pas seulement de produire du texte, mais de transformer le corpus en un objet navigable, réellement exploitable pour l’analyse.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ===== VIDAME_REPERE_SECTION_SERVICES_ACCUEIL ===== */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <SectionTitle
            eyebrow="Services à la carte"
            title="Traduction & transcription"
            text="Services linguistiques à la carte pour répondre rapidement à vos besoins en traduction, transcription et préparation des données."
            />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="rounded-[1.5rem] border-slate-200">
                  <CardContent className="p-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{service.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <a
             className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-slate-700"
              >
              Demander une soumission
              </a>

            <a
              href="/offre-de-services"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50"
            >
              Voir l’offre de services
            </a>
          </div>

        </div>
      </section>

    {/* ===== VIDAME_REPERE_SECTION_ARTICLES_ACCUEIL ===== */}
<section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
  <div className="mb-10">
    <div className="text-sm uppercase tracking-[0.18em] text-slate-500">
      Blog
    </div>
    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
      Réflexions sur les données, le langage et l’IA
    </h2>
    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
      Une section pensée pour approfondir les enjeux méthodologiques, linguistiques et éthiques liés au traitement des corpus qualitatifs.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    <button
     type="button"
      onClick={() => setPage("blog")}
      className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-colors duration-200 hover:bg-slate-100"
    >
      <div className="text-sm uppercase tracking-[0.14em] text-slate-500">
        Mars 2026
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        Pourquoi la préparation des données est une étape scientifique à part entière
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Transcrire, segmenter, anonymiser et structurer un corpus ne relève pas seulement de l’exécution technique : ce sont des opérations qui influencent directement la qualité du matériau de recherche.
      </p>
      <div className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        Réflexion
      </div>
   </button>

    <button
     type="button"
      onClick={() => setPage("blog")}
      className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-colors duration-200 hover:bg-slate-100"
    >
      <div className="text-sm uppercase tracking-[0.14em] text-slate-500">
        Mars 2026
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        L’IA en contexte sensible : garder la conformité au centre du workflow
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Quand les données touchent la santé, la recherche ou des milieux institutionnels, l’enjeu n’est pas seulement la performance des outils, mais la gouvernance de leur usage.
      </p>
      <div className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        Conformité
      </div>
    </button>

    <button
     type="button"
      onClick={() => setPage("blog")}
      className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 transition-colors duration-200 hover:bg-slate-100"
    >
      <div className="text-sm uppercase tracking-[0.14em] text-slate-500">
        Mars 2026
      </div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900">
        Du verbatim brut au corpus exploitable : les étapes du pipeline Vidame
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Un bon pipeline ne se limite pas à produire du texte. Il organise une chaîne opératoire complète : intégrité, anonymisation, structuration, traçabilité et réutilisation.
      </p>
      <div className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
        Méthode
      </div>
    </button>
  </div>

  <div className="mt-6 flex justify-center">
    <button
     type="button"
      onClick={() => setPage("blog")}
      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50"
    >
      Voir tous les articles
   </button>
  </div>
</section>

      <section className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-2xl space-y-3">
            <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Prêt à démarrer</div>
            <h3 className="text-3xl font-semibold tracking-tight">Parlez-moi de votre projet.</h3>
            <p className="leading-8 text-slate-300">
              Décrivez votre besoin, votre volume, vos contraintes de confidentialité et votre échéancier. Une réponse pourra ensuite être préparée selon votre contexte.
            </p>
          </div>
          <Button size="lg" variant="secondary" className="rounded-full" onClick={() => setPage("soumission")}>
            Ouvrir le formulaire
          </Button>
        </div>
      </section>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_APROPOS =====
// Page À propos.
function APropos({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] items-start">
        <div className="w-full h-full overflow-hidden rounded-[2rem]">
          <img
            src="/monique.jpg"
            alt="Monique Provost"
            className="w-full h-full object-cover object-[center_20%]"
          />
        </div>

        <div className="space-y-6">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">
            À propos
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
            Un regard humain structuré sur des données complexes
          </h1>

          <p className="text-lg leading-8 text-slate-700">
            Je suis spécialisée dans le traitement de données qualitatives, à l’intersection
            du langage, de la recherche et des outils assistés par intelligence artificielle.
            Mon travail consiste à transformer des corpus complexes en matériaux fiables,
            structurés et directement exploitables pour l’analyse.
          </p>

          <p className="leading-8 text-slate-600">
            Vidame est né d’un constat simple : un bon outil ne remplace pas un bon jugement.
            Dans les environnements sensibles, la valeur ne réside pas seulement dans la vitesse
            d’exécution, mais dans la capacité à encadrer les transformations avec méthode,
            traçabilité et rigueur.
          </p>

          <p className="leading-8 text-slate-600">
            J’interviens comme un pont entre le terrain et l’analyse, en veillant à ce que
            chaque étape — de la transcription à la structuration — respecte à la fois les
            exigences scientifiques, les contraintes éthiques et les réalités opérationnelles
            des équipes.
          </p>
        </div>
      </div>
    </div>
  );
}
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="rounded-[2rem] border-slate-200">
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <p className="leading-8 text-slate-600">
              Offrir des services linguistiques et documentaires de haute rigueur, appuyés par des workflows structurés, afin d’aider les organisations à traiter leurs contenus avec plus de clarté, de sécurité et de cohérence.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-slate-200">
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <p className="leading-8 text-slate-600">
              Développer une pratique du langage assisté par IA qui reste profondément humaine : transparente, traçable, adaptée aux contraintes réelles du terrain et respectueuse de la valeur scientifique des données.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Clarté",
            text: "Rendre les contenus plus lisibles, plus structurés et plus utiles pour leurs destinataires.",
          },
          {
            title: "Rigueur",
            text: "Documenter les choix, encadrer les étapes sensibles et maintenir un niveau élevé de contrôle qualité.",
          },
          {
            title: "Responsabilité",
            text: "Faire des choix techniques qui respectent les exigences éthiques, juridiques et opérationnelles du mandat.",
          },
        ].map((item) => (
          <Card key={item.title} className="rounded-[1.5rem] border-slate-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border-slate-200 bg-slate-50">
          <CardContent className="p-8">
            <Quote className="h-8 w-8 text-slate-400" />
            <p className="mt-5 text-xl leading-9 text-slate-800">
              Vidame s’adresse aux équipes qui veulent intégrer des outils contemporains sans perdre la maîtrise de leurs données, de leurs textes et de leurs décisions.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 rounded-[2rem] border border-slate-200 p-8">
          <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Pour qui</div>
          <ul className="space-y-3 text-slate-700">
            <li>Équipes de recherche</li>
            <li>Organismes en santé</li>
            <li>Institutions et milieux documentaires</li>
            <li>Professionnels ayant des corpus sensibles à traiter</li>
          </ul>
          <Button className="mt-4 rounded-full" onClick={() => setPage("services")}>Voir les services</Button>
        </div>
      </div>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_SERVICES =====
// Page détaillée de l’offre de services.
function Services() {
    // ===== VIDAME_REPERE_CONTENU_SERVICES_DETAIL =====
  // Contenu détaillé des blocs de services sur la page Offre de services.
  const serviceNarrative = [
    {
      title: "Transcription et mise en phrases (unités de sens)",
      icon: FileText,
      intro: "Le travail commence souvent avec des enregistrements riches, mais encore difficiles à mobiliser pour la recherche.",
      need: "Passer de la parole au texte sans perdre le sens du discours.",
      support: "Transcription assistée par IA avec révision humaine rigoureuse. Priorité donnée à la fidélité du discours : restitution du sens de la parole au texte, respect des nuances, du rythme et du langage réel des participants.",
    },
    {
      title: "Anonymisation et éthique des données",
      icon: ShieldCheck,
      intro: "Une fois transcrit, le corpus doit être sécurisé avant de pouvoir circuler ou être confié à une équipe.",
      need: "Protéger les participants, neutraliser les identifiants et respecter les exigences éthiques.",
      support: "Anonymisation des données sensibles, gestion des identifiants et conformité aux exigences éthiques et légales, incluant la Loi 25.",
    },
    {
      title: "Nettoyage du texte et mise en forme du corpus",
      icon: PenSquare,
      intro: "Le texte brut reste souvent irrégulier, chargé de bruit et peu commode pour la lecture analytique.",
      need: "Rendre le corpus lisible, homogène et prêt à être manipulé.",
      support: "Nettoyage du texte, mise en phrases, homogénéisation et mise en forme du corpus pour soutenir la recherche qualitative.",
    },
    {
      title: "Segmentation analytique (cartographie du corpus)",
      icon: Workflow,
      intro: "À ce stade, le chercheur doit pouvoir repérer, comparer, revenir en arrière et suivre les unités de sens dans l’ensemble du corpus.",
      need: "Transformer le corpus en objet navigable, structuré et traçable.",
      support: "Segmentation analytique du corpus visant à découper le matériau en unités de sens, organiser les relations entre segments et soutenir le repérage, la navigation et la traçabilité.",
    },
    {
      title: "Traduction et révision EN→FR",
      icon: Languages,
      intro: "Dans les projets pancanadiens ou multilingues, l’analyse peut être ralentie ou biaisée lorsque le corpus circule dans une langue que l’équipe ne maîtrise pas pleinement.",
      need: "Préserver le sens du matériau tout en le rendant lisible pour l’équipe de recherche.",
      support: "Traduction vers le français canadien, fidèle au langage réel des participants, incluant les documents destinés aux comités d’éthique, formulaires de consentement et protocoles de recherche.",
    },
    {
      title: "Soutien aux projets de recherche",
      icon: Microscope,
      intro: "Certains projets demandent un appui plus transversal pour articuler les étapes, documenter les choix et maintenir la cohérence du traitement.",
      need: "Assurer la continuité du processus et la cohérence méthodologique du corpus.",
      support: "Appui aux équipes de recherche pour la conformité, la clarté documentaire, les protocoles de traitement linguistique et les flux de travail sécurisés.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Offre de services"
        title="Une littéracie commune, du terrain à l’analyse"
        text="Que vous soyez dans une démarche inductive ou déductive, Vidame s’inscrit dans votre processus de recherche. Les blocs ci-dessous présentent les catégories de soutien comme des repères stables dans la chaîne de production du corpus."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-[1.5rem] border-slate-200">
          <CardContent className="space-y-3 p-6">
            <div className="font-semibold">Approche inductive</div>
            <p className="text-sm leading-7 text-slate-600">
              L’analyse émerge du corpus. Le rôle de Vidame est de préserver la richesse du matériau, d’en soutenir l’exploration et de rendre les unités de sens repérables sans imposer une structure interprétative prématurée.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[1.5rem] border-slate-200">
          <CardContent className="space-y-3 p-6">
            <div className="font-semibold">Approche déductive</div>
            <p className="text-sm leading-7 text-slate-600">
              L’analyse repose sur une grille ou un cadre préalable. Le rôle de Vidame est d’organiser le corpus pour permettre une application cohérente, traçable et reproductible des catégories d’analyse.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {serviceNarrative.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="rounded-[2rem] border-slate-200">
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-[260px_1fr] md:items-start">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Étape {index + 1}</div>
                    <h3 className="mt-2 text-lg font-semibold leading-7 text-slate-900">{item.title}</h3>
                  </div>

                  <div className="space-y-4">
                    <p className="leading-8 text-slate-600">{item.intro}</p>
                    <div className="rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                      <strong>Besoin du chercheur :</strong> {item.need}
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4 text-sm leading-7 text-slate-700">
                      <strong>Soutien Vidame :</strong> {item.support}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_SOUMISSION =====
// Page formulaire.
function Soumission() {
  const [type, setType] = useState("");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      {/* ===== VIDAME_REPERE_FORMULAIRE_INTRO ===== */}
      <SectionTitle
        eyebrow="Demande de soumission"
        title="Précisez votre projet"
        text="Un court formulaire pour structurer votre demande et amorcer une réflexion claire."
      />

      <div className="mt-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* ===== VIDAME_REPERE_FORMULAIRE_NOM ===== */}
          <Input placeholder="Nom" />
          <Input placeholder="Organisation / Université" />
        </div>

        {/* ===== VIDAME_REPERE_FORMULAIRE_COURRIEL ===== */}
        <Input placeholder="Courriel" />

        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Département / Unité de recherche" />
          <Input placeholder="Chaire de recherche (si applicable)" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Nom du directeur / de la directrice de projet" />
          <select className="w-full rounded-xl border border-slate-200 p-3 text-sm">
            <option>Votre rôle</option>
            <option>Étudiant·e</option>
            <option>Assistant·e de recherche</option>
            <option>Professionnel·le de recherche</option>
            <option>Chercheur·e principal·e</option>
            <option>Autre</option>
          </select>
        </div>

        <div>
          {/* ===== VIDAME_REPERE_FORMULAIRE_TYPE_SOUTIEN ===== */}
          <label className="text-sm font-medium">Type de soutien souhaité</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm">
            <option value="">Sélectionnez</option>
            <option value="transcription">Transcription</option>
            <option value="anonymisation">Anonymisation</option>
            <option value="segmentation">Segmentation (timestamps / unités d’analyse)</option>
            <option value="structuration">Nettoyage et mise en forme du corpus</option>
            <option value="segmentation_analytique">Segmentation analytique</option>
            <option value="traduction">Traduction</option>
            <option value="combine">Soutien combiné</option>
          </select>
        </div>

       <div className="space-y-2 rounded-xl bg-slate-50 p-5">
  <label className="text-sm font-medium">Décrivez brièvement votre demande</label>

  <p className="text-sm leading-6 text-slate-500">
    Les coûts varient selon le type de service, le volume, le domaine de spécialité et les exigences de protection des données. Les projets impliquant des vocabulaires techniques ou sensibles nécessitent une approche adaptée.
  </p>

  <p className="text-sm leading-6 text-slate-500">
    Pour faciliter l’évaluation de votre demande, vous pouvez indiquer le type de matériau, le volume approximatif, l’échéancier souhaité et toute contrainte particulière.
  </p>

  <p className="mt-2 text-sm leading-6 text-slate-500">
    Chaque demande fait l’objet d’une évaluation contextualisée.
  </p>

  <Textarea
    className="mt-2 bg-slate-100 border border-slate-300 focus:border-slate-400 focus:ring-0"
    placeholder="Ex. : 12 entrevues semi-dirigées en français, environ 9 heures d’audio, transcription et anonymisation souhaitées, échéancier de 3 semaines, projet universitaire soumis à des exigences éthiques."
  />
</div>

<Button className="mt-8 rounded-full">Envoyer</Button>
      </div>
    </div>
  );
}

// ===== VIDAME_REPERE_PAGE_BLOG =====
// Page blog.
function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <SectionTitle
        eyebrow="Blog"
        title="Réflexions sur les données, le langage et l’IA"
        text="Une section pensée pour approfondir les enjeux méthodologiques, linguistiques et éthiques liés au traitement des corpus qualitatifs."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.title} className="rounded-[1.5rem] border-slate-200">
            <CardContent className="p-6">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{post.date}</div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <div className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{post.tag}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ===== VIDAME_REPERE_POINT_ENTREE_APP =====
// Point d’entrée principal. À ne pas modifier sauf besoin précis.
export default function App() {
  const [page, setPage] = useState("accueil");
  return <Shell page={page} setPage={setPage} />;
}
