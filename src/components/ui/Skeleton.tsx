export default function Skeleton({
  className = "",
  width,
  height,
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) {
  return (
    <div
      className={`animate-pulse bg-primary/10 dark:bg-dp/10 rounded-lg ${className}`}
      style={{ width, height }}
    />
  );
}
