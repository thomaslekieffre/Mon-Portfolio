"use client";

import Image from "next/image";

interface FolderIconProps {
  label: string;
  onClick?: () => void;
  isOpen?: boolean;
}

export default function FolderIcon({
  label,
  onClick,
  isOpen = false,
}: FolderIconProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 group cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <Image
        src={isOpen ? "/dossier-ouvert.png" : "/dossier-ferme.png"}
        alt={label}
        width={90}
        height={90}
        draggable={false}
        className="object-contain drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(83,153,135,0.3)]"
      />
      <span className="text-primary-dark dark:text-dh text-xs font-bold tracking-wider uppercase font-heading transition-colors duration-500 select-none">
        {label}
      </span>
    </Component>
  );
}
