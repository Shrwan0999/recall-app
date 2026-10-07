import { formatReviewDate, getDaysUntilReview } from "../utils/date";

export default function TopicCard({ topic, onRevise, onForget, onDelete, isDue, dark }) {
  if (!topic) return null;
  const level = topic.level ?? 0;
  const isMastered = level >= 5;
  const surface = dark ? "border-[#283552] bg-[#131b2d] hover:border-[#38507a]" : "border-stone-200 bg-white hover:border-stone-300";
  const days = getDaysUntilReview(topic.nextDate);
  return (
    <article className={`group flex h-full flex-col rounded-2xl border p-4 transition-colors ${surface}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className={`inline-flex rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${dark ? "bg-white/8 text-stone-300" : "bg-stone-100 text-stone-600"}`}>{topic.subject || "General"}</span>
          <h3 className="mt-3 break-words text-sm font-semibold leading-snug">{topic.name || topic.title}</h3>
        </div>
        <button onClick={() => { if (confirm(`Delete “${topic.name || topic.title}”?`)) onDelete(topic.id); }} className="rounded-lg p-1 text-stone-400 opacity-0 transition-opacity hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100" aria-label="Delete topic">×</button>
      </div>
      {topic.notes && <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{topic.notes}</p>}
      {topic.image && <img src={topic.image} alt="" className="mt-3 h-28 w-full rounded-xl object-cover" />}
      {topic.voice && <audio controls src={topic.voice} className="mt-3 h-8 w-full" />}
      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400"><span>{isDue ? "Ready to review" : `Review ${formatReviewDate(topic.nextDate)}`}</span><span>{isDue ? "Now" : `${days}d`}</span></div>
        <div className="mt-2 flex gap-1">{[1, 2, 3, 4, 5].map((step) => <span key={step} className={`h-1 flex-1 rounded-full ${step <= level ? "bg-blue-500" : dark ? "bg-white/10" : "bg-stone-200"}`} />)}</div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button onClick={() => onForget(topic)} className={`rounded-lg border px-3 py-2 text-xs font-medium ${dark ? "border-white/10 text-stone-300 hover:bg-white/6" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`}>Need work</button>
          <button onClick={() => onRevise(topic)} disabled={isMastered} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-500 disabled:cursor-default disabled:bg-blue-600/60">{isMastered ? "Mastered" : "I remembered"}</button>
        </div>
      </div>
    </article>
  );
}
