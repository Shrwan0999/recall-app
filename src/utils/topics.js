  import { isDueDate } from "./date";

export const REVIEW_INTERVALS = [0, 1, 3, 7, 15, 30, 60];

export function getUniqueTopics(topics) {
  const seen = new Set();
  return topics.filter((topic) => {
    if (!topic?.id || seen.has(topic.id)) return false;
    seen.add(topic.id);
    return true;
  });
}

export function getTopicStats(topics) {
  return {
    total: topics.length,
    due: topics.filter((topic) => isDueDate(topic.nextDate)).length,
    new: topics.filter((topic) => (topic.level ?? 0) === 0).length,
    reviewed: topics.filter((topic) => (topic.level ?? 0) > 0).length,
    mastered: topics.filter((topic) => (topic.level ?? 0) >= 5).length,
  };
}

export function getSubjectBreakdown(topics, subjects) {
  return subjects
    .filter((subject) => subject !== "All")
    .map((subject) => {
      const subjectTopics = topics.filter((topic) => topic.subject === subject);
      return { subject, ...getTopicStats(subjectTopics) };
    })
    .filter(({ total }) => total > 0);
}

export function getReviewUpdate(topic, remembered) {
  const level = topic.level ?? 0;
  const nextLevel = remembered ? Math.min(level + 1, 5) : Math.max(level - 1, 0);
  const nextDate = new Date();
  nextDate.setHours(0, 0, 0, 0);
  if (remembered) nextDate.setDate(nextDate.getDate() + (REVIEW_INTERVALS[nextLevel] || 30));

  return { level: nextLevel, nextDate: nextDate.toISOString() };
}
