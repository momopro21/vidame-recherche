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
    const pages = [
      { id: "accueil", label: "Accueil" },
      { id: "apropos", label: "À propos" },
      { id: "services", label: "Offre de services" },
      { id: "soumission", label: "Obtenir un devis" },
      { id: "blog", label: "Blog" },
    ];

    // ===== VIDAME_REPERE_DONNEES_SERVICES =====
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
    const pillars = [
      "TRADUCTION - Préserver le sens, adapter au contexte culturel et au niveau de langage",
      "TRANSCRIPTION - REstituter fidèlement le discours, au delà des limites de l'automatisation",
      "STRUCTURATION - Organiser les contenus pour en faciliter la lecture et soutenir l’analyse scientifique",
      "VALIDATION -Encadrer chaque étape pour assurer la qualité et la cohérence du résultat",
    ];

    // ===== VIDAME_REPERE_DONNEES_BLOG =====
    const blogPosts = [
      {
        title: "Pourquoi la préparation des données est une étape scientifique à part entière",
        excerpt:
          "Transcrire, segmenter, anonymiser et structurer un corpus ne relève pas seulement de l'exécution technique : ce sont des opérations qui influencent directement la qualité du matériau de recherche.",
        tag: "Réflexion",
        date: "Mars 2026",
      },
      {
        title: "L'IA en contexte sensible : garder la conformité au centre du workflow",
        excerpt:
          "Quand les données touchent la santé, la recherche ou des milieux institutionnels, l'enjeu n'est pas seulement la performance des outils, mais la gouvernance de leur usage.",
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
      const currentLabel = useMemo(() => pages.find((p) => p.id === page)?.label ?? "Accueil", [page]);

      return (
        <div className="min-h-screen bg-white text-slate-800">
          {/* ===== VIDAME_REPERE_HEADER ===== */}
<header className="sticky top-0 z-40 border-b border-slate-400 bg-slate-300">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
    <button onClick={() => setPage("accueil")} className="flex items-center gap-3 text-left">
      <div className="flex items-center gap-3">
        {/* ===== VIDAME_REPERE_LOGO ===== */}
        <img
          src="/vidame_favicon_blanc_noir_192x192.png"
          alt="Vidame"
          className="h-14 w-14 rounded-xl object-contain"
        />
        <div className="leading-tight">
          <div className="text-sm font-semibold">Vidame</div>
          <div className="text-xs text-slate-900 leading-snug">
            <span>Soutien à la recherche qualitative,</span>
            <br />
                      <span>traduction et transcription</span>
                    </div>
                  </div>
                </div>
              </button>
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
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-3">
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

                  <button
                    className="rounded-xl border border-slate-200 p-2 md:hidden"
                    onClick={() => setOpen((v) => !v)}
                    aria-label="Ouvrir le menu"
                  >
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
                {page === "services" && <ServicesPage setPage={setPage} />}
                {page === "soumission" && <Soumission lang={lang} />}
                {page === "blog" && <Blog />}
              </motion.div>
            </AnimatePresence>
          </main>

        {/* ===== VIDAME_REPERE_FOOTER ===== */}
    <footer className="border-t border-slate-300 bg-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-8">
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
                Soutien à la recherche qualitative, traduction, transcription
              </div>
            </div>
          </div>
                  <p className="text-sm leading-7 text-slate-600">
                 La chaine opératoire (le pipeline) Vidame est conçue pour préparer les données de recherche qualitative à analyser. 
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
function Accueil({ setPage }: { setPage: (page: string) => void }) {
  const [activeStep, setActiveStep] = useState(0);

  // ===== VIDAME_REPERE_PIPELINE_ACCUEIL =====
  const steps = [
    {
      icon: FileText,
      title: "Corpus brut",
      text: "Entrevues audio/vidéo",
      detail: "Données issues du terrain : riches, mais non exploitables telles quelles.",
    },
    {
      icon: PenSquare,
      title: "Transcription",
      text: "Fidélité du discours",
      detail:
        "Transcription assistée + validation humaine visant la restitution du sens de la parole au texte, avec respect des nuances et du langage réel. Transcrire, c'est préserver le sens — pas seulement les mots.",
      highlight: "Validation humaine",
    },
    {
      icon: ShieldCheck,
      title: "Préparation",
      text: "Anonymisation, segmentation",
      detail: "Nettoyage du texte, anonymisation et mise en forme du corpus.",
      highlight: "Conformité",
    },
    {
      icon: Workflow,
      title: "Segmentation analytique",
      text: "Organisation analytique",
      detail: "Repérage de thèmes et structuration pour faciliter l'analyse.",
    },
    {
      icon: Microscope,
      title: "Analyse",
      text: "Corpus exploitable",
      detail: "Corpus prêt pour NVivo, MAXQDA ou autre, structuré et traçable.",
      highlight: "Intégrité analytique",
    },
  ];

  return (
    <div>
      {/* ===== VIDAME_REPERE_HERO_ACCUEIL ===== */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="max-w-5xl space-y-12">
          <Badge className="rounded-full bg-slate-200 px-4 py-1.5 text-slate-800 hover:bg-slate-200">
            Données sensibles · Conformité éthique · Cadre légal canadien, incluant la Loi 25
          </Badge>

          <div className="space-y-6">
            {/* ===== VIDAME_REPERE_TITRE_PRINCIPAL_ACCUEIL ===== */}
            <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-[1.05]">
              Un service professionnel de traitement des données qualitatives, dans le respect de la souveraineté des données canadiennes
            </h1>

            <p className="max-w-4xl text-lg leading-8 text-slate-700 md:text-xl md:leading-9">
              Pipeline de traitement des données qualitatives, selon une approche humaine assistée par l’IA, avec données hébergées au Canada, encadré par une professionnelle de la recherche qualitative.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => setPage("soumission")}
              >
                Obtenir un devis
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full"
                onClick={() => setPage("services")}
              >
                Voir l'offre de services
              </Button>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-xl md:leading-9">
              Vidame transforme vos données brutes en un corpus structuré, prêt pour l’analyse qualitative.
            </p>

            <div className="mt-0">
              <PipelineDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDAME_REPERE_SECTION_PIPELINE ===== */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-8 md:py-8">
          <SectionTitle
            eyebrow="PIPELINE VIDAME"
            title={"Du terrain à l'analyse : la chaine opératoire\u00A0Vidame"}
          />

          <div className="mt-4 space-y-8">
            <p className="max-w-5xl text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
              Le projet commence souvent par des heures d’entrevues. Les données s’accumulent rapidement, mais les enregistrements issus du terrain restent difficiles à mobiliser tels quels.
            </p>

            <p className="max-w-5xl text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
              Une première transformation est nécessaire : passer de l’audio au texte. Mais ces écrits représentent encore un matériau brut. Il faut ensuite les structurer, les anonymiser, les segmenter et les rendre navigables.
            </p>

            <p className="max-w-5xl text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
              C’est dans cet espace critique, entre le terrain et l’analyse, que Vidame intervient pour transformer le matériau brut en un corpus navigable, structuré et directement exploitable.
            </p>

            <div className="max-w-5xl space-y-6 border-t border-slate-200 pt-6">
              <p className="text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
                Le pipeline Vidame organise le passage des données brutes vers un corpus exploitable pour l’analyse qualitative.
              </p>

              <p className="text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
                Chaque étape constitue une opération distincte, avec des points de validation explicites assurant la qualité du traitement, la traçabilité des transformations et la conformité aux exigences éthiques.
              </p>

              <p className="text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
                Les traitements automatisés sont encadrés par des interventions humaines aux moments critiques.
              </p>

              <p className="text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
                À l’étape de l’analyse, un corpus bien structuré prend toute sa valeur. Sans préparation rigoureuse, les données restent difficiles à explorer, à comparer et à interpréter.
              </p>

              <p className="text-[1.15rem] leading-9 text-slate-700 md:text-[1.2rem] md:leading-9">
                L’objectif de Vidame est de vous permettre de vous consacrer à l’analyse à partir d’un corpus déjà structuré, fiable et exploitable.
              </p>

              <div className="mt-2 rounded-xl bg-slate-50 p-5 md:p-6">
                <div className="mb-3 text-lg font-semibold text-slate-900 md:text-xl">
                  Ce que Vidame prend en charge
                </div>

                <ol className="space-y-2 text-base leading-8 text-slate-700 md:text-lg">
                  <li>1. Transformer le matériau brut en corpus exploitable</li>
                  <li>2. Assurer la fidélité et la traçabilité des données</li>
                  <li>3. Préparer le corpus pour la navigation et l’analyse</li>
                  <li>4. Structurer le corpus sans ajout interprétatif</li>
                </ol>
              </div>
            </div>
          </div>

        {/* ===== VIDAME_REPERE_PIPELINE_DIAGRAM ===== */}
<div className="mt-10 grid gap-6 md:grid-cols-5">
  {steps.map((step, i) => {
    const Icon = step.icon;
    const isActive = activeStep === i;

    return (
      <div key={step.title} className="relative">
        <Card
          onClick={() => setActiveStep(i)}
          className={`group relative h-full cursor-pointer rounded-[1.5rem] border-slate-200 transition-colors duration-200 ${
            isActive
              ? "ring-2 ring-slate-900 bg-slate-100"
              : "hover:bg-slate-100 hover:shadow"
          }`}
        >
          <CardContent className="p-5 md:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
              <Icon className="h-5 w-5" />
            </div>

            <div className="text-base font-semibold leading-7 md:text-lg">
              {i + 1}. {step.title}
            </div>

            <p className="mt-2 text-sm leading-7 text-slate-600 md:text-base">
              {step.text}
            </p>

            {step.highlight && (
              <div className="mt-3 text-xs font-medium uppercase tracking-wide text-slate-500 md:text-sm">
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

<div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-7">
  <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500 md:text-base">
    Étape {activeStep + 1}
  </div>

  <div className="text-xl font-semibold text-slate-900 md:text-2xl">
    {steps[activeStep].title}
  </div>

  <p className="mt-3 text-lg leading-8 text-slate-700 md:text-[1.15rem] md:leading-9">
    {steps[activeStep].detail}
  </p>
</div>

{/* ===== VIDAME_REPERE_SECTION_ARTICLES_ACCUEIL ===== */}
<section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
  <div className="flex justify-center">
    <button
      type="button"
      onClick={() => setPage("blog")}
      className="group flex items-center gap-6 rounded-2xl border border-slate-200 bg-white px-10 py-8 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-white">
        <MessageCircle className="h-10 w-10" />
      </div>

      <span className="text-3xl font-bold tracking-wider text-slate-900 md:text-4xl">
        Blogue
      </span>

      <span className="text-2xl text-slate-400 transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </button>
  </div>
</section>
    </div>
  );
}

    // ===== VIDAME_REPERE_PAGE_APROPOS =====
    function APropos({ setPage }: { setPage: (page: string) => void }) {
      return (
        <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] items-start">
            <div className="w-full h-full overflow-hidden rounded-[2rem]">
              <img
                src="/monique.jpg"
                alt="Monique Provost"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <div className="space-y-6">
              <div className="text-sm uppercase tracking-[0.2em] text-slate-500">À propos</div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
                Un regard humain structuré au coeur des données complexes
              </h1>
              <p className="text-lg leading-8 text-slate-700">
                Je suis spécialisée dans le traitement de données qualitatives, à l'intersection
                du langage, de la recherche et des outils assistés par intelligence artificielle.
                Mon travail consiste à transformer des corpus complexes en matériaux fiables,
                structurés et directement exploitables pour l'analyse.
              </p>
              <p className="leading-8 text-slate-600">
                Vidame est né d'un constat simple : un bon outil ne remplace pas un bon jugement.
                Dans les environnements sensibles, la valeur ne réside pas seulement dans la vitesse
                d'exécution, mais dans la capacité à encadrer les transformations avec méthode,
                traçabilité et rigueur.
              </p>
              <p className="leading-8 text-slate-600">
                J'interviens comme un pont entre le terrain et l'analyse, en veillant à ce que
                chaque étape — de la transcription à la structuration — respecte à la fois les
                exigences scientifiques, les contraintes éthiques et les réalités opérationnelles
                des équipes.
              </p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="rounded-[2rem] border-slate-200">
              <CardHeader>
                <CardTitle>Mission</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="leading-8 text-slate-600">
                  Offrir des services linguistiques et documentaires de haute rigueur, appuyés
                  par des workflows structurés, afin d'aider les organisations à traiter leurs
                  contenus avec plus de clarté, de sécurité et de cohérence.
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-[2rem] border-slate-200">
              <CardHeader>
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="leading-8 text-slate-600">
                  Développer une pratique du langage assisté par IA qui reste profondément
                  humaine : transparente, traçable, adaptée aux contraintes réelles du terrain
                  et respectueuse de la valeur scientifique des données.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Clarté", text: "Rendre les contenus plus lisibles, plus structurés et plus utiles pour leurs destinataires." },
              { title: "Rigueur", text: "Documenter les choix, encadrer les étapes sensibles et maintenir un niveau élevé de contrôle qualité." },
              { title: "Responsabilité", text: "Faire des choix techniques qui respectent les exigences éthiques, juridiques et opérationnelles du mandat." },
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
                  Vidame s'adresse aux équipes qui veulent intégrer des outils contemporains
                  sans perdre la maîtrise de leurs données, de leurs textes et de leurs décisions.
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
              <Button className="mt-4 rounded-full" onClick={() => setPage("services")}>
                Voir les services
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // ===== VIDAME_REPERE_PAGE_SERVICES =====
    function ServicesPage({ setPage }: { setPage: (page: string) => void }) {
      const [activeTab, setActiveTab] = useState<"carte" | "pipeline">("carte");
      const [expandedService, setExpandedService] = useState<number | null>(null);

      const servicesACarte = [
        {
          icon: Languages,
          color: "bg-amber-50 text-amber-700 border-amber-200",
          accent: "border-l-amber-400",
          badge: "bg-amber-50 text-amber-700",
          title: "Traduction EN vers FR",
          subtitle: "Français canadien · Adaptation culturelle",
          description: "Traduction professionnelle de l'anglais vers le français canadien, avec révision linguistique complète, harmonisation terminologique et adaptation au registre et au public cible.",
          details: [
            "Traduction fidèle au sens et à la nuance",
            "Adaptation au vocabulaire de la recherche qualitative",
            "Harmonisation des termes clés du corpus",
            "Révision par une spécialiste bilingue",
          ],
          tag: "Service à la carte",
        },
        {
          icon: FileText,
          color: "bg-sky-50 text-sky-700 border-sky-200",
          accent: "border-l-sky-400",
          badge: "bg-sky-50 text-sky-700",
          title: "Transcription",
          subtitle: "Assistée par IA · Validée par un humain",
          description: "Transcription de verbatim assistée par intelligence artificielle, avec validation humaine systématique. Fidèle au discours réel, aux hésitations, aux nuances et au langage authentique des participants.",
          details: [
            "Transcription intégrale ou sélective selon le besoin",
            "Respect des particularités langagières",
            "Marqueurs de discours conservés",
            "Livraison dans les formats requis (.docx, .txt)",
          ],
          tag: "Service à la carte",
        },
      ];

      const pipelineSteps = [
        {
          step: "01",
          icon: FileText,
          title: "Transcription validée",
          description: "Conversion du verbatim brut en texte exploitable, avec validation humaine à chaque segment sensible.",
          color: "bg-teal-600",
        },
        {
          step: "02",
          icon: ShieldCheck,
          title: "Anonymisation conforme",
          description: "Neutralisation des identifiants personnels selon les exigences éthiques et légales en vigueur (Canada).",
          color: "bg-teal-700",
        },
        {
          step: "03",
          icon: Workflow,
          title: "Segmentation et structuration",
          description: "Organisation du corpus en unités de sens cohérentes, prêtes pour l'analyse qualitative.",
          color: "bg-teal-800",
        },
        {
          step: "04",
          icon: Lock,
          title: "Traçabilité et documentation",
          description: "Chaque opération est documentée, horodatée et traçable — pour la rigueur scientifique et les comités d'éthique.",
          color: "bg-slate-700",
        },
      ];
      return (
        <div className="min-h-screen bg-white">
          {/* HERO SECTION */}
  <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/10 to-white py-20 px-4">
       <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
         >
           <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl md:leading-[1.15]">
           Vidame intervient pour préserver l’intégrité du sens et restituer fidèlement les discours et les concepts.
         </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
           Ses opérations professionnelles comprennent des services à la carte en traduction et transcription, ainsi que la préparation des données qualitatives en amont de l’analyse.
          </p>
        </motion.div>

     <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mt-10 inline-flex gap-2 rounded-2xl border border-slate-200 bg-white/80 p-1.5 shadow-sm backdrop-blur"
    >
      <button
        onClick={() => setActiveTab("carte")}
      className="rounded-full bg-gradient-to-b from-slate-800 to-slate-950 text-white px-6 py-2 font-medium shadow-sm"
      >
        Services à la carte
      </button>
      <button
       onClick={() => setActiveTab("pipeline")}
   className="rounded-full bg-gradient-to-b from-slate-200 to-slate-300 text-slate-900 px-6 py-2 font-medium border border-slate-300 shadow-sm"
      >
        Chaine opératoire Vidame 
      </button>
    </motion.div>
  </div>
</section>

          {/* CONTENU ONGLETS */}
          <AnimatePresence mode="wait">
            {activeTab === "carte" && (
              <motion.div
                key="carte"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-5xl px-4 pt-10 pb-16"
              >
                <div className="mb-10 text-center">
                  <h2 className="text-2xl font-semibold text-slate-900">Services linguistiques à la carte</h2>
                  <p className="mt-2 text-slate-500">Commandez uniquement ce dont vous avez besoin, quand vous en avez besoin.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {servicesACarte.map((service, i) => {
                    const Icon = service.icon;
                    const isExpanded = expandedService === i;
                    return (
                      <motion.div
                        key={i}
                        layout
                        className={`rounded-3xl border bg-white shadow-sm border-l-4 ${service.accent} cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => setExpandedService(isExpanded ? null : i)}
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${service.color}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <span className={`mt-1 rounded-full px-3 py-0.5 text-xs font-medium ${service.badge}`}>
                              {service.tag}
                            </span>
                          </div>
                          <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{service.subtitle}</p>
                          <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 overflow-hidden"
                              >
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
                          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-slate-400">
                            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                            {isExpanded ? "Réduire" : "Voir les détails"}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                               </div>
                <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center">
                  <h3 className="text-xl font-semibold text-slate-900">Prêt à lancer votre projet ?</h3>
                  <p className="mt-2 text-sm text-slate-500">Obtenez un devis personnalisé en moins de 48 heures.</p>
                  <button
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    onClick={() => setPage("soumission")}
                  >
                    Obtenir un devis <ChevronRight className="h-4 w-4" />
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
      supportDefault: "Sélectionnez",
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
      supportDefault: "Select",
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
      <SectionTitle eyebrow={t.eyebrow} title={t.title} text={t.text} />

      <form
        action="https://formspree.io/f/xwvwawel"
        method="POST"
        className="mt-8 space-y-6"
      >
        <input type="hidden" name="lang" value={lang} />

        <input
          type="hidden"
          name="_redirect"
          value="https://google.com"
      />

        <div className="grid gap-4 md:grid-cols-2">
          <Input name="name" placeholder={t.name} />
          <Input name="organization" placeholder={t.org} />
        </div>

        <Input name="email" type="email" placeholder={t.email} />

        <div className="grid gap-4 md:grid-cols-2">
          <Input name="department" placeholder={t.dept} />
          <Input name="research_chair" placeholder={t.chair} />
        </div>

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

        <Button type="submit" className="mt-8 rounded-full">
          {t.submit}
        </Button>
      </form>
    </div>
  );
}
       // ===== VIDAME_REPERE_PAGE_BLOG =====
    function Blog() {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionTitle
            eyebrow="Blog"
            title="Réflexions sur les données, le langage et l'IA"
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
export default function App() {
  const [page, setPage] = useState("accueil");
  const [lang, setLang] = useState<"fr" | "en">("fr");

  return <Shell page={page} setPage={setPage} lang={lang} setLang={setLang} />;
}
