"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ProgressBar({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="space-y-2" ref={ref}>
      <div className="flex items-center justify-between">
        <span className="text-body dark:text-db text-base font-bold">{label}</span>
        <motion.span
          className="text-primary dark:text-dp text-sm font-bold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="relative w-full h-[8px]">
        <div className="absolute inset-0 bg-primary/15 dark:bg-dp/15 rounded-full" />
        <motion.div
          className="absolute top-0 left-0 h-full bg-primary/40 dark:bg-dp/40 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-primary dark:bg-dp rounded-full shadow-sm"
          initial={{ left: 0, marginLeft: "-7px" }}
          animate={isInView ? { left: `${percentage}%` } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        />
      </div>
    </div>
  );
}
