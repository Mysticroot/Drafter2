import { Link } from "react-router-dom";
import { Swords } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-6">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110">
          <Swords size={24} />
        </div>
        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
          Draft<span className="text-amber-500">Arena</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/how-to-play"
          className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
        >
          How to Play
        </Link>
        <Link
          to="/leaderboard"
          className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
        >
          Leaderboard
        </Link>
        <Link
          to="/lobby"
          className="rounded-full border border-amber-500/30 bg-amber-500/10 px-6 py-2 text-xs font-bold uppercase tracking-widest text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all"
        >
          Join Arena
        </Link>
      </div>
    </nav>
  );
}
