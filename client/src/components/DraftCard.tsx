import type { Card, Role } from "../types/game";
import { useSocket } from "../hooks/useSocket";

interface Props {
  card: Card;
  disabled?: boolean;
}

const ROLES: Role[] = ["CAPTAIN", "VICE_CAPTAIN", "TANK", "HEALER", "SUPPORT"];

export default function DraftCard({ card, disabled }: Props) {
  const { socket } = useSocket();

  const handleAssign = (role: Role) => {
    if (!socket) return;
    socket.emit("draft:assign", { role });
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-neutral-700 bg-neutral-800 p-4 flex flex-col gap-4">
      {/* HEADER */}
      <div>
        <h3 className="text-lg font-semibold">{card.name}</h3>
        <p className="text-sm text-neutral-400">{card.anime}</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {ROLES.map((role) => (
          <div
            key={role}
            className="flex justify-between bg-neutral-900 rounded px-2 py-1"
          >
            <span>{role}</span>
            <span className="text-emerald-400">{card.stats[role]}</span>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-2">
        {ROLES.map((role) => (
          <button
            key={role}
            disabled={disabled}
            onClick={() => handleAssign(role)}
            className="px-3 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-700 disabled:bg-neutral-700 transition"
          >
            Assign {role}
          </button>
        ))}
      </div>
    </div>
  );
}
