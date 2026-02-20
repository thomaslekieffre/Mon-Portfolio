"use client";

import Image from "next/image";
import { useWindows } from "@/contexts/WindowContext";
import { useSound } from "@/contexts/SoundContext";
import { folders, socialLinks, type Section } from "@/lib/constants";

interface StartMenuProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onClose: () => void;
  onReboot: () => void;
}

export default function StartMenu({
  darkMode,
  onToggleDarkMode,
  onClose,
  onReboot,
}: StartMenuProps) {
  const { openWindow } = useWindows();
  const { play } = useSound();

  const handleOpen = (id: Section) => {
    play("open");
    openWindow(id);
    onClose();
  };

  return (
    <div
      className="bg-surface/95 dark:bg-ds/95 backdrop-blur-xl border-2 border-primary/20 dark:border-dp/20 rounded-xl shadow-2xl overflow-hidden transition-colors duration-500"
      style={{ width: 280 }}
    >
      {/* Header */}
      <div
        className="bg-primary/15 dark:bg-dp/15 flex items-center border-b border-primary/15 dark:border-dp/15"
        style={{ padding: "16px 20px", gap: 14 }}
      >
        <Image
          src="/avata.png"
          alt="Thomas"
          width={44}
          height={44}
          className="rounded-full object-cover"
        />
        <div>
          <div className="text-sm font-heading font-bold text-primary-dark dark:text-dh tracking-wider">
            THOMAS
          </div>
          <div className="text-body/60 dark:text-db/60" style={{ fontSize: 11, marginTop: 2 }}>
            Développeur Full-Stack
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ padding: "10px 12px" }}>
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => handleOpen(f.id)}
            className="w-full text-left text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer flex items-center"
            style={{ padding: "10px 14px", gap: 12 }}
          >
            <Image
              src="/dossier-ferme.png"
              alt=""
              width={22}
              height={22}
              className="object-contain"
            />
            {f.label}
          </button>
        ))}

        <div
          className="border-t border-primary/15 dark:border-dp/15"
          style={{ margin: "8px 12px" }}
        />

        {/* Terminal & Notepad */}
        <button
          onClick={() => {
            play("open");
            openWindow("terminal");
            onClose();
          }}
          className="w-full text-left text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer flex items-center"
          style={{ padding: "10px 14px", gap: 12 }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-primary dark:text-dp">
            <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 6l3 2-3 2M8 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Terminal
        </button>
        <button
          onClick={() => {
            play("open");
            openWindow("notepad");
            onClose();
          }}
          className="w-full text-left text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer flex items-center"
          style={{ padding: "10px 14px", gap: 12 }}
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-primary dark:text-dp">
            <rect x="3" y="1" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Bloc-notes
        </button>

        <div
          className="border-t border-primary/15 dark:border-dp/15"
          style={{ margin: "8px 12px" }}
        />

        {/* Social links */}
        <div className="flex items-center" style={{ padding: "8px 14px", gap: 10 }}>
          {socialLinks.map((link) => (
            <a
              key={link.alt}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={link.alt}
              className="w-9 h-9 rounded-xl overflow-hidden hover:scale-110 active:scale-95 transition-transform cursor-pointer shadow-sm"
            >
              <Image
                src={link.src}
                alt={link.alt}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>

        <div
          className="border-t border-primary/15 dark:border-dp/15"
          style={{ margin: "8px 12px" }}
        />

        {/* Dark mode */}
        <button
          onClick={onToggleDarkMode}
          className="w-full text-left text-sm text-body dark:text-db hover:bg-primary/10 dark:hover:bg-dp/10 rounded-lg transition-colors cursor-pointer"
          style={{ padding: "10px 14px" }}
        >
          {darkMode ? "☀ Mode clair" : "☾ Mode sombre"}
        </button>

        {/* Shutdown */}
        <button
          onClick={onReboot}
          className="w-full text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer flex items-center"
          style={{ padding: "10px 14px", gap: 12 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Éteindre
        </button>
      </div>
    </div>
  );
}
