import FocusReview from "../components/FocusReview";
import TopicGrid from "../components/TopicGrid";

export default function ReviewView({ dueTopics, onRevise, onForget, onDelete, dark }) {
  const [current, ...queue] = dueTopics;
  return (
    <div className="space-y-7"><header className="flex items-end justify-between gap-5"><div><p className="text-sm text-blue-400">Active recall mode</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Focus session</h1><p className="mt-2 text-sm text-stone-500 dark:text-stone-400">Think first. Reveal second. Rate your recall honestly.</p></div>{current && <span className={`rounded-xl border px-3 py-2 text-xs font-semibold ${dark ? "border-[#283552] bg-[#131b2d] text-stone-300" : "border-stone-200 bg-white text-stone-600"}`}>{dueTopics.length} in queue</span>}</header>{current ? <><FocusReview topic={current} onRemember={onRevise} onForget={onForget} dark={dark} /><section><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Up next</h2><span className="text-xs text-stone-500">{queue.length} remaining</span></div><TopicGrid topics={queue.slice(0, 3)} onRevise={onRevise} onForget={onForget} onDelete={onDelete} dark={dark} emptyTitle="Session complete" emptyDescription="You have no more topics waiting in this review session." /></section></> : <TopicGrid topics={[]} onRevise={onRevise} onForget={onForget} onDelete={onDelete} dark={dark} emptyTitle="Nothing due right now" emptyDescription="You have reviewed everything scheduled for today. Come back tomorrow or add something new." />}</div>
  );
}
