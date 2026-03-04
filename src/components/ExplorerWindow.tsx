"use client";

import { type ReactNode, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { windowOpen } from "@/lib/animations";
import { useSound } from "@/contexts/SoundContext";
import type { WindowState } from "@/hooks/useWindowManager";

interface ExplorerWindowProps {
  children: ReactNode;
  title: string;
  windowState: WindowState;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition: (pos: { x: number; y: number }) => void;
  taskbarHeight: number;
  isMobile?: boolean;
}

export default function ExplorerWindow({
  children,
  title,
  windowState,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  taskbarHeight,
  isMobile = false,
}: ExplorerWindowProps) {
  const { play } = useSound();
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    play("close");
    onClose();
  }, [onClose, play]);

  const handleMinimize = useCallback(() => {
    play("minimize");
    onMinimize();
  }, [onMinimize, play]);

  const handleMaximize = useCallback(() => {
    play("maximize");
    onMaximize();
  }, [onMaximize, play]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleTitleBarPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Don't start drag if clicking on a button
      if ((e.target as HTMLElement).closest("button")) return;
      if (windowState.maximized || isMobile) return;
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: windowState.position.x,
        posY: windowState.position.y,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [windowState.maximized, windowState.position, onFocus, isMobile]
  );

  const handleTitleBarPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      onUpdatePosition({
        x: dragRef.current.posX + dx,
        y: dragRef.current.posY + dy,
      });
    },
    [onUpdatePosition]
  );

  const handleTitleBarPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  if (windowState.minimized) return null;

  const isMax = windowState.maximized || isMobile;

  const style: React.CSSProperties = isMax
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: taskbarHeight,
        zIndex: windowState.zIndex,
      }
    : {
        position: "absolute",
        left: windowState.position.x,
        top: windowState.position.y,
        width: Math.min(windowState.size.width, window?.innerWidth ? window.innerWidth - 40 : 900),
        maxHeight: `calc(100vh - ${taskbarHeight + 20}px)`,
        zIndex: windowState.zIndex,
      };

  return (
    <motion.div
      ref={windowRef}
      variants={windowOpen}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={style}
      className={`flex flex-col ${isMax ? "" : "rounded-2xl"}`}
      onPointerDown={onFocus}
      role="dialog"
      aria-modal="false"
      aria-label={title}
    >
      {/* Title bar */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 bg-primary dark:bg-dp border-t-[4px] border-x-[4px] border-primary dark:border-dp transition-colors duration-500 select-none ${
          isMax ? "" : "rounded-t-2xl"
        } ${!isMax ? "cursor-grab active:cursor-grabbing" : ""}`}
        onPointerDown={handleTitleBarPointerDown}
        onPointerMove={handleTitleBarPointerMove}
        onPointerUp={handleTitleBarPointerUp}
        onDoubleClick={handleMaximize}
      >
        <span className="text-white text-sm tracking-wider font-bold font-heading truncate mr-4">
          C:\THOMAS\{title.toUpperCase().replace(/ /g, "_")}
        </span>
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Minimize */}
          <button
            onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
            aria-label="Minimiser"
            className="text-white/70 hover:text-white hover:bg-white/20 text-xs font-bold cursor-pointer transition-all duration-200 w-7 h-7 flex items-center justify-center rounded"
          >
            _
          </button>
          {/* Maximize */}
          <button
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            aria-label={isMax ? "Restaurer" : "Agrandir"}
            className="text-white/70 hover:text-white hover:bg-white/20 text-xs font-bold cursor-pointer transition-all duration-200 w-7 h-7 flex items-center justify-center rounded"
          >
            {isMax ? "❐" : "□"}
          </button>
          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            aria-label="Fermer la fenêtre"
            className="text-white/80 hover:text-white hover:bg-red-500/80 text-sm font-bold cursor-pointer transition-all duration-200 w-7 h-7 flex items-center justify-center rounded"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`overflow-y-auto modal-scroll flex-1 bg-surface dark:bg-ds border-x-[4px] border-b-[4px] border-primary dark:border-dp transition-colors duration-500 ${
          isMax ? "" : "rounded-b-2xl"
        }`}
        style={{ padding: isMobile ? "1.25rem 1rem" : "2rem 2.5rem" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
