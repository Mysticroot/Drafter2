export default function Footer() {
  return (
    <footer className="app-panel relative z-10 border-t px-4 sm:px-8 py-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest">
          © 2024 ANIME DRAFT ARENA. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-amber-400 transition-colors uppercase tracking-widest"
          >
            Discord
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-amber-400 transition-colors uppercase tracking-widest"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-xs text-slate-500 hover:text-amber-400 transition-colors uppercase tracking-widest"
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
