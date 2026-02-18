"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSoundManager } from "@/hooks/useSoundManager";

interface SoundCtx {
  muted: boolean;
  toggleMute: () => void;
  play: (name: string) => void;
}

const SoundContext = createContext<SoundCtx>({
  muted: false,
  toggleMute: () => {},
  play: () => {},
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const sound = useSoundManager();
  return (
    <SoundContext.Provider value={sound}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
