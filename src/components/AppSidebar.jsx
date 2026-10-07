const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "review", label: "Active recall", icon: "◒" },
  { id: "topics", label: "Topics", icon: "☷" },
  { id: "progress", label: "Progress", icon: "↗" },
  { id: "subjects", label: "Subjects", icon: "◌" },
];

export default function AppSidebar({ activeView, onNavigate, dark, streak, onToggleTheme }) {
  const surface = dark ? "bg-[#0d1323] border-[#24304a]" : "bg-white border-stone-200";
  const muted = dark ? "text-stone-400" : "text-stone-500";

  return (
    <aside className={`flex h-full w-full flex-col border-r ${surface}`}>
      <div className="px-6 pb-7 pt-8">
        <button onClick={() => onNavigate("dashboard")} className="flex items-center gap-3 text-left">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-950/40">R</span>
          <span>
            <span className="block text-base font-bold tracking-tight">Recall</span>
            <span className={`block text-[11px] ${muted}`}>Learning workspace</span>
          </span>
        </button>
      </div>

      <nav className="space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = item.id === activeView;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? (dark ? "bg-[#263652] text-white shadow-sm" : "bg-stone-900 text-white") : `${muted} hover:bg-black/5 dark:hover:bg-white/6`}`}
            >
              <span className="grid size-5 place-items-center text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 p-4">
        <div className={`rounded-2xl border p-4 ${dark ? "border-[#283552] bg-[#131b2d]" : "border-stone-200 bg-stone-50"}`}>
          <p className={`text-xs ${muted}`}>Learning streak</p>
          <p className="mt-1 text-xl font-bold">{streak} day{streak === 1 ? "" : "s"} <span className="text-base">🔥</span></p>
          <p className={`mt-1 text-[11px] ${muted}`}>Review something daily to build momentum.</p>
        </div>
        <button onClick={onToggleTheme} className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium ${dark ? "bg-white/6 text-stone-300 hover:bg-white/10" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
          <span>{dark ? "Dark appearance" : "Light appearance"}</span>
          <span>{dark ? "☾" : "☀"}</span>
        </button>
      </div>
    </aside>
  );
}
