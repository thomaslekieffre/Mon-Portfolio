"use client";

import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

type Level = "expert" | "avance" | "intermediaire" | "bases";

interface Skill {
  label: string;
  level: Level;
  filled?: boolean;
}

interface SkillGroup {
  title: string;
  blurb: string;
  skills: Skill[];
}

const LEVEL_META: Record<
  Level,
  { label: string; width: string; className: string }
> = {
  expert: {
    label: "Expert",
    width: "100%",
    className: "bg-primary dark:bg-dp",
  },
  avance: {
    label: "Avancé",
    width: "78%",
    className: "bg-primary/80 dark:bg-dp/80",
  },
  intermediaire: {
    label: "Intermédiaire",
    width: "55%",
    className: "bg-primary/55 dark:bg-dp/55",
  },
  bases: {
    label: "Bases",
    width: "32%",
    className: "bg-primary/35 dark:bg-dp/35",
  },
};

const languages: { label: string; level: Level; note?: string }[] = [
  { label: "TypeScript / JavaScript", level: "expert", note: "Quotidien · ~7 ans" },
  { label: "SQL", level: "avance", note: "Postgres / Supabase" },
  { label: "HTML / CSS", level: "expert" },
  { label: "C#", level: "intermediaire", note: "Unity" },
  { label: "Python", level: "intermediaire", note: "Scripts · ML-Snake" },
  { label: "Rust", level: "intermediaire", note: "Tauri / ClipFlow" },
];

const groups: SkillGroup[] = [
  {
    title: "FRONTEND",
    blurb: "UI modernes, perf et motion.",
    skills: [
      { label: "Next.js", level: "expert", filled: true },
      { label: "React", level: "expert", filled: false },
      { label: "tailwindcss", level: "expert", filled: true },
      { label: "Framer Motion", level: "avance", filled: false },
      { label: "Shadcn", level: "avance", filled: true },
    ],
  },
  {
    title: "BACKEND & DATA",
    blurb: "Auth, DB, API, monétisation.",
    skills: [
      { label: "supabase", level: "expert", filled: true },
      { label: "PostgreSQL", level: "avance", filled: false },
      { label: "Clerk", level: "avance", filled: true },
      { label: "Better Auth", level: "intermediaire", filled: false },
      { label: "node", level: "avance", filled: true },
      { label: "RUST", level: "intermediaire", filled: false },
    ],
  },
  {
    title: "DEVOPS & SHIP",
    blurb: "De la CI au VPS en prod.",
    skills: [
      { label: "docker", level: "avance", filled: true },
      { label: "COOLIFY", level: "avance", filled: false },
      { label: "VPS", level: "avance", filled: true },
      { label: "Vercel", level: "expert", filled: false },
      { label: "GITHUB", level: "expert", filled: true },
    ],
  },
  {
    title: "GAMEDEV",
    blurb: "Indie + IA appliquée au jeu.",
    skills: [
      { label: "Unity", level: "intermediaire", filled: true },
      { label: "C#", level: "intermediaire", filled: false },
      { label: "RPG Maker", level: "bases", filled: true },
    ],
  },
];

const tools = [
  "Cursor",
  "Claude Code",
  "Stripe",
  "FFmpeg",
  "Tauri",
  "Zustand",
  "Git",
];

const soft = [
  "Lead produit (SCM)",
  "Autonomie",
  "Ship rapide",
  "Communauté",
  "UX-minded",
];

function LevelBar({ level }: { level: Level }) {
  const meta = LEVEL_META[level];
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="relative flex-1 h-1.5 rounded-full bg-primary/15 dark:bg-dp/15 overflow-hidden max-w-[140px]">
        <motion.div
          className={`h-full rounded-full ${meta.className}`}
          initial={{ width: 0 }}
          whileInView={{ width: meta.width }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
      <span className="text-[0.7rem] font-bold tracking-wider uppercase text-primary dark:text-dp font-heading shrink-0 w-[7.5rem]">
        {meta.label}
      </span>
    </div>
  );
}

function SkillGroupBlock({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={index > 0 ? "pt-8 mt-2 border-t border-primary/25 dark:border-dp/25" : ""}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-5">
        <h4 className="text-primary-dark dark:text-dh font-bold text-lg font-heading tracking-wider">
          {group.title}
        </h4>
        <p className="text-sm text-body/60 dark:text-db/60">{group.blurb}</p>
      </div>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {group.skills.map((s) => (
          <motion.div key={s.label} variants={staggerItem} className="flex flex-col gap-1.5">
            <Badge label={s.label} filled={s.filled ?? false} />
            <span className="text-[0.65rem] font-bold tracking-wider uppercase text-primary/70 dark:text-dp/70 font-heading px-1">
              {LEVEL_META[s.level].label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function MesCompetences() {
  return (
    <motion.div
      className="space-y-12 py-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-primary-dark dark:text-dh tracking-wider font-heading"
        variants={fadeInUp}
      >
        MES COMPÉTENCES
      </motion.h2>

      <motion.p
        className="text-body/80 dark:text-db/80 text-base leading-relaxed -mt-6 max-w-2xl"
        variants={fadeInUp}
      >
        Stack orientée ship : Next.js / Supabase au quotidien, Rust &amp; Unity
        quand le projet le demande. Niveaux honnêtes — pas de % marketing.
      </motion.p>

      {/* LANGAGES */}
      <motion.div variants={fadeInUp} className="space-y-6">
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading">
          LANGAGES
        </h3>
        <div className="space-y-5">
          {languages.map((lang) => (
            <motion.div
              key={lang.label}
              variants={staggerItem}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
            >
              <div className="sm:w-52 shrink-0">
                <p className="text-body dark:text-db text-base font-bold">{lang.label}</p>
                {lang.note && (
                  <p className="text-xs text-body/50 dark:text-db/50 mt-0.5">{lang.note}</p>
                )}
              </div>
              <LevelBar level={lang.level} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* STACK */}
      <motion.div
        variants={fadeInUp}
        className="space-y-2"
        style={{ paddingTop: "2.5rem", marginTop: "1rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-8">
          STACK & OUTILS
        </h3>
        {groups.map((g, i) => (
          <SkillGroupBlock key={g.title} group={g} index={i} />
        ))}
      </motion.div>

      {/* TOOLING IA */}
      <motion.div
        variants={fadeInUp}
        style={{ paddingTop: "2.5rem", marginTop: "1rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-2">
          TOOLING
        </h3>
        <p className="text-sm text-body/60 dark:text-db/60 mb-6">
          Workflow IA-assisted sans sacrifier la qualité.
        </p>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {tools.map((t, i) => (
            <motion.div key={t} variants={staggerItem}>
              <Badge label={t} filled={i % 2 === 0} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* SOFT */}
      <motion.div
        variants={fadeInUp}
        style={{ paddingTop: "2.5rem", marginTop: "1rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-6">
          EN PRATIQUE
        </h3>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {soft.map((s) => (
            <motion.span
              key={s}
              variants={staggerItem}
              className="inline-flex items-center rounded-full text-sm font-bold tracking-wide border-2 border-primary dark:border-dp text-primary-dark dark:text-dh bg-primary/10 dark:bg-dp/10"
              style={{ padding: "0.35rem 0.85rem" }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
