import { useEffect, useMemo, useRef, useState } from "react";
import AppSidebar from "./components/AppSidebar";
import { useSubjects } from "./hooks/useSubjects";
import { useTopics } from "./hooks/useTopics";
import DashboardView from "./views/DashboardView";
import ProgressView from "./views/ProgressView";
import ReviewView from "./views/ReviewView";
import SubjectsView from "./views/SubjectsView";
import TopicsView from "./views/TopicsView";
import { getReviewUpdate, getSubjectBreakdown, getTopicStats, getUniqueTopics } from "./utils/topics";
import { isDueDate } from "./utils/date";

const viewTitles = { dashboard: "Dashboard", review: "Active recall", topics: "Topics", progress: "Progress", subjects: "Subjects" };

export default function App() {
  const { topics: storedTopics, addNew, updateOne, remove, streak, exportData, importData, clearAll } = useTopics();
  const { subjects, addSubject, removeSubject, mergeSubjects } = useSubjects();
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recall_dark") ?? "true"); } catch { return true; }
  });
  const importInputRef = useRef(null);

  useEffect(() => { localStorage.setItem("recall_dark", JSON.stringify(dark)); }, [dark]);

  const topics = useMemo(() => getUniqueTopics(storedTopics), [storedTopics]);
  const stats = useMemo(() => getTopicStats(topics), [topics]);
  const dueTopics = useMemo(() => topics.filter((topic) => isDueDate(topic.nextDate)).sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate)), [topics]);
  const recentTopics = useMemo(() => [...topics].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)), [topics]);
  const filteredTopics = useMemo(() => topics.filter((topic) => {
    const query = search.trim().toLowerCase();
    const text = `${topic.name || topic.title || ""} ${topic.subject || ""} ${topic.notes || ""}`.toLowerCase();
    return (selectedSubject === "All" || topic.subject === selectedSubject) && (!query || text.includes(query));
  }), [topics, selectedSubject, search]);
  const breakdown = useMemo(() => getSubjectBreakdown(topics, subjects), [topics, subjects]);

  function navigate(view, subject) {
    if (subject) setSelectedSubject(subject);
    setActiveView(view);
    setMobileMenuOpen(false);
  }
  function addTopic(topic) {
    const subject = topic.subject === "All" ? subjects.find((item) => item !== "All") || "General" : topic.subject;
    if (!subjects.some((item) => item.toLowerCase() === subject.toLowerCase())) mergeSubjects([subject]);
    addNew({ ...topic, subject });
  }
  function reviewTopic(topic, remembered) { updateOne(topic.id, getReviewUpdate(topic, remembered)); }
  function removeChosenSubject(subject) { removeSubject(subject); if (selectedSubject === subject) setSelectedSubject("All"); }
  function addNewSubject(name) { const created = addSubject(name); if (created) setSelectedSubject(created); return created; }
  function handleImport(event) {
    const [file] = event.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      try {
        const data = JSON.parse(target.result);
        const imported = Array.isArray(data) ? data : data.topics;
        if (!Array.isArray(imported)) throw new Error("Invalid data");
        mergeSubjects(imported.map((topic) => topic.subject).filter(Boolean));
        importData(data);
      } catch { alert("That backup file could not be read. Please choose a Recall JSON backup."); }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  const pageProps = { dark, stats, dueTopics, recentTopics, onRevise: (topic) => reviewTopic(topic, true), onForget: (topic) => reviewTopic(topic, false), onDelete: remove };
  let page;
  if (activeView === "review") page = <ReviewView {...pageProps} />;
  else if (activeView === "topics") page = <TopicsView {...pageProps} topics={filteredTopics} subjects={subjects} subject={selectedSubject} onSubjectChange={setSelectedSubject} search={search} onSearchChange={setSearch} onAdd={addTopic} />;
  else if (activeView === "progress") page = <ProgressView stats={stats} breakdown={breakdown} dark={dark} />;
  else if (activeView === "subjects") page = <SubjectsView subjects={subjects} breakdown={breakdown} onAdd={addNewSubject} onRemove={removeChosenSubject} onChoose={(subject) => { setSelectedSubject(subject); navigate("topics"); }} dark={dark} />;
  else page = <DashboardView {...pageProps} subjects={subjects} breakdown={breakdown} selectedSubject={subjects.find((subject) => subject !== "All") || "General"} onAdd={addTopic} onNavigate={navigate} />;

  const theme = dark ? "bg-[#080d19] text-stone-100" : "bg-[#f8f8f6] text-stone-900";
  return (
    <div className={`min-h-screen ${theme}`}>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[250px_minmax(0,1fr)]">
        <div className="hidden lg:block"><div className="fixed inset-y-0 w-[250px]"><AppSidebar activeView={activeView} onNavigate={navigate} dark={dark} streak={streak} onToggleTheme={() => setDark((value) => !value)} /></div></div>
        <div className="min-w-0">
          <header className={`sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 backdrop-blur sm:px-8 ${dark ? "border-[#24304a] bg-[#080d19]/90" : "border-stone-200 bg-[#f8f8f6]/90"}`}>
            <div className="flex items-center gap-3"><button onClick={() => setMobileMenuOpen(true)} className={`grid size-9 place-items-center rounded-lg lg:hidden ${dark ? "hover:bg-white/8" : "hover:bg-stone-100"}`} aria-label="Open navigation">☰</button><div><p className="text-sm font-semibold">{viewTitles[activeView]}</p><p className="hidden text-[11px] text-stone-500 sm:block">Build durable knowledge, one review at a time.</p></div></div>
            <div className="flex items-center gap-1.5 sm:gap-2"><input ref={importInputRef} type="file" accept="application/json,.json" onChange={handleImport} className="hidden" /><button onClick={() => importInputRef.current?.click()} className={`rounded-lg border px-2.5 py-2 text-xs font-medium sm:px-3 ${dark ? "border-white/10 hover:bg-white/6" : "border-stone-200 bg-white hover:bg-stone-50"}`}>Import</button><button onClick={exportData} className={`rounded-lg border px-2.5 py-2 text-xs font-medium sm:px-3 ${dark ? "border-white/10 hover:bg-white/6" : "border-stone-200 bg-white hover:bg-stone-50"}`}>Export</button><button onClick={() => { if (confirm(`Delete all ${topics.length} topics? This cannot be undone.`)) clearAll(); }} className="rounded-lg px-2.5 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 sm:px-3">Clear</button></div>
          </header>
          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 lg:px-10">{page}</main>
        </div>
      </div>
      {mobileMenuOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-black/45" aria-label="Close navigation" onClick={() => setMobileMenuOpen(false)} /><div className="relative h-full w-[280px]"><AppSidebar activeView={activeView} onNavigate={navigate} dark={dark} streak={streak} onToggleTheme={() => setDark((value) => !value)} /></div></div>}
    </div>
  );
}
