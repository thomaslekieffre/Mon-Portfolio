"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function DateBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full text-sm font-bold bg-primary dark:bg-dp text-white" style={{ padding: "0.35rem 0.85rem" }}>
      {children}
    </span>
  );
}

interface TimelineEntry {
  date: string;
  title: string;
  description?: string;
  items?: string[];
}

const education: TimelineEntry[] = [
  { date: "2025 - 2026", title: "Terminale Générale - Spécialité NSI (Informatique)" },
  { date: "Sept. 2026 →", title: "École IT de Valenciennes - Formation Bac +5 (Cybersécurité / IA)" },
  { date: "2020 - Présent", title: "Autodidacte — Web (JS/TS), Unity/C#, Rust, Python" },
];

const experience: TimelineEntry[] = [
  {
    date: "2020 - Présent",
    title: "Développeur Fullstack — Freelance & projets perso",
    description: "Apps web & mobile, SaaS, workflow IA (Cursor / Claude Code)",
    items: [
      "Speedcube Master (+1800 users) — plateforme speedcubing full-stack",
      "Zone Tactics, NoteFlow, Lego Tracker, ClipFlow, INAdex…",
      "Self-hosting OVH + Coolify, Stripe, Clerk, Supabase",
    ],
  },
  {
    date: "2022 - Présent",
    title: "Développeur de jeux — Indie",
    items: [
      "Unity (C#) + concepts IA appliqués au gaming",
      "Moteur Deep Q-Learning pour Snake (ML-Snake)",
      "Prototypes RPG Maker pour explorer le game design",
    ],
  },
  {
    date: "2024 - Présent",
    title: "Créateur de contenu — Ici Thomas",
    description: "Chaîne YouTube @icithomas + contenu projets (SCM, etc.)",
  },
  {
    date: "Février 2023 & Juin 2024",
    title: "Mabéo Industries",
    description: "Stage avec le responsable de maintenance",
    items: [
      "Dashboard de suivi des énergies de l'entreprise",
      "Maintenance des IoT",
    ],
  },
];

function Timeline({ entries, label }: { entries: TimelineEntry[]; label: string }) {
  return (
    <motion.div
      className="relative"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="text-lg font-bold text-primary-dark dark:text-dh tracking-wider font-heading mb-8">
        {label}
      </h3>

      <div className="space-y-8">
        {entries.map((entry, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
          >
            <DateBadge>{entry.date}</DateBadge>
            <p className="mt-3 text-base text-body dark:text-db font-bold">{entry.title}</p>
            {entry.description && (
              <p className="mt-2 text-base text-body dark:text-db">{entry.description}</p>
            )}
            {entry.items && (
              <ul className="list-none mt-3 space-y-2 text-base text-body dark:text-db">
                {entry.items.map((item, j) => (
                  <li key={j}>- {item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MonParcours() {
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
        MON PARCOURS
      </motion.h2>

      <Timeline entries={education} label="PARCOURS SCOLAIRE" />
      <Timeline entries={experience} label="PARCOURS PROFESSIONNEL" />

      <motion.div variants={fadeInUp} style={{ paddingTop: "1.5rem" }}>
        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-primary dark:bg-dp text-white text-sm font-bold tracking-wide hover:bg-primary-dark dark:hover:bg-mint-600 transition-colors"
          style={{ padding: "0.5rem 1.25rem" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Télécharger mon CV
        </a>
      </motion.div>
    </motion.div>
  );
}
