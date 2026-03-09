import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, Moon, Sun, Swords, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 group shrink-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110">
            <Swords size={24} />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tighter text-white uppercase italic">
            Draft<span className="text-amber-500">Arena</span>
          </span>
        </Link>

        <div className="ml-auto hidden md:flex items-center justify-end gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            Home
          </Link>
          <Link
            to="/lobby"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            Lobby
          </Link>
          <Link
            to="/cards"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
          >
            Cards
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-lg transition"
            aria-label="Toggle theme"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/lobby"
            className="btn-outline inline-flex rounded-full px-4 py-2 text-[11px] uppercase tracking-widest transition-all"
          >
            Join Arena
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-lg transition"
            aria-label="Toggle theme"
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-lg transition"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="app-panel theme-mobile-links absolute right-4 top-[4.2rem] w-44 rounded-xl p-2 shadow-xl sm:hidden">
          <Link
            to="/"
            className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800/70 hover:text-white transition-colors uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/lobby"
            className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800/70 hover:text-white transition-colors uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Lobby
          </Link>
          <Link
            to="/cards"
            className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800/70 hover:text-white transition-colors uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cards
          </Link>
        </div>
      )}
    </nav>
  );
}
