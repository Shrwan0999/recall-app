import { useState } from "react";

export default function AddTopic({ onAdd, selectedSubject, dark }) {
  const [title, setTitle] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    if (!selectedSubject) { alert("Pahle subject select kar bhai!"); return; }
    onAdd({ title: title.trim(), subject: selectedSubject });
    setTitle("");
  }

  return (
    <div className={`p-[18px] rounded-[22px] border transition-all ${dark? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"}`}>
      <div className="flex justify-between items-center mb-3 px-1">
        <p className={`text-[11px] font-bold tracking-[0.14em] uppercase ${dark? "text-zinc-500" : "text-zinc-400"}`}>Add Topic</p>
        {selectedSubject && (
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${dark? "bg-white text-black" : "bg-zinc-900 text-white"}`}>
            in {selectedSubject}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
          placeholder={selectedSubject? `Enter topic in ${selectedSubject}, e.g. Indexing` : "Pahle upar se subject select kar"}
          className={`flex-1 border rounded-full px-5 py-3 text-[14px] outline-none ${dark? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-white/30" : "bg-zinc-50 border-zinc-200 focus:border-zinc-900"}`}
        />
        <button onClick={handleAdd} className={`px-6 rounded-full text-[14px] font-semibold active:scale-[0.96] transition-all ${dark? "bg-white text-black" : "bg-zinc-900 text-white"}`}>
          Add
        </button>
      </div>
    </div>
  );
}