import { useEffect, useState } from "react";

const STORAGE_KEY = "recall_topics";
const STREAK_KEY = "recall_streak";
const LAST_DATE_KEY = "recall_last_date";

function getDateStamp(date = new Date()) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(); }

function calculateNextStreak() {
  const lastDate = Number(localStorage.getItem(LAST_DATE_KEY) || 0);
  const today = getDateStamp();
  const yesterday = today - 86_400_000;
  const current = Number(localStorage.getItem(STREAK_KEY) || 0);
  if (lastDate === today) return current;
  const next = lastDate === yesterday ? current + 1 : 1;
  localStorage.setItem(LAST_DATE_KEY, String(today));
  localStorage.setItem(STREAK_KEY, String(next));
  return next;
}

function normaliseImportedTopic(topic) {
  return {
    id: topic.id || `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: topic.name || topic.title || "Untitled topic",
    subject: topic.subject || "General",
    level: Number.isFinite(topic.level) ? topic.level : 0,
    nextDate: topic.nextDate || new Date().toISOString(),
    createdAt: topic.createdAt || new Date().toISOString(),
    notes: topic.notes || "",
    image: topic.image || null,
    voice: topic.voice || null,
  };
}

function useTopics() {
  const [topics, setTopics] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });
  const [streak, setStreak] = useState(() => Number(localStorage.getItem(STREAK_KEY) || 0));
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(topics)); }, [topics]);

  function addNew(topic) {
    const newTopic = normaliseImportedTopic({ ...topic, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: new Date().toISOString(), nextDate: new Date().toISOString(), level: 0 });
    setTopics((current) => [newTopic, ...current]);
  }
  function updateOne(id, updates) {
    setTopics((current) => current.map((topic) => topic.id === id ? { ...topic, ...updates } : topic));
    setStreak(calculateNextStreak());
  }
  function remove(id) { setTopics((current) => current.filter((topic) => topic.id !== id)); }
  function clearAll() {
    setTopics([]);
    setStreak(0);
    localStorage.removeItem(STREAK_KEY);
    localStorage.removeItem(LAST_DATE_KEY);
  }
  function exportData() {
    const blob = new Blob([JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), topics }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `recall-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  function importData(data) {
    const imported = (Array.isArray(data) ? data : data?.topics)?.filter(Boolean).map(normaliseImportedTopic);
    if (!imported?.length) { alert("This backup does not contain any topics."); return; }
    setTopics((current) => {
      const ids = new Set(current.map((topic) => topic.id));
      const additions = imported.filter((topic) => !ids.has(topic.id));
      if (!additions.length && confirm(`All ${imported.length} imported topics already exist. Replace your current library?`)) return imported;
      return [...additions, ...current];
    });
    alert(`${imported.length} topic${imported.length === 1 ? "" : "s"} imported.`);
  }
  return { topics, addNew, updateOne, remove, streak, clearAll, exportData, importData };
}

export { useTopics };
export default useTopics;
