import { MASTERS } from "@/lib/business";

export default function DirectContacts() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {MASTERS.map((master) => (
        <a
          key={`${master.name}-${master.specialty}`}
          href={`tel:${master.phoneHref}`}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
        >
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {master.specialty}
          </div>
          <div className="mt-1 text-base font-bold text-brand-950">
            {master.name}
          </div>
          <div className="mt-1.5 text-sm font-semibold text-brand-700">
            {master.phoneDisplay}
          </div>
        </a>
      ))}
    </div>
  );
}
