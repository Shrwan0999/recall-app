import { useState } from "react";
import { formatReviewDate } from "../utils/date";

export default function FocusReview({ topic, onRemember, onForget, dark, compact = false }) {
  const [revealedTopicId, setRevealedTopicId] = useState(null);
  if (!topic) return null;
  const revealed = revealedTopicId === topic.id;
  const base = dark ? "border-[#283552] bg-[#131b2d]" : "border-stone-200 bg-white";
  return (
    <section className={`overflow-hidden rounded-2xl border shadow-[0_18px_50px_rgba(1,8,25,0.22)] ${base}`}>
      <div className="flex items-center justify-between border-b border-white/8 bg-gradient-to-r from-[#2855e8] to-[#6446e8] px-5 py-3 text-white">
        <div><p className="text-sm font-semibold">Topic review</p><p className="text-[11px] text-white/70">{topic.subject || "General"} · active recall</p></div>
        <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold">{Math.round(((topic.level ?? 0) / 5) * 100)}% CONFIDENCE</span>
      </div>
      <button onClick={() => setRevealedTopicId(revealed ? null : topic.id)} className={`flex w-full flex-col items-center justify-center px-8 text-center ${compact ? "min-h-[220px]" : "min-h-[290px]"}`}>
        <span className="mb-5 grid size-11 place-items-center rounded-full bg-blue-500/10 text-xl text-blue-400">?</span>
        <p className="max-w-xl text-lg font-semibold leading-relaxed sm:text-xl">{revealed ? (topic.notes || "No extra notes were added for this topic.") : topic.name || topic.title}</p>
        <p className="mt-5 text-xs text-stone-500">{revealed ? "Tap to show the question again" : "Pause and recall the answer, then tap to reveal it"}</p>
      </button>
      <div className={`flex items-center justify-between border-t px-5 py-3 text-[11px] ${dark ? "border-white/8 text-stone-400" : "border-stone-100 text-stone-500"}`}><span>Next review: {formatReviewDate(topic.nextDate)}</span><span>Level {topic.level ?? 0} / 5</span></div>
      {revealed && <div className={`grid grid-cols-2 gap-3 border-t p-4 ${dark ? "border-white/8 bg-black/15" : "border-stone-100 bg-stone-50"}`}><button onClick={() => { onForget(topic); setRevealedTopicId(null); }} className={`rounded-xl border px-4 py-2.5 text-sm font-semibold ${dark ? "border-white/10 text-stone-300 hover:bg-white/6" : "border-stone-200 text-stone-600 hover:bg-white"}`}>Still learning</button><button onClick={() => { onRemember(topic); setRevealedTopicId(null); }} className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600">I remembered</button></div>}
    </section>
  );
}
