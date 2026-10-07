const deckArt = ["from-cyan-600/90 via-blue-700 to-indigo-950", "from-violet-600/90 via-fuchsia-700 to-slate-950", "from-emerald-500/90 via-teal-700 to-slate-950", "from-amber-500/90 via-orange-700 to-stone-950"];
const deckSymbols = ["◌", "∑", "⚗", "✦"];

export default function SubjectDeckGrid({ subjects, breakdown, onChoose, dark }) {
  const stats = new Map(breakdown.map((item) => [item.subject, item]));
  const decks = subjects.filter((subject) => subject !== "All");
  return (
    <section>
      <div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-semibold">Your decks</h2><p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Pick a subject and continue where you left off.</p></div><button onClick={() => onChoose("All")} className="text-xs font-semibold text-blue-400 hover:text-blue-300">View library</button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{decks.map((subject, index) => { const data = stats.get(subject); return <button key={subject} onClick={() => onChoose(subject)} className={`group overflow-hidden rounded-2xl border text-left transition-transform hover:-translate-y-0.5 ${dark ? "border-[#283552] bg-[#131b2d]" : "border-stone-200 bg-white"}`}><div className={`flex h-24 items-center justify-center bg-gradient-to-br ${deckArt[index % deckArt.length]}`}><span className="text-4xl text-white/90 drop-shadow">{deckSymbols[index % deckSymbols.length]}</span></div><div className="p-4"><h3 className="text-base font-semibold">{subject}</h3><div className="mt-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400"><span>{data?.total || 0} topics</span><span className={data?.due ? "text-amber-400" : ""}>{data?.due || 0} due</span></div><div className={`mt-4 h-1.5 overflow-hidden rounded-full ${dark ? "bg-white/8" : "bg-stone-100"}`}><span className="block h-full rounded-full bg-emerald-400" style={{ width: `${data?.total ? Math.max(8, (data.reviewed / data.total) * 100) : 0}%` }} /></div></div></button>; })}</div>
    </section>
  );
}
