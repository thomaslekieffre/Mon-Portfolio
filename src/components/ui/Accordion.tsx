"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Accordion({
  title,
  content,
  defaultOpen = false,
}: {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem", marginBottom: "0.5rem", borderBottom: "1px solid rgba(83, 153, 135, 0.3)" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 px-2 text-primary-dark dark:text-dh font-bold tracking-wider hover:text-body dark:hover:text-db transition-colors cursor-pointer font-heading"
      >
        <span className="text-lg">{title}</span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      <AnimatePresence initial={defaultOpen}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 px-2 text-body dark:text-db text-base leading-relaxed">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
