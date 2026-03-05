import { useSocket } from "../hooks/useSocket";
import type { Role } from "../types/game";

interface TeamSlotProps {
  role: Role;
  variant?: "you" | "opponent";

  selectedRole?: Role | null;
  setSelectedRole?: (role: Role) => void;
  isMyTurn?: boolean;

  swapMode?: boolean;
  swapRoles?: Role[];
  setSwapRoles?: React.Dispatch<React.SetStateAction<Role[]>>;
}

export default function TeamSlot({
  role,
  variant = "you",
  selectedRole,
  setSelectedRole,
  isMyTurn,
  swapMode,
  swapRoles,
  setSwapRoles,
}: TeamSlotProps) {
  const { matchState, playerId } = useSocket();

  if (!matchState || !playerId) return null;

  const isSwapPhase = matchState.phase === "SWAP";

  const player =
    variant === "you"
      ? matchState.players.find((p) => p.id === playerId)
      : matchState.players.find((p) => p.id !== playerId);

  if (!player) return null;

  const card = player.team?.[role];
  const pendingCard = variant === "you" ? player.pendingCard : null;

  const canSelectDraft =
    variant === "you" &&
    isMyTurn &&
    pendingCard &&
    !card &&
    matchState.phase === "DRAFT";

  const isSelected = selectedRole === role;
  const isSwapSelected = swapRoles?.includes(role);

  const handleClick = () => {
    /* SWAP MODE */

    if (
      isSwapPhase &&
      swapMode &&
      variant === "you" &&
      card &&
      !player.hasSwapped
    ) {
      if (!swapRoles || !setSwapRoles) return;

      if (swapRoles.includes(role)) {
        setSwapRoles(swapRoles.filter((r) => r !== role));
      } else if (swapRoles.length < 2) {
        setSwapRoles([...swapRoles, role]);
      }

      return;
    }

    /* DRAFT MODE */

    if (canSelectDraft) {
      setSelectedRole?.(role);
    }
  };

  const base =
    "h-14 rounded border flex items-center justify-center text-sm transition";

  const filled = "bg-emerald-700 border-emerald-500 text-white";
  const empty = "bg-neutral-800 border-neutral-700 text-neutral-400";

  const selectable =
    canSelectDraft || (isSwapPhase && swapMode && variant === "you" && card)
      ? "cursor-pointer hover:border-yellow-400"
      : "opacity-60";

  const selected = isSelected ? "border-yellow-400 bg-yellow-900/30" : "";
  const swapSelected = isSwapSelected
    ? "border-yellow-400 bg-yellow-900/40"
    : "";

  return (
    <div
      onClick={handleClick}
      className={`${base} ${
        card ? filled : empty
      } ${selectable} ${selected} ${swapSelected}`}
    >
      {card ? card.name : role.replace("_", " ")}
    </div>
  );
}
