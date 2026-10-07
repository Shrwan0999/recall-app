import AddTopic from "../components/AddTopic";
import FocusReview from "../components/FocusReview";
import StatCard from "../components/StatCard";
import SubjectDeckGrid from "../components/SubjectDeckGrid";

export default function DashboardView({ stats, dueTopics, recentTopics, subjects, breakdown, selectedSubject, onAdd, onRevise, onForget, onNavigate, dark }) {
  const focusTopic = dueTopics[0] || recentTopics[0];
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm text-blue-400">Your memory workspace</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Memory Palace</h1><p className="mt-2 text-sm text-stone-500 dark:text-stone-400">Build lasting knowledge through deliberate recall.</p></div><button onClick={() => onNavigate("review")} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 hover:from-blue-500 hover:to-indigo-500">Start review session</button></header>
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Topics to review" value={stats.due} detail="Ready for active recall" tone="alert" dark={dark} /><StatCard label="Topics reviewed" value={stats.reviewed} detail="Revisited at least once" dark={dark} /><StatCard label="Retention" value={stats.total ? `${Math.round((stats.reviewed / stats.total) * 100)}%` : "—"} detail="Estimated familiarity" tone="info" dark={dark} /><StatCard label="Mastered" value={stats.mastered} detail="Level 5 topics" tone="success" dark={dark} /></section>
      {focusTopic ? <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]"><FocusReview topic={focusTopic} onRemember={onRevise} onForget={onForget} dark={dark} /><div className="space-y-4"><div className={`rounded-2xl border p-5 ${dark ? "border-[#283552] bg-[#131b2d]" : "border-stone-200 bg-white"}`}><p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Review schedule</p><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span className="text-stone-400">Today</span><strong>{stats.due}</strong></div><div className="flex justify-between"><span className="text-stone-400">New topics</span><strong>{stats.new}</strong></div><div className="flex justify-between"><span className="text-stone-400">Mastered</span><strong className="text-emerald-400">{stats.mastered}</strong></div></div><button onClick={() => onNavigate("review")} className="mt-6 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">Review now</button></div><AddTopic onAdd={onAdd} selectedSubject={selectedSubject} dark={dark} compact /></div></section> : <AddTopic onAdd={onAdd} selectedSubject={selectedSubject} dark={dark} />}
      <SubjectDeckGrid subjects={subjects} breakdown={breakdown} onChoose={(subject) => { onNavigate("topics", subject); }} dark={dark} />
    </div>
  );
}
