"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FolderIcon from "@/components/FolderIcon";
import Taskbar from "@/components/Taskbar";
import WindowRenderer from "@/components/WindowRenderer";
import ParticleBackground, { useParticleToggle } from "@/components/ParticleBackground";
import NotificationStack from "@/components/Notification";
import { SoundProvider, useSound } from "@/contexts/SoundContext";
import { WindowProvider, useWindows } from "@/contexts/WindowContext";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useNotifications } from "@/hooks/useNotifications";
import { folders, type Section, DOUBLE_CLICK_DELAY, TASKBAR_BOTTOM_PADDING, BOOT_FRAME_INTERVAL, BOOT_FRAMES } from "@/lib/constants";
import {
  folderEntrance,
  titleEntrance,
  subtitleEntrance,
  hintVariants,
  toastVariants,
  menuSlide,
} from "@/lib/animations";

/* ============================
   BOOT SCREEN
   ============================ */
function BootScreen({
  progress,
  fading,
}: {
  progress: number;
  fading: boolean;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-mint-900 flex flex-col items-center justify-center gap-3"
      initial={{ opacity: 1 }}
      animate={fading ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl sm:text-4xl font-heading text-mint-100 tracking-[0.3em]">
        THOMAS LEKIEFFRE
      </h2>
      <p className="text-mint-400 text-sm tracking-widest mb-8">
        Développeur Full-Stack
      </p>
      <div className="w-56 h-[3px] bg-mint-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ============================
   KONAMI OVERLAY
   ============================ */
// Pre-generated confetti data (deterministic, no Math.random in render)
const CONFETTI_DATA = (() => {
  let seed = 42;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  return Array.from({ length: 30 }, () => ({
    hue: rand() * 360,
    left: rand() * 100,
    top: rand() * 100,
    dx: rand() * 200 - 100,
    dy: rand() * 200 - 100,
    delay: rand() * 0.5,
  }));
})();

function KonamiOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]" />
      <motion.div
        className="text-center relative z-10"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="text-6xl sm:text-8xl mb-4">🎮</div>
        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-primary-dark dark:text-dh tracking-wider">
          KONAMI CODE !
        </h2>
        <p className="text-body/60 dark:text-db/60 text-sm mt-2">
          ↑↑↓↓←→←→BA - Tu as trouvé le secret !
        </p>
      </motion.div>
      {CONFETTI_DATA.map((c, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `hsl(${c.hue}, 70%, 60%)`,
            left: `${c.left}%`,
            top: `${c.top}%`,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1, 0],
            y: [0, c.dy],
            x: [0, c.dx],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: c.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ============================
   DESKTOP (inner component with contexts)
   ============================ */
function Desktop() {
  // Boot
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootFading, setBootFading] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);

  // Desktop state
  const [darkMode, setDarkMode] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedName, setTypedName] = useState("");
  const [showHint, setShowHint] = useState(false);

  // Folder drag state
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folderOffsets, setFolderOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
    moved: boolean;
  } | null>(null);
  const lastClickRef = useRef<{ id: string; time: number } | null>(null);
  const singleClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Contexts & hooks
  const { openWindow } = useWindows();
  const { play } = useSound();
  const { activated: konamiActive } = useKonamiCode();
  const { notifications, push: pushNotif, dismiss: dismissNotif } = useNotifications();
  const particles = useParticleToggle();


  // Visitor counter
  const [visitCount, setVisitCount] = useState(0);

  /* ---- Boot sequence ---- */
  const runBoot = useCallback(() => {
    setBooting(true);
    setBootProgress(0);
    setBootFading(false);
    setDesktopReady(false);
    setTypedName("");
    setShowHint(false);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setBootProgress((p) => Math.min(p + Math.random() * 12 + 4, 100));
      if (frame >= BOOT_FRAMES) {
        clearInterval(interval);
        setBootProgress(100);
        setTimeout(() => setBootFading(true), 400);
        setTimeout(() => {
          setBooting(false);
          setDesktopReady(true);
        }, 1100);
      }
    }, BOOT_FRAME_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = runBoot();
    return cleanup;
  }, [runBoot]);

  /* ---- Typing effect ---- */
  useEffect(() => {
    if (!desktopReady) return;
    const fullName = "LEKIEFFRE Thomas";
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedName(fullName.slice(0, i));
      if (i >= fullName.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [desktopReady]);

  /* ---- Boot sound ---- */
  useEffect(() => {
    if (!desktopReady) return;
    play("boot");
  }, [desktopReady, play]);

  /* ---- Dark mode ---- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* ---- Hint auto-show/hide ---- */
  useEffect(() => {
    if (!desktopReady) return;
    const showTimer = setTimeout(() => setShowHint(true), 1200);
    const hideTimer = setTimeout(() => setShowHint(false), 11200);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [desktopReady]);

  /* ---- Visitor counter ---- */
  useEffect(() => {
    const count = parseInt(localStorage.getItem("portfolio-visits") || "0", 10) + 1;
    localStorage.setItem("portfolio-visits", String(count));
    setVisitCount(count);
  }, []);

  /* ---- Welcome notification ---- */
  useEffect(() => {
    if (!desktopReady) return;
    const timer = setTimeout(() => {
      pushNotif("Bienvenue !", visitCount > 1
        ? `C'est votre ${visitCount}ème visite. Heureux de vous revoir !`
        : "Cliquez sur un dossier pour l'ouvrir."
      );
    }, 2500);
    return () => clearTimeout(timer);
  }, [desktopReady, pushNotif, visitCount]);

  /* ---- Konami sound ---- */
  useEffect(() => {
    if (konamiActive) play("konami");
  }, [konamiActive, play]);

  /* ---- Parallax ---- */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  /* ---- Context menu ---- */
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 260),
    });
  }, []);

  /* ---- Drag handlers (desktop only) ---- */
  const handleDragStart = (id: string, e: React.PointerEvent) => {
    const offset = folderOffsets[id] || { x: 0, y: 0 };
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
      moved: false,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {
      console.warn("setPointerCapture failed:", err);
    }
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragRef.current.moved = true;
    if (dragRef.current.moved) {
      const { id, offsetX, offsetY } = dragRef.current;
      setFolderOffsets((prev) => ({
        ...prev,
        [id]: { x: offsetX + dx, y: offsetY + dy },
      }));
    }
  };

  const handleDragEnd = (section: Section) => {
    if (dragRef.current && !dragRef.current.moved) {
      const now = Date.now();
      const last = lastClickRef.current;
      if (last && last.id === section && now - last.time < DOUBLE_CLICK_DELAY) {
        // Double click: open immediately, cancel pending single-click timer
        if (singleClickTimerRef.current) {
          clearTimeout(singleClickTimerRef.current);
          singleClickTimerRef.current = null;
        }
        play("open");
        openWindow(section);
        setSelectedFolder(null);
        lastClickRef.current = null;
      } else {
        // First click: select and schedule open after 400ms
        play("click");
        setSelectedFolder(section);
        lastClickRef.current = { id: section, time: now };
        if (singleClickTimerRef.current) {
          clearTimeout(singleClickTimerRef.current);
        }
        singleClickTimerRef.current = setTimeout(() => {
          play("open");
          openWindow(section);
          setSelectedFolder(null);
          lastClickRef.current = null;
          singleClickTimerRef.current = null;
        }, DOUBLE_CLICK_DELAY);
      }
    }
    dragRef.current = null;
  };

  // Mobile folder click handler (single or double click opens)
  const mobileLastClickRef = useRef<{ id: string; time: number } | null>(null);
  const mobileSingleClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMobileFolderClick = (section: Section) => {
    const now = Date.now();
    const last = mobileLastClickRef.current;
    if (last && last.id === section && now - last.time < DOUBLE_CLICK_DELAY) {
      // Double tap: open immediately
      if (mobileSingleClickTimerRef.current) {
        clearTimeout(mobileSingleClickTimerRef.current);
        mobileSingleClickTimerRef.current = null;
      }
      play("open");
      openWindow(section);
      mobileLastClickRef.current = null;
    } else {
      // First tap: select, schedule open after 400ms
      play("click");
      setSelectedFolder(section);
      mobileLastClickRef.current = { id: section, time: now };
      if (mobileSingleClickTimerRef.current) {
        clearTimeout(mobileSingleClickTimerRef.current);
      }
      mobileSingleClickTimerRef.current = setTimeout(() => {
        play("open");
        openWindow(section);
        setSelectedFolder(null);
        mobileLastClickRef.current = null;
        mobileSingleClickTimerRef.current = null;
      }, DOUBLE_CLICK_DELAY);
    }
  };

  const handleReboot = useCallback(() => {
    runBoot();
  }, [runBoot]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <>
      {/* ===== BOOT SCREEN ===== */}
      <AnimatePresence>
        {booting && <BootScreen progress={bootProgress} fading={bootFading} />}
      </AnimatePresence>

      {/* ===== KONAMI OVERLAY ===== */}
      <AnimatePresence>
        {konamiActive && <KonamiOverlay />}
      </AnimatePresence>

      {/* ===== PARTICLES ===== */}
      <ParticleBackground enabled={particles.enabled} darkMode={darkMode} />



      {/* ===== DESKTOP ===== */}
      <div
        className="h-screen w-screen grid-bg relative overflow-hidden flex flex-col transition-colors duration-500"
        onMouseMove={handleMouseMove}
        onContextMenu={handleContextMenu}
        onClick={() => {
          setSelectedFolder(null);
          setContextMenu(null);
        }}
        style={{
          backgroundPosition: `${mousePos.x * 5}px ${mousePos.y * 5}px`,
          paddingBottom: `${TASKBAR_BOTTOM_PADDING}px`,
        }}
      >
        <div className="flex-1 relative">
          {/* PORTFOLIO title + name */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.h1
              className="text-3xl sm:text-7xl md:text-8xl font-bold text-primary/40 dark:text-dp/30 tracking-[0.2em] select-none font-heading group"
              variants={titleEntrance}
              initial="hidden"
              animate={desktopReady ? "visible" : "hidden"}
              style={{
                textShadow: darkMode
                  ? "0 0 60px rgba(83, 153, 135, 0.2)"
                  : "0 0 40px rgba(83, 153, 135, 0.1)",
              }}
            >
              <span className="hover:animate-[glitch_0.3s_ease_infinite] inline-block">
                PORTFOLIO
              </span>
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-primary/30 dark:text-dp/25 tracking-[0.35em] select-none font-heading"
              variants={subtitleEntrance}
              initial="hidden"
              animate={desktopReady ? "visible" : "hidden"}
              style={{ marginTop: "0.75rem" }}
            >
              {typedName}
              {typedName.length < 16 && (
                <span className="animate-pulse">|</span>
              )}
            </motion.p>

            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  className="font-heading pointer-events-none"
                  variants={hintVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ marginTop: "2.5rem" }}
                >
                  <div
                    className="hint-box"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      background: "rgba(83, 153, 135, 0.14)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(83, 153, 135, 0.25)",
                      borderRadius: "1rem",
                      padding: "0.7rem 1.6rem",
                      color: "rgba(35, 80, 70, 0.85)",
                      fontSize: "0.72rem",
                      letterSpacing: "0.14em",
                      boxShadow: "0 2px 16px rgba(83, 153, 135, 0.12)",
                    }}
                  >
                    <span className="flex items-center" style={{ gap: "0.4rem" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <rect x="4" y="2" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="8" y1="5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      CLIC / DOUBLE-CLIC
                    </span>
                    <span style={{ opacity: 0.35 }}>·</span>
                    <span className="flex items-center" style={{ gap: "0.4rem" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M5 10L8 4L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 13L8 10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      GLISSER
                    </span>
                    <span style={{ opacity: 0.35 }}>·</span>
                    <span className="flex items-center" style={{ gap: "0.4rem" }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 7h4M8 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      CLIC DROIT
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ===== MOBILE FOLDERS (grid) ===== */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-8 px-8 sm:hidden">
            {folders.map((f, i) => (
              <motion.div
                key={f.id}
                variants={folderEntrance}
                initial="hidden"
                animate={desktopReady ? "visible" : "hidden"}
                custom={i}
                className={`flex justify-center ${
                  selectedFolder === f.id
                    ? "drop-shadow-[0_0_12px_rgba(83,153,135,0.4)]"
                    : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <FolderIcon
                  label={f.label}
                  onClick={() => handleMobileFolderClick(f.id)}
                  isOpen={false}
                />
              </motion.div>
            ))}
          </div>

          {/* ===== DESKTOP FOLDERS (absolute, draggable) ===== */}
          <div className="hidden sm:block">
            {folders.map((f, i) => {
              const offset = folderOffsets[f.id] || { x: 0, y: 0 };
              const isDragging = dragRef.current?.id === f.id;
              const isSelected = selectedFolder === f.id;
              return (
                <motion.div
                  key={f.id}
                  className={`absolute select-none ${isDragging ? "z-40" : "z-[1]"} ${
                    isSelected
                      ? "drop-shadow-[0_0_12px_rgba(83,153,135,0.4)]"
                      : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={
                    desktopReady
                      ? { opacity: 1, scale: 1, x: offset.x, y: offset.y }
                      : { opacity: 0, scale: 0.75 }
                  }
                  transition={
                    isDragging
                      ? { duration: 0 }
                      : { delay: i * 0.15 + 0.2, duration: 0.7, ease: "easeOut" }
                  }
                  style={{
                    top: f.top,
                    left: f.left,
                    right: f.right,
                    cursor: isDragging ? "grabbing" : "pointer",
                  }}
                  onPointerDown={(e) => handleDragStart(f.id, e)}
                  onPointerMove={handleDragMove}
                  onPointerUp={() => handleDragEnd(f.id)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FolderIcon label={f.label} isOpen={false} />
                </motion.div>
              );
            })}
          </div>

          {/* ===== TOAST (welcome) ===== */}
          <AnimatePresence>
            {desktopReady && (
              <motion.div
                className="absolute font-heading text-xs tracking-wider pointer-events-none"
                variants={toastVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  right: "2rem",
                  top: "1.5rem",
                  background: "rgba(83, 153, 135, 0.15)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(83, 153, 135, 0.25)",
                  borderRadius: "0.75rem",
                  padding: "0.6rem 1.2rem",
                  color: "rgba(35, 80, 75, 0.9)",
                  boxShadow: "0 4px 20px rgba(83, 153, 135, 0.15)",
                }}
                onAnimationComplete={() => {
                  // Auto-dismiss after 4s
                  setTimeout(() => setDesktopReady((prev) => prev), 4000);
                }}
              >
                Bienvenue sur mon portfolio
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ===== CONTEXT MENU ===== */}
        <AnimatePresence>
          {contextMenu && (
            <>
              <motion.div
                className="fixed inset-0 z-[59]"
                onClick={() => setContextMenu(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed z-[60] bg-surface/95 dark:bg-ds/95 backdrop-blur-md border-2 border-primary/20 dark:border-dp/20 rounded-xl shadow-2xl p-2 min-w-[200px] transition-colors duration-500"
                style={{ top: contextMenu.y, left: contextMenu.x }}
                variants={menuSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    window.location.reload();
                    setContextMenu(null);
                  }}
                >
                  Actualiser
                </button>
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    toggleDarkMode();
                    setContextMenu(null);
                  }}
                >
                  {darkMode ? "☀ Mode clair" : "☾ Mode sombre"}
                </button>
                <div className="border-t border-primary/15 dark:border-dp/15 my-1 mx-2" />
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    particles.toggle();
                    setContextMenu(null);
                  }}
                >
                  {particles.enabled ? "✕ Désactiver particules" : "✧ Particules flottantes"}
                </button>
                <div className="border-t border-primary/15 dark:border-dp/15 my-1 mx-2" />
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    play("open");
                    openWindow("terminal");
                    setContextMenu(null);
                  }}
                >
                  Ouvrir le terminal
                </button>
                <button
                  className="w-full text-left px-4 py-2.5 text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    openWindow("apropos");
                    setContextMenu(null);
                  }}
                >
                  À propos de ce portfolio
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ===== WINDOWS ===== */}
        <WindowRenderer />

        {/* ===== NOTIFICATIONS ===== */}
        <NotificationStack notifications={notifications} onDismiss={dismissNotif} />

        {/* ===== TASKBAR ===== */}
        <Taskbar
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onReboot={handleReboot}
        />
      </div>
    </>
  );
}

/* ============================
   MAIN PAGE (with providers)
   ============================ */
export default function Home() {
  return (
    <SoundProvider>
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </SoundProvider>
  );
}
