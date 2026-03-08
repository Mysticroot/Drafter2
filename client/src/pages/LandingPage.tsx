import { Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSocket } from "../hooks/useSocket";
import { baseCharacters } from "../assets/char";

export default function LandingPage() {
  const { matchState } = useSocket();

  if (matchState && matchState.phase !== "FINISHED") {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  const heroCards = baseCharacters.slice(0, 4);

  const getTopRole = (stats: Record<string, number>) => {
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])[0][0]
      .replace("_", " ");
  };

  const fanPositions = [
    { rotate: -18, x: -120, z: 10 },
    { rotate: -7, x: -40, z: 20 },
    { rotate: 6, x: 40, z: 30 },
    { rotate: 18, x: 120, z: 10 },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#02071a] text-slate-100">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030a24] via-[#02071a] to-[#02071a]" />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.14, 0.24, 0.14],
            x: [0, 34, 0],
            y: [0, -24, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-amber-500/18 blur-[120px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -36, 0],
            y: [0, 52, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-8rem] h-[540px] w-[540px] rounded-full bg-cyan-500/10 blur-[140px]"
        />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-1 items-center px-6 py-10 lg:px-10 lg:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">
                Season 1: Origins
              </p>
            </div>

            <h1 className="text-5xl font-black italic leading-[0.86] tracking-tighter text-white md:text-7xl lg:text-8xl">
              Assemble.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                Draft.
              </span>
              <br />
              Dominate.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-2xl">
              The ultimate head-to-head anime drafting arena. Build your squad,
              master the swap phase, and outsmart your opponent in real-time.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/lobby"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-amber-400/60 bg-gradient-to-r from-amber-400 to-orange-400 px-10 py-4 text-lg font-black uppercase italic tracking-tight text-slate-950 shadow-[0_0_35px_rgba(245,158,11,0.35)] transition hover:brightness-110"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Arena <Play size={20} fill="currentColor" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

             
            </div>

            
          </motion.div>

          <div className="relative h-[390px] w-full lg:h-[500px]">
            <div className="absolute inset-0 rounded-3xl border border-slate-700/60 bg-slate-900/35 backdrop-blur-sm" />

            {heroCards.map((card, idx) => {
              const fan = fanPositions[idx] ?? fanPositions[0];
              const topRole = getTopRole(card.stats);
              const power = Math.max(...Object.values(card.stats));

              return (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: fan.rotate, x: fan.x }}
                  whileHover={{ y: -16, rotate: fan.rotate * 0.35, zIndex: 60 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4 + idx * 0.1,
                    type: "spring",
                  }}
                  className="group absolute left-1/2 top-1/2 w-48 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl border border-white/10 bg-slate-900/85 p-2 shadow-2xl md:w-56"
                  style={{ zIndex: fan.z }}
                >
                  <div className="relative flex aspect-[3/4] h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-slate-950 p-3">
                    <div className="absolute right-2 top-2 z-20 h-8 w-8 rounded-full border border-amber-400/60 bg-amber-500/20 text-center text-xs font-black italic leading-8 text-amber-300">
                      S+
                    </div>

                    <div className="relative mb-3 flex-1 overflow-hidden rounded-lg border border-white/5 bg-slate-900/50">
                      <img
                        src={card.image}
                        alt={card.name}
                        className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <h3 className="text-sm font-black italic uppercase tracking-tight text-white md:text-base">
                          {card.name}
                        </h3>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-amber-300">
                          {topRole}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <div className="rounded border border-white/5 bg-slate-900/80 p-1 text-center">
                        <p className="text-[6px] uppercase text-slate-500 font-bold">
                          PWR
                        </p>
                        <p className="text-xs font-black text-white">{power}</p>
                      </div>
                      <div className="col-span-2 flex items-center justify-center rounded border border-white/5 bg-slate-900/80 p-1">
                        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full bg-amber-400"
                            style={{ width: `${power}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
      </main>

      <Footer />
    </div>
  );
}
