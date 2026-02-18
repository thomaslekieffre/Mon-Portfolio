"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { SOUNDS, type SoundDef } from "@/lib/sounds";

const MUTE_KEY = "portfolio-muted";

function getMuteSnapshot() {
  return localStorage.getItem(MUTE_KEY) === "true";
}

function getMuteServerSnapshot() {
  return false;
}

function subscribeMute(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export function useSoundManager() {
  const muted = useSyncExternalStore(subscribeMute, getMuteSnapshot, getMuteServerSnapshot);
  const ctxRef = useRef<AudioContext | null>(null);
  const reducedMotionRef = useRef<boolean | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (name: string) => {
      if (reducedMotionRef.current === null) {
        reducedMotionRef.current = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
      }
      if (muted || reducedMotionRef.current) return;
      const def: SoundDef | undefined = SOUNDS[name];
      if (!def) return;
      try {
        const ctx = getCtx();
        let t = ctx.currentTime;
        for (let i = 0; i < def.frequencies.length; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = def.type;
          osc.frequency.setValueAtTime(def.frequencies[i], t);
          gain.gain.setValueAtTime(def.volume, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + def.durations[i]);
          osc.start(t);
          osc.stop(t + def.durations[i]);
          t += def.durations[i];
        }
      } catch {
        // Audio not available
      }
    },
    [muted, getCtx]
  );

  const toggleMute = useCallback(() => {
    const next = !getMuteSnapshot();
    localStorage.setItem(MUTE_KEY, String(next));
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { muted, toggleMute, play };
}
