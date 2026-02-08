import Image from "next/image";
import { TECH_ICONS } from "./tech-icons";

export default function Badge({
  label,
  filled = false,
}: {
  label: string;
  filled?: boolean;
}) {
  const icon = TECH_ICONS[label.toLowerCase()];
  return (
    <span
      className={`inline-flex items-center rounded-full text-sm font-bold tracking-wide border-2 transition-all duration-300 hover:scale-105 uppercase ${
        filled
          ? "bg-primary dark:bg-dp text-white border-primary dark:border-dp"
          : "bg-transparent text-primary-dark dark:text-dh border-primary dark:border-dp"
      }`}
      style={{ padding: "0.35rem 0.85rem", gap: "0.4rem" }}
    >
      {icon && (
        <Image
          src={icon}
          alt={label}
          width={16}
          height={16}
          className={`object-contain ${filled ? "brightness-0 invert" : "brightness-0 dark:brightness-0 dark:invert"}`}
        />
      )}
      {label}
    </span>
  );
}
