export default function SubjectPicker({ subjects, selected, onSelect, dark, includeAll = true }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {subjects.filter((subject) => includeAll || subject !== "All").map((subject) => (
        <button
          key={subject}
          onClick={() => onSelect(subject)}
          className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${selected === subject ? "border-emerald-500 bg-emerald-500 text-white" : dark ? "border-white/10 bg-white/4 text-stone-400 hover:bg-white/8" : "border-stone-200 bg-white text-stone-500 hover:bg-stone-50"}`}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}
