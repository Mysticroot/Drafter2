export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900 py-4 text-center text-sm text-slate-400">
      Anime Draft Arena © {new Date().getFullYear()} • Built with React +
      Socket.io
    </footer>
  );
}
