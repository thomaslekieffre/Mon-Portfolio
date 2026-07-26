"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface TimelineEntry {
  date: string;
  title: string;
  place?: string;
  description?: string;
  items?: string[];
  tag?: string;
}

const education: TimelineEntry[] = [
  {
    date: "Sept. 2026 →",
    title: "École d'informatique",
    description: "Entrée prévue — formation Bac +5, en parallèle des projets.",
    tag: "À venir",
  },
  {
    date: "2025 — 2026",
    title: "Terminale Générale",
    place: "Spécialité NSI",
    description: "Lycée — informatique, algo, bases de données.",
  },
  {
    date: "2020 — Présent",
    title: "Autodidacte",
    description: "Web avancé (JS/TS), game design (Unity / RPG Maker), Python, C#, Rust.",
    tag: "Continu",
  },
];

const experience: TimelineEntry[] = [
  {
    date: "2020 — Présent",
    title: "Développeur Fullstack",
    place: "Freelance & projets perso",
    description: "~7 ans en JS/TS. Apps web/mobile, SaaS, self-hosting. Workflow IA (Cursor / Claude Code).",
    items: [
      "Speedcube Master — +1800 users, Android live, iOS en cours, freemium Stripe",
      "Zone Tactics, NoteFlow, Lego Tracker, ClipFlow, INAdex…",
      "Stack récurrente : Next.js · Supabase · Clerk · Coolify / OVH",
    ],
    tag: "Principal",
  },
  {
    date: "2022 — Présent",
    title: "Développeur de jeux — Indie",
    description: "Unity (C#) + IA appliquée au gaming, prototypes RPG Maker.",
    items: [
      "Moteur Deep Q-Learning pour Snake (ML-Snake)",
      "Exploration game design & systèmes de jeu",
    ],
  },
  {
    date: "2024 — Présent",
    title: "Créateur de contenu — Ici Thomas",
    place: "YouTube @icithomas",
    description: "Chaîne en relance + contenu dédié aux projets (SCM, etc.).",
  },
  {
    date: "Fév. 2023 & Juin 2024",
    title: "Stage — Mabéo Industries",
    place: "Maintenance / IoT",
    items: [
      "Dashboard de suivi des énergies",
      "Maintenance des IoT",
    ],
  },
];

function DateBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full text-xs font-bold bg-primary dark:bg-dp text-white tracking-wide font-heading"
      style={{ padding: "0.3rem 0.75rem" }}
    >
      {children}
    </span>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block rounded-full text-[0.65rem] font-bold tracking-wider border border-primary/40 dark:border-dp/40 text-primary dark:text-dp uppercase"
      style={{ padding: "0.15rem 0.55rem" }}
    >
      {children}
    </span>
  );
}

function Timeline({ entries, label }: { entries: TimelineEntry[]; label: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="text-lg font-bold text-primary-dark dark:text-dh tracking-wider font-heading mb-8">
        {label}
      </h3>

      <div className="relative pl-6 sm:pl-8">
        <div
          className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-primary/30 dark:bg-dp/30"
          aria-hidden
        />

        <div className="space-y-10">
          {entries.map((entry, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative">
              <span
                className="absolute -left-6 sm:-left-8 top-1.5 w-3.5 h-3.5 rounded-full bg-primary dark:bg-dp ring-4 ring-surface dark:ring-ds"
                aria-hidden
              />
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <DateBadge>{entry.date}</DateBadge>
                {entry.tag && <Tag>{entry.tag}</Tag>}
              </div>
              <p className="text-base text-body dark:text-db font-bold">{entry.title}</p>
              {entry.place && (
                <p className="mt-0.5 text-sm text-primary dark:text-dp font-heading tracking-wide">
                  {entry.place}
                </p>
              )}
              {entry.description && (
                <p className="mt-2 text-base text-body/80 dark:text-db/80 leading-relaxed">
                  {entry.description}
                </p>
              )}
              {entry.items && (
                <ul className="list-none mt-3 space-y-1.5 text-base text-body dark:text-db">
                  {entry.items.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-primary dark:text-dp shrink-0">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function MonParcours() {
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
        MON PARCOURS
      </motion.h2>

      <motion.p
        className="text-body/80 dark:text-db/80 text-base leading-relaxed -mt-6 max-w-2xl"
        variants={fadeInUp}
      >
        Autodidacte depuis 2020, je mène des projets live (SCM, SaaS, outils desktop)
        tout en préparant une entrée en école d&apos;informatique.
      </motion.p>

      <Timeline entries={experience} label="EXPÉRIENCE" />
      <Timeline entries={education} label="FORMATION" />

      <motion.div
        variants={fadeInUp}
        className="flex flex-wrap gap-3"
        style={{ paddingTop: "0.5rem" }}
      >
        {[
          "Ouvert collabs / freelance",
          "Lead produit SCM",
          "Self-hosting & ship",
        ].map((s) => (
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

      <motion.div variants={fadeInUp}>
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
