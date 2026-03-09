import type { Card } from "../types/game";

export default function CardTile({ card }: { card: Card }) {
  return (
    <div className="app-panel rounded-lg p-3 hover:border-yellow-400 transition cursor-pointer">
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-32 object-cover rounded mb-2"
      />

      <div className="text-sm font-semibold">{card.name}</div>
      <div className="text-xs text-slate-400 mb-2">{card.anime}</div>

      <div className="grid grid-cols-2 gap-1 text-xs">
        <div>CAP {card.stats.CAPTAIN}</div>
        <div>VICE {card.stats.VICE_CAPTAIN}</div>
        <div>TANK {card.stats.TANK}</div>
        <div>HEAL {card.stats.HEALER}</div>
        <div>SUP {card.stats.SUPPORT}</div>
      </div>
    </div>
  );
}