import { useState, useEffect } from "react";

function getInitialTopics() {
  const saved = localStorage.getItem("recall_topics");
  if (saved) {
    try { return JSON.parse(saved); } catch { return []; }
  }
  return [];
}

export function useTopics() {
  const [topics, setTopics] = useState(getInitialTopics);

  useEffect(() => {
    localStorage.setItem("recall_topics", JSON.stringify(topics));
  }, [topics]);

  function addNew({ title, subject }) {
    const newTopic = {
      id: Date.now(),
      title,
      subject,
      level: 0,
      nextDate: new Date().toISOString(),
    };
    setTopics(prev => [newTopic,...prev]);
  }

  function updateOne(id, data) {
    setTopics(prev => prev.map(t => t.id === id? {...t,...data} : t));
  }

  function remove(id) {
    setTopics(prev => prev.filter(t => t.id!== id));
  }

  return { topics, addNew, updateOne, remove };
}