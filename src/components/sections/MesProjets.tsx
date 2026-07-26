"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { useRef, useState, useCallback } from "react";

interface ProjectProps {
  title: string;
  description: string;
  features?: string[];
  mockupSrc: string;
  mockupAlt: string;
  stack: string[];
  host?: string[];
  codeAvailable: boolean;
  repoUrl?: string;
  isFirst?: boolean;
}

function ProjectMockup({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image
          src={src}
          alt={alt}
          width={240}
          height={160}
          className="w-full sm:w-[240px] h-auto object-contain rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
}

function Project({
  title,
  description,
  features,
  mockupSrc,
  mockupAlt,
  stack,
  host,
  codeAvailable,
  repoUrl,
  isFirst = false,
}: ProjectProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={isFirst ? {} : { paddingTop: "2.5rem", marginTop: "2rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
    >
      <h3 className="text-lg font-bold text-primary-dark dark:text-dh mb-6 tracking-wider font-heading">
        {title}
      </h3>
      <div className="flex flex-col sm:flex-row gap-10">
        <ProjectMockup src={mockupSrc} alt={mockupAlt} />
        <div className="text-body dark:text-db text-base leading-relaxed space-y-4">
          <p>{description}</p>
          {features && (
            <motion.ul
              className="space-y-2.5 list-none mt-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((f, i) => (
                <motion.li key={i} variants={staggerItem}>
                  - {f}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>

      <motion.div
        className="flex flex-wrap gap-x-14 gap-y-6 mt-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div>
          <span className="text-sm font-bold text-primary dark:text-dp block mb-4 font-heading">
            STACK
          </span>
          <div className="flex flex-wrap gap-4">
            {stack.map((s, i) => (
              <motion.div key={s} variants={staggerItem}>
                <Badge label={s} filled={i % 2 === 0} />
              </motion.div>
            ))}
          </div>
        </div>
        {host && host.length > 0 && (
          <div>
            <span className="text-sm font-bold text-primary dark:text-dp block mb-4 font-heading">
              HOST
            </span>
            <div className="flex flex-wrap gap-4">
              {host.map((h, i) => (
                <motion.div key={h} variants={staggerItem}>
                  <Badge label={h} filled={i % 2 === 0} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {codeAvailable ? (
        <a
          href={repoUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary dark:text-dp text-sm underline hover:text-primary-dark dark:hover:text-dh transition-colors mt-6 font-bold"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3H3v10h10v-3M9 2h5v5M14 2L7 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Code disponible au public
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-body/50 dark:text-db/50 text-sm mt-6 font-bold">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="3" y="7" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Code non disponible au public
        </span>
      )}
    </motion.div>
  );
}

export default function MesProjets() {
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
        MES PROJETS
      </motion.h2>

      <div className="space-y-10">
        <Project
          isFirst
          title="SPEEDCUBE MASTER"
          description="Plateforme complète de speedcubing (+1800 utilisateurs). App Android live, iOS en cours, monétisation freemium Stripe. Ambitions internationales :"
          features={[
            "Timer WCA conforme avec inspection, pénalités et moyennes auto (Ao5, Ao12, Ao100)",
            "Rooms live, challenges quotidiens, WCA live et module de training complet",
            "Base d'algorithmes CFOP avec révision espacée, détection de phases et cubes GAN Bluetooth",
            "I18N complet (FR/EN), sync cloud, multi-puzzle (2x2 → 4x4+)",
          ]}
          mockupSrc="/mockup-speedcubemaster.png"
          mockupAlt="SpeedCube Master"
          stack={["NextJs", "tailwindcss", "Supabase", "Clerk", "Stripe"]}
          host={["VPS OVH + Coolify"]}
          codeAvailable={false}
        />
        <Project
          title="INADEX"
          description="Dex ultime pour Inazuma Eleven Victory Road — explore, compare et simule les stats de tous les joueurs :"
          features={[
            "5500+ joueurs synchronisés avec scaling de rareté et 15+ stats",
            "Filtres avancés, radar de stats et comparaison entre raretés",
            "Collection personnelle pour tracker ses joueurs",
            "Auth Discord via Better Auth, thème dark UX gaming",
          ]}
          mockupSrc="/mockup-inadex.png"
          mockupAlt="INAdex — Victory Road Database"
          stack={["Better Auth", "NextJs", "Tailwindcss", "Shadcn"]}
          host={["VPS", "Coolify"]}
          codeAvailable={false}
        />
        <Project
          title="CLIPFLOW"
          description="App desktop Windows de capture d'écran & assemblage vidéo. Enregistre des zones, assemble sur une timeline, exporte en MP4."
          features={[
            "Capture de zones précises (multi-moniteur, HiDPI) ou fullscreen",
            "Timeline drag & drop avec 19 transitions (fade, wipe, zoom, iris…)",
            "Preview rapide + export MP4 via FFmpeg xfade",
            "Hotkeys globaux (F9/ESC), watermark optionnel, thème clair/sombre",
          ]}
          mockupSrc="/mockup-clipflow.png"
          mockupAlt="ClipFlow"
          stack={["Tauri", "Rust", "React", "tailwindcss", "FFmpeg"]}
          codeAvailable={true}
          repoUrl="https://github.com/thomaslekieffre/ClipFlow"
        />
        <Project
          title="PORTFOLIO ZOÉ MARCHAL"
          description="Intégration du portfolio de Zoé Marchal, graphic designer — identité visuelle, UI, affiche et édition. Site vitrine animé, direction artistique forte."
          features={[
            "Hero expressif avec typo custom et illustration intégrée",
            "Sections projets (identité, UI, print) avec animations Framer Motion",
            "Responsive mobile-first, déploiement Vercel",
          ]}
          mockupSrc="/mockup-portfolio.png"
          mockupAlt="Portfolio Zoé Marchal"
          stack={["NextJs", "tailwindcss", "Framer Motion"]}
          host={["Vercel"]}
          codeAvailable={true}
          repoUrl="https://github.com/thomaslekieffre/zoemarchal-portfolio"
        />
      </div>
    </motion.div>
  );
}
