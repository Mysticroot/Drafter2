import { useSocket } from "../hooks/useSocket";
import type { Role } from "../types/game";
import re from "../assets/react.svg";

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

 return (
   <div
     onClick={handleClick}
     className={`flex items-center rounded border h-20 overflow-hidden transition
    ${card ? "bg-neutral-800 border-neutral-600" : "bg-neutral-900 border-neutral-700"}
    ${isSelected ? "ring-2 ring-yellow-400" : ""}
    ${isSwapSelected ? "ring-2 ring-indigo-400" : ""}
    `}
   >
     {/* EMPTY SLOT */}
     {!card && (
       <div className="w-full text-center text-neutral-400">{roleLabel}</div>
     )}

     {/* FILLED SLOT */}
     {card && (
       <>
         {/* IMAGE SECTION (40%) */}
         <div className="relative w-[40%] h-full overflow-hidden">
           <img src={re} className="w-full h-full object-cover" />

           {/* diagonal cut */}
           <div className="absolute right-[-18px] top-0 h-full w-10 bg-neutral-800 rotate-[20deg]" />
         </div>

         {/* RIGHT SIDE CONTENT */}
         <div className="flex items-center justify-between flex-1 px-4">
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
