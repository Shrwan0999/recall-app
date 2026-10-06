export default function TopicCard({ topic, onRevise, onForget, onDelete, isDue, dark }) {
  const isDone = topic.level >= 1 && !isDue;

  return (
    <div
      className={`
        group relative rounded-[20px] border p-4 transition-all duration-500
        ${isDue
          ? "bg-[#fff5f5] border-[#fecaca]"
          : isDone
          ? dark
            ? "bg-[#f0fdf4]/10 border-green-500/30"
            : "bg-[#f0fdf4] border-[#bbf7d0]"
          : dark
            ? "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700"
            : "bg-white border-zinc-200 hover:border-zinc-300"
        }
      `}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`
              px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase
              ${isDue ? "bg-red-600 text-white" : isDone ? "bg-green-600 text-white shadow-[0_0_10px_rgba(34,197,94,0.4)]" : "bg-zinc-900 text-white"}
            `}
          >
            {topic.subject}
          </span>
          <span className={`text-[13px] font-medium flex items-center gap-1.5 ${isDue ? "text-red-600" : isDone ? "text-green-600" : dark ? "text-zinc-400" : "text-zinc-500"}`}>
            <span className={`w-1 h-1 rounded-full ${isDue ? "bg-red-500" : isDone ? "bg-green-500" : "bg-zinc-400"}`}></span>
            Lvl {topic.level} • {isDue ? "Due today" : `in ${[1, 3, 7, 15, 30][topic.level - 1] || 0}d`}
          </span>
        </div>

        <button
          onClick={() => {
            if (confirm(`Delete "${topic.title}"?`)) onDelete(topic.id);
          }}
          className={`w-7 h-7 rounded-full border flex items-center justify-center text-[12px] transition-all hover:scale-110 ${dark && !isDone && !isDue ? "bg-zinc-800 border-zinc-700 text-zinc-400" : "bg-white border-zinc-200 text-zinc-400 hover:text-zinc-900"}`}
        >
          ✕
        </button>
      </div>

      <h3 className={`text-[16px] font-semibold tracking-tight mt-3 ${isDue ? "text-zinc-900" : isDone ? (dark ? "text-green-100" : "text-green-900") : dark ? "text-white" : "text-zinc-900"}`}>
        {topic.title}
      </h3>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onForget(topic)}
          className={`px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all active:scale-[0.96] ${isDone ? "bg-white border-green-200 text-green-700" : "bg-white border-zinc-200 text-zinc-600"}`}
        >
          Forgot
        </button>

        <button
          onClick={() => onRevise(topic)}
          className={`
            flex-1 rounded-full py-2.5 text-[13px] font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-1
            ${isDue ? "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-900 hover:text-white" : isDone ? "bg-green-600 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-700" : "bg-zinc-900 text-white hover:bg-black"}
          `}
        >
          {isDone ? "✓ Revised" : isDue ? "✓ Revise Now" : "Revise"}
        </button>
      </div>

      <div className="flex gap-1.5 mt-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${i <= topic.level ? (isDone ? "bg-green-600" : isDue ? "bg-red-500" : "bg-zinc-900") : dark ? "bg-zinc-800" : "bg-zinc-200"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}