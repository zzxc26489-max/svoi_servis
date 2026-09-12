import { getMastersByPerson } from "@/lib/business";
import { PhoneIcon } from "./icons";

// По карточке на человека, а не на направление. Мастеров двое, но у
// Андрея два номера — под стиральные и под посудомоечные машины.
// Тремя карточками подряд это читалось как три мастера, из них два
// «Андрея».
export default function DirectContacts() {
  const people = getMastersByPerson();

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {people.map((person) => (
        <li key={person.name} className="card flex flex-col p-5">
          <span className="font-display text-lg font-bold text-ink-900">
            {person.name}
          </span>

          <ul className="mt-3 space-y-3">
            {person.lines.map((line) => (
              <li key={line.phoneHref}>
                <a
                  href={`tel:${line.phoneHref}`}
                  className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <span className="block text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {line.specialty}
                  </span>
                  {/* whitespace-nowrap — иначе номер рвётся на две
                      строки в узкой колонке и выглядит сломанным */}
                  <span className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[0.95rem] font-semibold tabular-nums text-brand-700 transition-colors group-hover:text-brand-600">
                    <PhoneIcon className="h-4 w-4 shrink-0" />
                    {line.phoneDisplay}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
