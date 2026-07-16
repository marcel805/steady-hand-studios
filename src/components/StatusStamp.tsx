export type JobStatus = "open" | "shortlisted" | "awarded" | "paid";

const CONFIG: Record<
  JobStatus,
  { label: string; className: string }
> = {
  open: {
    label: "Open for nominations",
    className: "border-stamp text-stamp-ink",
  },
  shortlisted: {
    label: "Shortlisting",
    className: "border-gold-ink text-gold-ink",
  },
  awarded: {
    label: "Winner picked",
    className: "border-ink text-ink",
  },
  paid: {
    label: "Paid out",
    className: "border-ink-soft text-ink-soft",
  },
};

export default function StatusStamp({ status }: { status: JobStatus }) {
  const c = CONFIG[status];
  return (
    <span
      className={`text-stamp inline-flex -rotate-2 items-center rounded-sm border-[2.5px] px-2.5 py-1 text-[11px] tracking-wide ${c.className}`}
    >
      {c.label}
    </span>
  );
}
