interface TeamSlotProps {
  role: string;
  variant?: "you" | "opponent";
}

export default function TeamSlot({ role, variant = "you" }: TeamSlotProps) {
  const base = "h-14 rounded border flex items-center justify-center text-sm";

  const styles =
    variant === "you"
      ? "bg-neutral-800 border-neutral-700 text-neutral-400"
      : "bg-neutral-800 border-neutral-700 text-neutral-500";

  return <div className={`${base} ${styles}`}>{role}</div>;
}
