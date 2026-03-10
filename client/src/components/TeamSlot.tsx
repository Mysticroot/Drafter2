import { useSocket } from "../hooks/useSocket";
import type { Role } from "../types/game";
//
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
    if (
      matchState.phase === "SWAP" &&
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

    if (canSelectDraft) {
      setSelectedRole?.(role);
    }
  };

  const roleLabel = role.replace("_", " ");
  const isInteractive =
    canSelectDraft || (matchState.phase === "SWAP" && swapMode);

  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center rounded border h-16 sm:h-20 overflow-hidden transition
    ${card ? "bg-neutral-800 border-neutral-600" : "bg-neutral-900 border-neutral-700"}
    ${isInteractive ? "cursor-pointer" : "cursor-default"}
    ${isSelected ? "ring-2 ring-amber-300 border-amber-200 bg-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.55)]" : ""}
    ${isSwapSelected ? "ring-2 ring-indigo-400" : ""}
    `}
    >
      {/* EMPTY SLOT */}
      {!card && (
        <div className="w-full px-1 text-center text-[10px] sm:text-sm text-neutral-400 tracking-wide">
          {roleLabel}
        </div>
      )}

      {/* FILLED SLOT */}
      {card && (
        <>
          {/* IMAGE SECTION (40%) */}
          <div className="relative w-full sm:w-[40%] h-full overflow-hidden">
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-1 rounded bg-slate-950/85 px-1.5 py-[1px] text-[9px] font-semibold uppercase tracking-wider text-slate-100 sm:hidden">
              {roleLabel}
            </div>

            {/* diagonal cut */}
            <div className="absolute right-[-18px] top-0 h-full w-10 bg-neutral-800 rotate-[20deg] hidden sm:block" />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="hidden sm:flex items-center justify-between flex-1 px-4">
            {/* CHARACTER INFO */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{card.name}</span>
              <span className="text-xs text-neutral-400">{card.anime}</span>
            </div>

            {/* ROLE STAT */}
            <div className="text-right">
              <div className="text-xs text-neutral-400">{roleLabel}</div>

              <div className="text-lg font-semibold text-emerald-400">
                {card.stats[role]}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
