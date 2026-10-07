import StatCard from "../components/StatCard";

export default function ProgressView({ stats, breakdown, dark }) {
  const strongest = Math.max(...breakdown.map((item) => item.total), 1);
  return (
    <div className="space-y-7">
      <header><p className="text-sm text-stone-500 dark:text-stone-400">Learning analytics</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Your progress.</h1></header>
      <section className="grid gap-3 sm:grid-cols-3"><StatCard label="Recall rate" value={stats.total ? `${Math.round((stats.reviewed / stats.total) * 100)}%` : "—"} detail="Topics revisited at least once" dark={dark} /><StatCard label="Mastery rate" value={stats.total ? `${Math.round((stats.mastered / stats.total) * 100)}%` : "—"} detail="Topics at level five" tone="success" dark={dark} /><StatCard label="New material" value={stats.new} detail="Topics awaiting their first review" tone="alert" dark={dark} /></section>
      <section className={`rounded-2xl border p-5 ${dark ? "border-white/8 bg-[#191b1a]" : "border-stone-200 bg-white"}`}><div><h2 className="text-base font-semibold">Subject coverage</h2><p className="mt-1 text-xs text-stone-500 dark:text-stone-400">A simple view of where your learning time is going.</p></div>{breakdown.length ? <div className="mt-6 space-y-5">{breakdown.map((item) => <div key={item.subject}><div className="mb-2 flex justify-between text-sm"><span className="font-medium">{item.subject}</span><span className="text-stone-500 dark:text-stone-400">{item.total} saved · {item.due} due</span></div><div className={`h-2 overflow-hidden rounded-full ${dark ? "bg-white/8" : "bg-stone-100"}`}><div className="h-full rounded-full bg-emerald-500" style={{ width: `${(item.total / strongest) * 100}%` }} /></div></div>)}</div> : <p className="py-10 text-center text-sm text-stone-500 dark:text-stone-400">Add topics to see your subject progress.</p>}</section>
    </div>
  );
}
