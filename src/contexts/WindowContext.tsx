"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useWindowManager, type WindowState } from "@/hooks/useWindowManager";
import type { AppId } from "@/lib/constants";

interface WindowCtx {
  windows: WindowState[];
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  toggleMinimize: (id: string) => void;
  taskbarHeight: number;
}

const WindowContext = createContext<WindowCtx>({
  windows: [],
  openWindow: () => {},
  closeWindow: () => {},
  focusWindow: () => {},
  minimizeWindow: () => {},
  maximizeWindow: () => {},
  updatePosition: () => {},
  toggleMinimize: () => {},
  taskbarHeight: 48,
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const wm = useWindowManager();
  return (
    <WindowContext.Provider value={wm}>{children}</WindowContext.Provider>
  );
}

export function useWindows() {
  return useContext(WindowContext);
}
