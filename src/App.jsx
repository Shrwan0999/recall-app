import { useState } from "react";
import { useTopics } from "./hooks/useTopics";
import AddTopic from "./components/AddTopic";
import TopicCard from "./components/TopicCard";

const INTERVALS = [0, 1, 3, 7, 15, 30];

export default function App() {
  const { topics, addNew, updateOne, remove } = useTopics();
  const [subjects, setSubjects] = useState(["DBMS", "java", "DSA", "math"]);
  const [filter, setFilter] = useState("All");
  const [dark, setDark] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("DBMS");
  

  const dueToday = topics.filter(t => {
    const d = new Date(t.nextDate); d.setHours(0,0,0,0);
    const today = new Date(); today.setHours(0,0,0,0);
    return d <= today;
  });

  const filtered = filter === "All"? topics : topics.filter(t => t.subject === filter);

  function handleRevise(topic) {
    const nextLevel = Math.min(topic.level + 1, 5);
    const d = new Date(); d.setDate(d.getDate() + INTERVALS[nextLevel]);
    updateOne(topic.id, { level: nextLevel, nextDate: d.toISOString() });
  }
  function handleForget(topic) {
    updateOne(topic.id, { level: 0, nextDate: new Date().toISOString(), _t: Date.now() });
  }

  return (
    <div className={`${dark? "bg-[#0a0a0a] text-zinc-100" : "bg-[#fbfaf8] text-zinc-900"} min-h-screen antialiased`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{font-family:'Inter',sans-serif}
      .card-enter{animation:enter 0.5s cubic-bezier(0.16,1,0.3,1) both}
        @keyframes enter{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      .scrollbar-none::-webkit-scrollbar{display:none}
      .scrollbar-none{scrollbar-width:none}
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex justify-between items-start mb-8 card-enter">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[32px] font-[800] tracking-tighter">Recall.</h1>
              <button onClick={() => setDark(!dark)} className={`w-9 h-9 rounded-full border flex items-center justify-center ${dark? "bg-zinc-800 border-zinc-700" : "bg-white border-zinc-200"}`}>{dark? "☀️" : "🌙"}</button>
            </div>
            <p className={`text-[13px] mt-2 ${dark? "text-zinc-400" : "text-zinc-500"}`}>Spaced repetition, but make it simple.</p>
          </div>
          <div className="flex gap-2">
            <div className={`border rounded-full px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 ${dark? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span>
              {dueToday.length} due
            </div>
            <div className="bg-zinc-900 text-white rounded-full px-4 py-2.5 text-xs font-semibold border border-zinc-800">{topics.length} total</div>
          </div>
        </div>

        {/* ADD SUBJECT - AB YEHI SELECTOR HAI */}
        <div className={`p-[18px] rounded-[22px] border mb-4 card-enter ${dark? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`} style={{animationDelay:'80ms'}}>
          <p className={`text-[11px] font-bold tracking-[0.14em] uppercase mb-3 px-1 ${dark? "text-zinc-500" : "text-zinc-400"}`}>Add Subject • Click to select</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const n = e.target.subject.value.trim();
            if (n &&!subjects.includes(n)) { setSubjects([...subjects, n]); setSelectedSubject(n); e.target.reset(); }
          }} className="flex gap-2">
            <input name="subject"  placeholder="e.g. DBMS, CN" className={`flex-1 border rounded-full px-5 py-3 text-[14px] outline-none ${dark? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" : "bg-zinc-50 border-zinc-200"}`} />
            <button type="submit" className={`border px-6 rounded-full text-[14px] font-semibold ${dark? "bg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900"}`}>Add</button>
          </form>
          <div className="flex flex-wrap gap-2 mt-4 px-1">
            {subjects.map(s => {
              const isSelected = selectedSubject === s;
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={`group flex items-center gap-1.5 pl-4 pr-1.5 py-2 rounded-full text-[13px] font-semibold border transition-all hover:scale-105 active:scale-95
                    ${isSelected? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"}`}
                >
                  {s}
                  <span onClick={(e) => { e.stopPropagation(); if(confirm(`Delete "${s}"?`)){ const newSubs = subjects.filter(x => x!== s); setSubjects(newSubs); if(selectedSubject===s) setSelectedSubject(newSubs[0]||""); if(filter===s) setFilter("All"); }}} className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ml-1 transition-colors ${isSelected? "bg-black/10 hover:bg-black/20" : "bg-white/10 hover:bg-white/20"}`}>✕</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ADD TOPIC - NO DROPDOWN */}
        <div className="mb-4 card-enter" style={{animationDelay:'140ms'}}>
          <AddTopic onAdd={addNew} selectedSubject={selectedSubject} dark={dark} />
        </div>

        {/* FILTER */}
        <div className="mt-8 mb-2 -mx-4 px-4 sm:mx-0 sm:px-0 card-enter" style={{animationDelay:'200ms'}}>
          <div className="flex gap-2 overflow-x-auto scrollbar-none items-center" style={{padding:'12px 4px 28px 4px', margin:'-12px 0 -20px 0'}}>
            {["All",...subjects].map(s => {
              const count = s === "All"? topics.length : topics.filter(t => t.subject === s).length;
              const active = filter === s;
              return (
                <button key={s} onClick={() => setFilter(s)} className={`whitespace-nowrap px-4 py-2.5 rounded-full text-[13px] font-semibold border shrink-0 transition-all ${active? "bg-white text-black border-white" : "bg-zinc-900 border-zinc-700 text-zinc-400"}`}>
                  {s} <span className="opacity-50 ml-1">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {dueToday.length > 0 && (
          <div className="mb-8 mt-4 card-enter" style={{animationDelay:'260ms'}}>
            <h2 className="text-[11px] font-bold tracking-[0.14em] uppercase text-zinc-500 mb-3 px-1 flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>Due Today • {dueToday.length}</h2>
            <div className="grid gap-3">{dueToday.map(t => (<TopicCard key={t.id} topic={t} onRevise={handleRevise} onForget={handleForget} onDelete={remove} isDue dark={dark} />))}</div>
          </div>
        )}

        <div className="pb-10 mt-6">
          <h2 className={`text-[11px] font-bold tracking-[0.14em] uppercase mb-3 px-1 ${dark? "text-zinc-500" : "text-zinc-400"}`}>{filter} • {filtered.length}</h2>
          <div className="grid gap-2.5">
            {filtered.map(t => {
              const d = new Date(t.nextDate); d.setHours(0,0,0,0);
              const today = new Date(); today.setHours(0,0,0,0);
              return (<TopicCard key={t.id} topic={t} onRevise={handleRevise} onForget={handleForget} onDelete={remove} isDue={d <= today} dark={dark} />);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}