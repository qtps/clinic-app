import Link from "next/link";

export default function ServiceCard({
  icon,
  title,
  description,
  accent,
  service,
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-lg border border-line bg-white p-6 hover:scale-05 hover:shadow-lg transition-transform duration-300 "
      style={{ borderTopWidth: "3px", borderTopColor: accent }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${accent}1A`, color: accent }}
      >
        {icon}
      </div>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="text-sm leading-relaxed text-ink/70">{description}</p>
      <Link
        href={`/booking?service=${encodeURIComponent(service)}`}
        className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-dark"
      >
        Book this service
      </Link>
    </div>
  );
}
