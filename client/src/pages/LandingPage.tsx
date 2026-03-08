import { Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Swords, Zap, Shield, Trophy, ChevronRight, Play } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSocket } from "../hooks/useSocket";

export default function LandingPage() {
  const { matchState } = useSocket();

  if (matchState && matchState.phase !== "FINISHED") {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white bg-[center_top_-1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[-10rem] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[140px]"
        />
        <div className="scanlines absolute inset-0 opacity-[0.03]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 lg:py-24">
        {/* Hero Section - Centered */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">
                Season 1: Origins
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.85] tracking-tighter text-white uppercase italic font-display">
              Assemble.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">
                Draft.
              </span>
              <br />
              Dominate.
            </h1>

            <p className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed text-slate-400 font-medium">
              The ultimate head-to-head anime drafting arena. Build your squad,
              master the swap phase, and outsmart your opponent in real-time.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Link
                to="/lobby"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-amber-500 px-12 py-5 text-xl font-black uppercase italic tracking-tighter text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(245,158,11,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enter Arena <Play size={24} fill="currentColor" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

              <button className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-12 py-5 text-xl font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600">
                Tutorial
              </button>
            </div>
          </motion.div>

          {/* Top Anime Cards Display */}
          <div className="relative mt-24 w-full max-w-4xl h-[400px] md:h-[500px] flex items-center justify-center">
            {[
              {
                name: "Shadow Monarch",
                role: "Assassin",
                power: 98,
                color: "rose",
                img: "https://picsum.photos/seed/shadow/400/600",
                rotate: -15,
                x: -180,
                z: 10,
              },
              {
                name: "Flame Hashira",
                role: "Tank",
                power: 94,
                color: "orange",
                img: "https://picsum.photos/seed/flame/400/600",
                rotate: -5,
                x: -60,
                z: 20,
              },
              {
                name: "Dragon Warrior",
                role: "DPS",
                power: 99,
                color: "amber",
                img: "https://picsum.photos/seed/dragon/400/600",
                rotate: 5,
                x: 60,
                z: 30,
              },
              {
                name: "Void Walker",
                role: "Mage",
                power: 96,
                color: "cyan",
                img: "https://picsum.photos/seed/void/400/600",
                rotate: 15,
                x: 180,
                z: 10,
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: card.rotate, x: card.x }}
                whileHover={{ y: -40, rotate: 0, zIndex: 50, scale: 1.1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + idx * 0.1,
                  type: "spring",
                }}
                className="absolute w-48 md:w-64 aspect-[3/4] rounded-2xl border border-white/10 bg-slate-900/80 p-2 backdrop-blur-md shadow-2xl cursor-pointer group"
                style={{ zIndex: card.z }}
              >
                <div className="h-full w-full rounded-xl border border-white/5 bg-slate-950 p-3 flex flex-col relative overflow-hidden">
                  <div className="absolute top-2 right-2 z-20">
                    <div
                      className={`h-8 w-8 rounded-full bg-${card.color}-500/20 border border-${card.color}-500/50 flex items-center justify-center text-${card.color}-500 text-xs font-black italic`}
                    >
                      S+
                    </div>
                  </div>

                  <div className="flex-1 rounded-lg bg-slate-900/50 border border-white/5 mb-3 overflow-hidden relative">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="h-full w-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <h3 className="text-sm md:text-lg font-black italic uppercase tracking-tighter text-white">
                        {card.name}
                      </h3>
                      <p
                        className={`text-[8px] md:text-[10px] font-bold text-${card.color}-500 uppercase tracking-widest`}
                      >
                        {card.role}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <div className="rounded bg-slate-900/80 p-1 border border-white/5 text-center">
                      <p className="text-[6px] uppercase text-slate-500 font-bold">
                        PWR
                      </p>
                      <p className="text-xs font-black text-white">
                        {card.power}
                      </p>
                    </div>
                    <div className="col-span-2 rounded bg-slate-900/80 p-1 border border-white/5 flex items-center justify-center">
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${card.color}-500`}
                          style={{ width: `${card.power}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-12 w-12 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://picsum.photos/seed/user${i}/100/100`}
                    alt="User"
                    className="h-full w-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Join <span className="text-white font-bold">12,400+</span>{" "}
              warriors in the arena
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="w-full max-w-7xl mx-auto mt-32">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
              The Arena Rules
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Draft Phase",
                desc: "Draw from a pool of legendary characters. Assign them to roles: Tank, DPS, Support, Mage, or Assassin.",
                icon: <Swords className="text-amber-500" size={32} />,
                color: "amber",
              },
              {
                step: "02",
                title: "Swap Phase",
                desc: "The turning point. You have 60 seconds to rework two positions. Anticipate your opponent's final build.",
                icon: <Zap className="text-cyan-500" size={32} />,
                color: "cyan",
              },
              {
                step: "03",
                title: "Final Score",
                desc: "Stats are calculated based on role synergy and base power. Highest total score claims the arena glory.",
                icon: <Shield className="text-rose-500" size={32} />,
                color: "rose",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl border border-white/5 bg-slate-900/30 p-8 backdrop-blur-sm transition-all hover:bg-slate-900/50 hover:border-white/10"
              >
                <div className="absolute top-6 right-8 text-5xl font-black italic text-white/5 group-hover:text-white/10 transition-colors">
                  {feature.step}
                </div>
                <div
                  className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 border border-white/5 shadow-inner`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {feature.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white transition-colors">
                  Learn More <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-7xl mx-auto mt-32 rounded-[3rem] border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-slate-900/50 to-slate-900/50 p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white opacity-[0.03]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-6">
              Ready to Claim Your Throne?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 font-medium">
              Join thousands of players in the most intense anime drafting
              experience. No downloads, no signups. Just pure strategy.
            </p>
            <Link
              to="/lobby"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-12 py-5 text-xl font-black uppercase italic tracking-tighter text-slate-950 transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Start Your First Draft
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
