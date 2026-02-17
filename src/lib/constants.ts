export type Section = "apropos" | "parcours" | "projets" | "competences";

export type AppId = Section | "terminal" | "notepad";

export interface FolderConfig {
  id: Section;
  label: string;
  top: string;
  left?: string;
  right?: string;
}

export const folders: FolderConfig[] = [
  { id: "apropos", label: "À Propos", top: "8%", left: "10%" },
  { id: "projets", label: "Mes Projets", top: "38%", left: "8%" },
  { id: "parcours", label: "Mon Parcours", top: "18%", right: "8%" },
  { id: "competences", label: "Mes Compétences", top: "55%", right: "6%" },
];

export const sectionTitles: Record<Section, string> = {
  apropos: "À Propos",
  parcours: "Mon Parcours",
  projets: "Mes Projets",
  competences: "Mes Compétences",
};

export const appTitles: Record<AppId, string> = {
  ...sectionTitles,
  terminal: "Terminal",
  notepad: "Bloc-notes",
};

export const socialLinks = [
  { href: "mailto:thomas.lekieffredev@gmail.com", src: "/icone-mail.png", alt: "Email" },
  { href: "https://github.com/thomaslekieffre", src: "/icone-github.png", alt: "GitHub" },
  { href: "https://x.com/thomasdev59", src: "/icone-x.png", alt: "X" },
];
