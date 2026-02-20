"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindows } from "@/contexts/WindowContext";
import { useSound } from "@/contexts/SoundContext";
import Image from "next/image";
import { appTitles, socialLinks } from "@/lib/constants";
import StartMenu from "@/components/StartMenu";
import { menuSlide } from "@/lib/animations";

interface TaskbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onReboot: () => void;
}

export default function Taskbar({
  darkMode,
  onToggleDarkMode,
  onReboot,
}: TaskbarProps) {
  const { windows, toggleMinimize } = useWindows();
  const { muted, toggleMute, play } = useSound();
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [clockDate, setClockDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
      setClockDate(
        now.toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStartClick = useCallback(() => {
    play("click");
    setStartOpen((prev) => !prev);
  }, [play]);

  const closeStart = useCallback(() => setStartOpen(false), []);

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {startOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[89]"
              onClick={closeStart}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed bottom-14 left-2 z-[90]"
              variants={menuSlide}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <StartMenu
                darkMode={darkMode}
                onToggleDarkMode={() => {
                  onToggleDarkMode();
                  closeStart();
                }}
                onClose={closeStart}
                onReboot={() => {
                  closeStart();
                  onReboot();
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div
        className="fixed bottom-2 left-3 right-3 h-14 z-[80] flex items-center bg-surface/90 dark:bg-ds/90 backdrop-blur-md border-2 border-primary/20 dark:border-dp/20 rounded-2xl transition-colors duration-500 shadow-lg"
        style={{ paddingLeft: 24, paddingRight: 24, gap: 16 }}
        initial={{ y: 48 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Start button */}
        <button
          onClick={handleStartClick}
          className={`h-9 px-3 rounded-lg font-heading text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            startOpen
              ? "bg-primary/25 dark:bg-dp/25 text-primary-dark dark:text-dh"
              : "hover:bg-primary/10 dark:hover:bg-dp/10 text-primary-dark dark:text-dh"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.8" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.6" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.4" />
          </svg>
          Démarrer
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-primary/15 dark:bg-dp/15 mx-1" />

        {/* Window indicators */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto min-w-0">
          {windows.map((win) => {
            const isActive = !win.minimized;
            return (
              <button
                key={win.id}
                onClick={() => {
                  play("click");
                  toggleMinimize(win.id);
                }}
                className={`h-8 px-3 rounded-md text-xs font-heading font-bold tracking-wide truncate max-w-[160px] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary/20 dark:bg-dp/20 text-primary-dark dark:text-dh"
                    : "bg-transparent text-body/60 dark:text-db/60 hover:bg-primary/10 dark:hover:bg-dp/10"
                }`}
                title={appTitles[win.appId]}
              >
                {appTitles[win.appId]}
              </button>
            );
          })}
        </div>

        {/* Social links */}
        <div className="flex items-center ml-auto" style={{ gap: 6 }}>
          {socialLinks.map((link) => (
            <a
              key={link.alt}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={link.alt}
              className="w-8 h-8 rounded-lg overflow-hidden hover:scale-110 active:scale-95 transition-transform cursor-pointer"
            >
              <Image
                src={link.src}
                alt={link.alt}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-primary/15 dark:bg-dp/15" />

        {/* System tray */}
        <div className="flex items-center gap-1">
          {/* Mute */}
          <button
            onClick={() => { play("click"); toggleMute(); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary/10 dark:hover:bg-dp/10 text-primary-dark/70 dark:text-dh/70 transition-colors cursor-pointer"
            aria-label={muted ? "Activer le son" : "Couper le son"}
            title={muted ? "Activer le son" : "Couper le son"}
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 6v4h3l4 3V3L5 6H2z" fill="currentColor"/><path d="M13 5l-4 6M9 5l4 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 6v4h3l4 3V3L5 6H2z" fill="currentColor"/><path d="M11 5.5c.8.8.8 3.2 0 5M13 3.5c1.8 1.8 1.8 7.2 0 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            )}
          </button>

          {/* Dark mode */}
          <button
            onClick={() => { play("click"); onToggleDarkMode(); }}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-primary/10 dark:hover:bg-dp/10 text-primary-dark/70 dark:text-dh/70 transition-colors cursor-pointer"
            aria-label={darkMode ? "Mode clair" : "Mode sombre"}
            title={darkMode ? "Mode clair" : "Mode sombre"}
          >
            {darkMode ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" fill="currentColor"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M12.2 3.8l-1.4 1.4M5.2 10.8l-1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 9.5A5.5 5.5 0 016.5 3c0-.5.1-1 .2-1.5A6 6 0 1013.5 10c-.2 0-.3-.3-.5-.5z" fill="currentColor"/></svg>
            )}
          </button>

          {/* Separator */}
          <div className="w-px h-6 bg-primary/15 dark:bg-dp/15 mx-0.5" />

          {/* Clock */}
          <div className="text-right px-2 select-none">
            <div className="text-xs font-heading text-primary-dark/60 dark:text-dh/60 leading-tight">
              {clock}
            </div>
            <div className="text-[10px] text-primary-dark/40 dark:text-dh/40 leading-tight">
              {clockDate}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
