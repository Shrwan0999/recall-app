export default function StatCard({ label, value, detail, tone = "default", dark }) {
  const tones = {
    default: dark ? "border-[#283552] bg-[#131b2d]" : "border-stone-200 bg-white",
    alert: dark ? "border-amber-400/20 bg-[#211c18]" : "border-amber-200 bg-amber-50",
    success: dark ? "border-emerald-400/20 bg-[#10251f]" : "border-emerald-200 bg-emerald-50",
    info: dark ? "border-blue-400/20 bg-[#141f3b]" : "border-blue-200 bg-blue-50",
  };

  return (
    <article className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <p className="text-xs font-medium text-stone-500 dark:text-stone-400">{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
      {detail && <p className="mt-1 text-[11px] text-stone-500 dark:text-stone-400">{detail}</p>}
    </article>
  );
}
