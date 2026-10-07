import { useState } from "react";

export default function SubjectsView({ subjects, breakdown, onAdd, onRemove, onChoose, dark }) {
  const [name, setName] = useState("");
  const stats = new Map(breakdown.map((item) => [item.subject, item]));
  const field = dark ? "border-white/10 bg-[#191b1a] text-white placeholder:text-stone-500" : "border-stone-200 bg-white placeholder:text-stone-400";
  function submit(event) { event.preventDefault(); const created = onAdd(name); if (created) setName(""); }
  return (
    <div className="space-y-7"><header><p className="text-sm text-stone-500 dark:text-stone-400">Organisation</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Subjects.</h1></header><form onSubmit={submit} className="flex max-w-lg gap-2"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Computer Networks" className={`min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2 ${field}`} /><button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">Add subject</button></form><section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{subjects.filter((subject) => subject !== "All").map((subject) => { const data = stats.get(subject); return <article key={subject} className={`rounded-2xl border p-4 ${dark ? "border-white/8 bg-[#191b1a]" : "border-stone-200 bg-white"}`}><div className="flex items-start justify-between gap-3"><button onClick={() => onChoose(subject)} className="text-left"><h2 className="font-semibold">{subject}</h2><p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{data?.total || 0} topic{data?.total === 1 ? "" : "s"} · {data?.due || 0} due</p></button><button onClick={() => { if (confirm(`Remove “${subject}” from your subjects? Existing topics are kept.`)) onRemove(subject); }} className="rounded-lg px-2 py-1 text-xs text-stone-400 hover:bg-red-500/10 hover:text-red-500">Remove</button></div></article>; })}</section></div>
  );
}
