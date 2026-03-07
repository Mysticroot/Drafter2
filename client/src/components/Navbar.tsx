export default function Navbar() {
  return (
    <nav className="h-16 border-b border-slate-700 bg-slate-900 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Anime Draft Arena
        </h1>

        
      </div>

      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-slate-600"></div>
        <span className="text-sm text-slate-300">Player</span>
      </div>
    </nav>
  );
}
