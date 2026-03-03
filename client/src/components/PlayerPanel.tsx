import TeamSlot from "./TeamSlot";
import type { Role } from "../types/game";

interface PlayerPanelProps {
  title: string;
  variant: "you" | "opponent";
  selectedRole?: Role | null;
  setSelectedRole?: (role: Role) => void;
  isMyTurn?: boolean;
 totalScore?: number; // ✅ ADD THIS
  swapMode?: boolean;
  swapRoles?: Role[];
  setSwapRoles?: React.Dispatch<React.SetStateAction<Role[]>>;
}

const ROLES: Role[] = ["CAPTAIN", "VICE_CAPTAIN", "TANK", "HEALER", "SUPPORT"];

export default function PlayerPanel({
  title,
  variant,
  selectedRole,
  setSelectedRole,
  isMyTurn,
  swapMode,
  swapRoles,
  setSwapRoles,
}: PlayerPanelProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">{title}</h2>

      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <TeamSlot
            key={role}
            role={role}
            variant={variant}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            isMyTurn={isMyTurn}
            swapMode={swapMode}
            swapRoles={swapRoles}
            setSwapRoles={setSwapRoles}
          />
        ))}
      </div>
    </section>
  );
}
