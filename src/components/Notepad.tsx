"use client";

import { useState, useCallback } from "react";

const DEFAULT_TEXT = `Bienvenue dans le Bloc-notes !

Ce portfolio a été créé par Thomas Lekieffre,
dev fullstack — créateur de Speedcube Master.

Projets phares :
- Speedcube Master (speedcubemaster.app)
- INAdex, ClipFlow, Portfolio Zoé Marchal

N'hésitez pas à écrire ce que vous voulez ici...
C'est votre espace !

-- Thomas`;

export default function Notepad() {
  const [text, setText] = useState(DEFAULT_TEXT);

  const handleNew = useCallback(() => {
    setText("");
  }, []);

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      {/* Menu bar */}
      <div className="flex items-center gap-4 pb-2 mb-3 border-b border-primary/15 dark:border-dp/15">
        <button
          onClick={handleNew}
          className="text-xs text-body/70 dark:text-db/70 hover:text-body dark:hover:text-db transition-colors cursor-pointer"
        >
          Nouveau
        </button>
        <button
          onClick={() => setText(DEFAULT_TEXT)}
          className="text-xs text-body/70 dark:text-db/70 hover:text-body dark:hover:text-db transition-colors cursor-pointer"
        >
          Réinitialiser
        </button>
      </div>

      {/* Text area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full bg-white/50 dark:bg-black/20 rounded-lg p-4 text-body dark:text-db text-sm leading-relaxed resize-none outline-none border border-primary/10 dark:border-dp/10 focus:border-primary/30 dark:focus:border-dp/30 transition-colors font-mono min-h-[250px]"
        spellCheck={false}
      />
    </div>
  );
}
