export default function SectionLabel({
  index,
  label,
  tone = "ink",
}: {
  index?: string;
  label: string;
  tone?: "ink" | "paper";
}) {
  const color = tone === "ink" ? "text-ink-soft" : "text-paper-2/70";
  const rule = tone === "ink" ? "bg-ink/25" : "bg-paper-2/25";
  return (
    <div className={`mb-6 flex items-center gap-3 ${color}`}>
      {index && <span className="text-mono-label text-xs">{index}</span>}
      <span className={`h-px flex-1 max-w-10 ${rule}`} />
      <span className="text-mono-label text-xs">{label}</span>
      <span className={`h-px flex-1 ${rule}`} />
    </div>
  );
}
