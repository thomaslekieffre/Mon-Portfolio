"use client";

import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

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

      <motion.div className="space-y-10" variants={fadeInUp}>
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading">
          OUTILS MAÎTRISÉS
        </h3>

        <div>
          <h4 className="text-primary-dark dark:text-dh font-bold text-lg mb-6 font-heading">
            FRONTEND
          </h4>
          <motion.div
            className="flex flex-wrap gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "NEXT.js", filled: true },
              { label: "React", filled: false },
              { label: "tailwindcss", filled: true },
            ].map((b) => (
              <motion.div key={b.label} variants={staggerItem}>
                <Badge label={b.label} filled={b.filled} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <h4 className="text-primary-dark dark:text-dh font-bold text-lg mb-6 font-heading">
            BACKEND
          </h4>
          <motion.div
            className="flex flex-wrap gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "supabase", filled: true },
              { label: "PostgreSQL", filled: false },
              { label: "RUST", filled: true },
              { label: "node", filled: false },
            ].map((b) => (
              <motion.div key={b.label} variants={staggerItem}>
                <Badge label={b.label} filled={b.filled} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div>
          <h4 className="text-primary-dark dark:text-dh font-bold text-lg mb-6 font-heading">
            DEVOPS
          </h4>
          <motion.div
            className="flex flex-wrap gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "docker", filled: true },
              { label: "GITHUB", filled: false },
              { label: "VPS", filled: true },
              { label: "COOLIFY", filled: false },
            ].map((b) => (
              <motion.div key={b.label} variants={staggerItem}>
                <Badge label={b.label} filled={b.filled} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="space-y-6"
        style={{ paddingTop: "3rem", marginTop: "2rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
        variants={fadeInUp}
      >
        <h3 className="text-lg font-bold text-primary dark:text-dp tracking-wider font-heading mb-8">
          LANGAGES MAÎTRISÉS
        </h3>
        <ProgressBar label="Javascript" percentage={92} />
        <ProgressBar label="Typescript" percentage={88} />
        <ProgressBar label="SQL" percentage={80} />
        <ProgressBar label="HTML" percentage={95} />
        <ProgressBar label="CSS" percentage={90} />
        <ProgressBar label="Python" percentage={15} />
        <ProgressBar label="Go" percentage={20} />
        <ProgressBar label="Rust" percentage={20} />
      </motion.div>
    </motion.div>
  );
}
