"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function APropos() {
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
        À PROPOS
      </motion.h2>
      <motion.div className="flex flex-col sm:flex-row gap-10" variants={fadeInUp}>
        <div className="flex-shrink-0 flex justify-center">
          <Image
            src="/avata.png"
            alt="Thomas Lekieffre"
            width={170}
            height={190}
            className="rounded-xl object-cover"
            priority
          />
        </div>
        <div className="text-body dark:text-db text-base leading-relaxed space-y-6">
          <p>
            Je m&apos;appelle Thomas Lekieffre, j&apos;ai 17 ans. Actuellement
            en terminale avec spécialité NSI dans les Hauts-de-France, je me
            forme au développement full-stack en autodidacte depuis plusieurs
            années. Je travaille aussi bien sur des applications web modernes que
            mobiles, de l&apos;architecture backend à l&apos;expérience
            utilisateur. J&apos;aime créer des outils pour des communautés
            passionnées, tout en sachant m&apos;adapter à des projets techniques
            complexes et structurés.
          </p>
          <p>
            Après le lycée, je souhaite intégrer l&apos;École IT de Valenciennes
            afin d&apos;approfondir mes compétences techniques et de faire
            évoluer cette démarche vers un cadre professionnel structuré, avec
            l&apos;objectif de poursuivre jusqu&apos;au Bac+5.
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={fadeInUp}
        style={{ paddingTop: "3rem", marginTop: "2rem", borderTop: "1px solid rgba(83, 153, 135, 0.3)" }}
      >
        <h3 className="text-lg font-bold text-primary-dark dark:text-dh mb-6 tracking-wider font-heading">
          CENTRES D&apos;INTÉRÊT
        </h3>
        <motion.div
          className="flex flex-wrap gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {["Speedcubing", "Développement", "Basketball"].map((interest) => (
            <motion.span
              key={interest}
              variants={staggerItem}
              className="inline-flex items-center rounded-full text-sm font-bold tracking-wide border-2 border-primary dark:border-dp text-primary-dark dark:text-dh bg-primary/10 dark:bg-dp/10"
              style={{ padding: "0.35rem 0.85rem" }}
            >
              {interest}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
