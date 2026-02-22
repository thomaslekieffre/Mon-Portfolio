"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = useCallback(() => {
    setActivated(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase() === KONAMI[indexRef.current].toLowerCase()
        ? e.key
        : null;

      if (key) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          indexRef.current = 0;
          setActivated(true);
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => setActivated(false), 5000);
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { activated, reset };
}
