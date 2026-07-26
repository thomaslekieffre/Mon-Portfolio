"use client";

import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface SkillGroup {
  title: string;
  blurb: string;
  skills: { label: string; filled?: boolean }[];
}

const languages = [
  "TypeScript",
  "JavaScript",
  "SQL",
  "HTML",
  "CSS",
  "C#",
  "Python",
  "Rust",
];

const groups: SkillGroup[] = [
  {
    title: "FRONTEND",
    blurb: "UI modernes, perf et motion.",
    skills: [
      { label: "Next.js", filled: true },
      { label: "React", filled: false },
      { label: "tailwindcss", filled: true },
      { label: "Framer Motion", filled: false },
      { label: "Shadcn", filled: true },
    ],
  },
  {
    title: "BACKEND & DATA",
    blurb: "Auth, DB, API, monétisation.",
    skills: [
      { label: "supabase", filled: true },
      { label: "PostgreSQL", filled: false },
      { label: "Clerk", filled: true },
      { label: "Better Auth", filled: false },
      { label: "node", filled: true },
      { label: "RUST", filled: false },
    ],
  },
  {
    title: "DEVOPS & SHIP",
    blurb: "De la CI au VPS en prod.",
    skills: [
      { label: "docker", filled: true },
      { label: "COOLIFY", filled: false },
      { label: "VPS", filled: true },
      { label: "Vercel", filled: false },
      { label: "GITHUB", filled: true },
    ],
  },
  {
    title: "GAMEDEV",
    blurb: "Indie + IA appliquée au jeu.",
    skills: [
      { label: "Unity", filled: true },
      { label: "C#", filled: false },
      { label: "RPG Maker", filled: true },
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

function SkillGroupBlock({ group, index }: { group: SkillGroup; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={index > 0 ? "pt-10 mt-4 border-t border-primary/25 dark:border-dp/25" : ""}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-6">
        <h4 className="text-primary-dark dark:text-dh font-bold text-lg font-heading tracking-wider">
          {group.title}
        </h4>
        <p className="text-sm text-body/60 dark:text-db/60">{group.blurb}</p>
      </div>
      <motion.div
        className="flex flex-wrap gap-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {group.skills.map((s) => (
          <motion.div key={s.label} variants={staggerItem}>
            <Badge label={s.label} filled={s.filled ?? false} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function MesCompetences() {
  return (
    <motion.div
      className="space-y-14 py-4"
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
        quand le projet le demande.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-6">
          LANGAGES
        </h3>
        <motion.div
          className="flex flex-wrap gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {languages.map((lang, i) => (
            <motion.div key={lang} variants={staggerItem}>
              <Badge label={lang} filled={i % 2 === 0} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        style={{ paddingTop: "2.5rem", marginTop: "0.5rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-8">
          STACK & OUTILS
        </h3>
        {groups.map((g, i) => (
          <SkillGroupBlock key={g.title} group={g} index={i} />
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        style={{ paddingTop: "2.5rem", marginTop: "0.5rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-2">
          TOOLING
        </h3>
        <p className="text-sm text-body/60 dark:text-db/60 mb-6">
          Workflow IA-assisted sans sacrifier la qualité.
        </p>
        <motion.div
          className="flex flex-wrap gap-4"
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

      <motion.div
        variants={fadeInUp}
        style={{ paddingTop: "2.5rem", marginTop: "0.5rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-6">
          EN PRATIQUE
        </h3>
        <motion.div
          className="flex flex-wrap gap-4"
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
