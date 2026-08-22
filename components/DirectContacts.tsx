import { MASTERS } from "@/lib/business";
import { PhoneIcon } from "./icons";

export default function DirectContacts() {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {MASTERS.map((master) => (
        <li key={`${master.name}-${master.specialty}`}>
          <a
            href={`tel:${master.phoneHref}`}
            className="card-hover group flex h-full flex-col gap-3 p-5"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              {master.specialty}
            </span>
            <span className="mt-auto">
              <span className="block font-display text-lg font-bold text-ink-900">
                {master.name}
              </span>
              {/* whitespace-nowrap — иначе номер рвётся на две строки
                  в узкой колонке и выглядит сломанным */}
              <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[0.95rem] font-semibold tabular-nums text-brand-700">
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {master.phoneDisplay}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
