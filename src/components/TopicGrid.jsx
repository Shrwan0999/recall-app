import TopicCard from "./TopicCard";
import EmptyState from "./EmptyState";
import { isDueDate } from "../utils/date";

export default function TopicGrid({ topics, onRevise, onForget, onDelete, dark, emptyTitle, emptyDescription, onEmptyAction }) {
  if (!topics.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} actionLabel={onEmptyAction ? "Add a topic" : undefined} onAction={onEmptyAction} dark={dark} />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} onRevise={onRevise} onForget={onForget} onDelete={onDelete} isDue={isDueDate(topic.nextDate)} dark={dark} />
      ))}
    </div>
  );
}
