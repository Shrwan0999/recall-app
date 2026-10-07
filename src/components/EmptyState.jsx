export default function EmptyState({ title, description, actionLabel, onAction, dark }) {
  return (
    <div className={`rounded-2xl border border-dashed px-6 py-14 text-center ${dark ? "border-white/10 bg-white/[0.02]" : "border-stone-200 bg-stone-50"}`}>
      <p className="text-base font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500 dark:text-stone-400">{description}</p>
      {actionLabel && <button onClick={onAction} className="mt-5 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">{actionLabel}</button>}
    </div>
  );
}
