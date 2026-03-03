import { useSocket } from "../hooks/useSocket";
import type { Role } from "../types/game";

interface TeamSlotProps {
  role: Role;
  variant?: "you" | "opponent";
  selectedRole?: Role | null;
  setSelectedRole?: (role: Role) => void;
  isMyTurn?: boolean;
}

export default function TeamSlot({
  role,
  variant = "you",
  selectedRole,
  setSelectedRole,
  isMyTurn,
}: TeamSlotProps) {
  const { matchState, playerId } = useSocket();

  if (!matchState || !playerId) return null;

  // Determine correct player
  const player =
    variant === "you"
      ? matchState.players.find((p) => p.id === playerId)
      : matchState.players.find((p) => p.id !== playerId);

  if (!player) return null;

  const card = player.team?.[role];
  const pendingCard = variant === "you" ? player.pendingCard : null;

  const canSelect =
    variant === "you" && isMyTurn === true && !!pendingCard && !card;

  const isSelected = selectedRole === role;

  const handleClick = () => {
    if (!canSelect) return;
    setSelectedRole?.(role);
  };

  const base =
    "h-14 rounded border flex items-center justify-center text-sm transition";

  const filledStyles = "bg-emerald-700 border-emerald-500 text-white";

  const emptyStyles = "bg-neutral-800 border-neutral-700 text-neutral-400";

  const selectableStyles = canSelect
    ? "cursor-pointer hover:border-yellow-400"
    : "opacity-60";

  const selectedStyles = isSelected ? "border-yellow-400 bg-yellow-900/30" : "";

  return (
    <div
      onClick={handleClick}
      className={`${base} ${
        card ? filledStyles : emptyStyles
      } ${selectableStyles} ${selectedStyles}`}
    >
      {card ? card.name : role.replace("_", " ")}
    </div>
  );
}
