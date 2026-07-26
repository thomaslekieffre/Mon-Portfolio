"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useWindows } from "@/contexts/WindowContext";
import { type Section, TYPING_SPEED } from "@/lib/constants";

interface Line {
  type: "input" | "output";
  text: string;
}

const NEOFETCH = `
  ████████╗██╗
  ╚══██╔══╝██║     Thomas Lekieffre
     ██║   ██║     OS: PortfolioOS v2.0
     ██║   ██║     Shell: web-terminal
     ██║   ███████╗ Uptime: since 2009
     ╚═╝   ╚══════╝ Stack: Next.js, React, TypeScript
                     Langages: JS, TS, Rust, C#, SQL, Python
                     Passion: Speedcubing · GameDev
`;

const HELP_TEXT = `Commandes disponibles:
  help        Affiche cette aide
  whoami      Qui suis-je ?
  skills      Mes compétences
  projects    Mes projets
  contact     Me contacter
  neofetch    Infos système
  ls          Lister les dossiers
  cd [nom]    Ouvrir une section
  date        Date et heure
  echo [msg]  Afficher un message
  clear       Effacer le terminal`;

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "PortfolioOS Terminal v2.0" },
    { type: "output", text: 'Tapez "help" pour voir les commandes disponibles.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [typingOutput, setTypingOutput] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openWindow } = useWindows();

  const scrollToBottom = useCallback(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [lines, typingOutput, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const typeOutput = useCallback(
    (text: string) => {
      let i = 0;
      setTypingOutput("");
      const interval = setInterval(() => {
        i++;
        setTypingOutput(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setTypingOutput(null);
          setLines((prev) => [...prev, { type: "output", text }]);
        }
      }, TYPING_SPEED);
    },
    []
  );

  const addOutput = useCallback(
    (text: string, typed = false) => {
      if (typed && text.length > 0) {
        typeOutput(text);
      } else {
        setLines((prev) => [...prev, { type: "output", text }]);
      }
    },
    [typeOutput]
  );

  const handleCommand = useCallback(
    (cmd: string) => {
      setLines((prev) => [...prev, { type: "input", text: `> ${cmd}` }]);
      const parts = cmd.trim().toLowerCase().split(/\s+/);
      const command = parts[0];
      const arg = parts.slice(1).join(" ");

      switch (command) {
        case "help":
          addOutput(HELP_TEXT);
          break;
        case "whoami":
          addOutput(
            "Thomas Lekieffre - 18 ans, fullstack @ Valenciennes. Créateur de Speedcube Master (+1800 users). Terminale NSI → école d'informatique (rentrée 2026).",
            true
          );
          break;
        case "skills":
          addOutput(
            "Langages: TS/JS (expert) · SQL · HTML/CSS · C# · Python · Rust\nFrontend: Next.js, React, Tailwind, Framer Motion, Shadcn\nBackend: Supabase, Postgres, Clerk, Better Auth, Node, Rust/Tauri\nDevOps: Docker, Coolify, VPS OVH, Vercel, GitHub\nGameDev: Unity, RPG Maker · Tooling: Cursor, Claude Code, Stripe, FFmpeg",
            true
          );
          break;
        case "projects":
        case "projets":
          addOutput(
            "1. Speedcube Master - Plateforme speedcubing (+1800 users) → speedcubemaster.app\n2. INAdex - Dex Victory Road (Inazuma Eleven)\n3. ClipFlow - Capture écran + timeline (Tauri/Rust)\n4. Portfolio Zoé Marchal - Intégration Next.js\n(+ Zone Tactics, NoteFlow, Lego Tracker…)",
            true
          );
          break;
        case "contact":
          addOutput(
            "Email: thomaslekieffre59.dev@gmail.com\nGitHub: github.com/thomaslekieffre\nX: x.com/thomasdev59\nLinkedIn: linkedin.com/in/thomas-lekieffre-988224319\nYouTube: youtube.com/@icithomas",
            true
          );
          break;
        case "neofetch":
          addOutput(NEOFETCH);
          break;
        case "ls":
          addOutput("apropos/  projets/  parcours/  competences/  terminal  notepad");
          break;
        case "cd": {
          const sectionMap: Record<string, Section> = {
            apropos: "apropos",
            projets: "projets",
            parcours: "parcours",
            competences: "competences",
          };
          const target = sectionMap[arg];
          if (target) {
            addOutput(`Ouverture de ${arg}...`);
            setTimeout(() => openWindow(target), 300);
          } else {
            addOutput(`Erreur: dossier "${arg || "?"}" introuvable. Essayez "ls" pour voir les dossiers.`);
          }
          break;
        }
        case "date":
          addOutput(
            new Date().toLocaleString("fr-FR", {
              dateStyle: "full",
              timeStyle: "medium",
            })
          );
          break;
        case "echo":
          addOutput(arg || "");
          break;
        case "clear":
          setLines([]);
          break;
        case "":
          break;
        default:
          addOutput(
            `Commande inconnue: "${command}". Tapez "help" pour l'aide.`
          );
      }
    },
    [addOutput, openWindow]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (typingOutput !== null) return;
      handleCommand(input);
      setInput("");
    },
    [input, typingOutput, handleCommand]
  );

  return (
    <div
      className="bg-[#0a0a0a] text-[#4ade80] font-mono text-sm rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto flex flex-col"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 space-y-0.5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.type === "input" ? "text-[#86efac]" : "text-[#4ade80]/80"
            }`}
          >
            {line.text}
          </div>
        ))}
        {typingOutput !== null && (
          <div className="whitespace-pre-wrap text-[#4ade80]/80">
            {typingOutput}
            <span className="animate-pulse">▌</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-[#86efac]">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[#4ade80] caret-[#4ade80]"
          autoComplete="off"
          spellCheck={false}
          disabled={typingOutput !== null}
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
