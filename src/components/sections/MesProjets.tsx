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
          title="SPEEDCUBEMASTER"
          description="Plateforme de référence française avec ambitions internationales pour le speedcubing avec fonctionnalités complètes :"
          features={[
            "Timer WCA conforme avec inspection et calcul automatique de moyennes (Ao5, Ao12, Ao100)",
            "Système de rooms en temps réel pour faire des compétitions en ligne entre amis",
            "Base de données complète d'algorithmes avec système de révision intelligente",
          ]}
          mockupSrc="/mockup-speedcubemaster.png"
          mockupAlt="SpeedCubeMaster"
          stack={["NextJs", "tailwindcss", "Supabase", "Clerk"]}
          host={["VPS chez ovh, avec coolify"]}
          codeAvailable={false}
        />
        <Project
          title="INADEX"
          description="Lorem ipsum dolor sit amet consectetur. Leo odio morbi quis at sed id gravida ultricies enim. Neque tincidunt sed nunc mauris felis velit aliquam volutpat. Neque tortor dignissim morbi vitae enim donec dictum. Leo mus felis in sit ac."
          mockupSrc="/mockup-inadex.png"
          mockupAlt="Inadex"
          stack={["Better Auth", "NextJs", "Tailwindcss", "Shadcn"]}
          host={["VPS", "Coolify"]}
          codeAvailable={true}
        />
        <Project
          title="CLIPFLOW"
          description="Outil innovant de capture d'écran intelligent pour créer des vidéos sans montage."
          features={[
            "Enregistrement de zones précises de l'écran (pas tout le bureau)",
            "Export direct en MP4 ou GIF avec plusieurs qualités (1080p, 720p, etc.)",
            "Suivi visuel automatique des touches clavier et clics souris",
            "Création de multiples clips courts avec transitions automatiques",
            "Génération insérée de vidéos complètes prêtes à publier",
          ]}
          mockupSrc="/mockup-clipflow.png"
          mockupAlt="ClipFlow"
          stack={["Rust", "Tokio", "React", "tailwindcss", "FFmpeg"]}
          codeAvailable={true}
        />
        <Project
          title="INTÉGRATION D'UN PORTFOLIO"
          description="Lorem ipsum dolor sit amet consectetur. Leo odio morbi quis at sed id gravida ultricies enim. Neque tincidunt sed nunc mauris felis velit aliquam volutpat. Neque tortor dignissim morbi vitae enim donec dictum."
          mockupSrc="/mockup-portfolio.png"
          mockupAlt="Portfolio"
          stack={["NextJs", "tailwindcss", "Supabase", "Framer Motion"]}
          host={["Vercel"]}
          codeAvailable={true}
        />
      </div>
    </motion.div>
  );
}
