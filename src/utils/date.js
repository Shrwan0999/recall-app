export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function isDueDate(dateString) {
  if (!dateString) return true;
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date <= startOfToday();
}

export function formatReviewDate(dateString) {
  if (!dateString) return "Today";
  const date = new Date(dateString);
  const today = startOfToday();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date <= today) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

export function getDaysUntilReview(dateString) {
  if (isDueDate(dateString)) return 0;
  const difference = new Date(dateString).setHours(0, 0, 0, 0) - startOfToday();
  return Math.ceil(difference / 86_400_000);
}
