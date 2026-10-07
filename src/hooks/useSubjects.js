import { useEffect, useState } from "react";

const STORAGE_KEY = "recall_subjects";
const FALLBACK_SUBJECTS = ["All", "DBMS", "Java", "DSA"];

export function useSubjects() {
  const [subjects, setSubjects] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const validSubjects = Array.isArray(stored) ? stored.filter(Boolean) : [];
      return validSubjects.includes("All") ? validSubjects : ["All", ...validSubjects.length ? validSubjects : FALLBACK_SUBJECTS.slice(1)];
    } catch {
      return FALLBACK_SUBJECTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  function addSubject(name) {
    const cleanName = name.trim();
    if (!cleanName || subjects.some((subject) => subject.toLowerCase() === cleanName.toLowerCase())) return false;
    setSubjects((current) => [...current, cleanName]);
    return cleanName;
  }

  function removeSubject(name) {
    if (name === "All") return;
    setSubjects((current) => current.filter((subject) => subject !== name));
  }

  function mergeSubjects(names) {
    setSubjects((current) => {
      const known = current.map((subject) => subject.toLowerCase());
      return [...current, ...names.filter((name) => name && !known.includes(name.toLowerCase()))];
    });
  }

  return { subjects, addSubject, removeSubject, mergeSubjects };
}
