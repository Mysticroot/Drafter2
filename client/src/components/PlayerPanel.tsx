import TeamSlot from "./TeamSlot";

interface PlayerPanelProps {
  title: string;
  variant: "you" | "opponent";
}

const ROLES = ["Captain", "Vice Captain", "Tank", "Healer", "Support"];

export default function PlayerPanel({ title, variant }: PlayerPanelProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">{title}</h2>

      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <TeamSlot key={role} role={role} variant={variant} />
        ))}
      </div>

      
    </section>
  );
}
