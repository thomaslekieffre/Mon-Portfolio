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
            Je m&apos;appelle Thomas Lekieffre, j&apos;ai 17 ans. Basé à
            Valenciennes, actuellement en terminale NSI, je code en autodidacte
            depuis ~7 ans (JS/TS surtout). Full-stack web &amp; mobile : Next.js,
            Supabase, apps natives — de l&apos;archi backend à l&apos;UX. Je
            construis des outils pour des communautés passionnées, dont{" "}
            <strong>Speedcube Master</strong> (+1800 users), tout en menant des
            projets SaaS et indies plus techniques.
          </p>
          <p>
            Rentrée 2026 : école d&apos;informatique (École IT Valenciennes) pour
            structurer ça jusqu&apos;au Bac+5, tout en faisant grandir SCM et mes
            projets en parallèle. Ouvert aux collabs / missions freelance.
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
          {["Speedcubing", "Développement", "Jeux vidéo", "Basketball", "Création de contenu"].map((interest) => (
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
