"use client";

import { useState, useCallback, useRef } from "react";
import type { AppId } from "@/lib/constants";

export interface WindowState {
  id: string;
  appId: AppId;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

const DEFAULT_SIZE = { width: 900, height: 600 };
const CASCADE_OFFSET = 30;
const TASKBAR_HEIGHT = 48;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(10);

  const getNextPosition = useCallback(
    (count: number) => {
      const x = 80 + (count % 5) * CASCADE_OFFSET;
      const y = 40 + (count % 5) * CASCADE_OFFSET;
      return { x, y };
    },
    []
  );

  const openWindow = useCallback(
    (appId: AppId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.appId === appId);
        if (existing) {
          // Focus existing + unminimize
          zCounter.current++;
          return prev.map((w) =>
            w.id === existing.id
              ? { ...w, minimized: false, zIndex: zCounter.current }
              : w
          );
        }
        zCounter.current++;
        const pos = getNextPosition(prev.length);
        return [
          ...prev,
          {
            id: `${appId}-${Date.now()}`,
            appId,
            position: pos,
            size: DEFAULT_SIZE,
            minimized: false,
            maximized: false,
            zIndex: zCounter.current,
          },
        ];
      });
    },
    [getNextPosition]
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter.current++;
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: zCounter.current } : w
      )
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        zCounter.current++;
        if (w.maximized) {
          return { ...w, maximized: false, zIndex: zCounter.current };
        }
        return {
          ...w,
          maximized: true,
          zIndex: zCounter.current,
        };
      })
    );
  }, []);

  const updatePosition = useCallback((id: string, pos: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position: pos } : w))
    );
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setWindows((prev) => {
      const win = prev.find((w) => w.id === id);
      if (!win) return prev;
      if (win.minimized) {
        zCounter.current++;
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: zCounter.current } : w
        );
      }
      // If it's the top window, minimize. Otherwise just focus.
      const topZ = Math.max(...prev.filter((w) => !w.minimized).map((w) => w.zIndex));
      if (win.zIndex === topZ) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: true } : w
        );
      }
      zCounter.current++;
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: zCounter.current } : w
      );
    });
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updatePosition,
    toggleMinimize,
    taskbarHeight: TASKBAR_HEIGHT,
  };
}
