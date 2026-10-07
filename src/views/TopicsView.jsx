import AddTopic from "../components/AddTopic";
import SubjectPicker from "../components/SubjectPicker";
import TopicGrid from "../components/TopicGrid";

export default function TopicsView({ topics, subjects, subject, onSubjectChange, search, onSearchChange, onAdd, onRevise, onForget, onDelete, dark }) {
  return (
    <div className="space-y-6">
      <header><p className="text-sm text-stone-500 dark:text-stone-400">Knowledge library</p><h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Your topics.</h1></header>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search your topics" className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-emerald-500 focus:ring-2 ${dark ? "border-white/10 bg-[#191b1a] text-white placeholder:text-stone-500" : "border-stone-200 bg-white placeholder:text-stone-400"}`} />
          <div className="mt-4"><SubjectPicker subjects={subjects} selected={subject} onSelect={onSubjectChange} dark={dark} /></div>
          <p className="mt-5 text-xs text-stone-500 dark:text-stone-400">{topics.length} topic{topics.length === 1 ? "" : "s"} shown</p>
          <div className="mt-3"><TopicGrid topics={topics} onRevise={onRevise} onForget={onForget} onDelete={onDelete} dark={dark} emptyTitle="No matching topics" emptyDescription="Try another search or capture a new topic for this subject." /></div>
        </div>
        <AddTopic onAdd={onAdd} selectedSubject={subject === "All" ? subjects.find((item) => item !== "All") || "General" : subject} dark={dark} />
      </div>
    </div>
  );
}
