import { BUSINESS, MASTERS } from "@/lib/business";
import Logo from "./Logo";
import { TelegramIcon, MapIcon, PhoneIcon } from "./icons";

const contactTelegram =
  process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/your_username";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 py-14 text-brand-100/70">
      <div className="container-x">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-display text-lg font-bold text-white">
                Свой Сервис
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Ремонт холодильников, стиральных и посудомоечных машин на дому
              и в мастерской. Другую бытовую технику принимаем в ремонт
              через проверенных партнёров.
            </p>
            <p className="mt-4 text-sm">
              <span className="text-white/90">Зона выезда:</span>{" "}
              {BUSINESS.primaryAreas.join(", ")} — и по договорённости{" "}
              {BUSINESS.extendedAreas.join(", ")}.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Телефоны мастеров</h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              {MASTERS.map((master) => (
                <li key={`${master.name}-${master.specialty}`}>
                  <a
                    href={`tel:${master.phoneHref}`}
                    className="group flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0 opacity-60" />
                    <span className="whitespace-nowrap tabular-nums">
                      {master.phoneDisplay}
                    </span>
                  </a>
                  <span className="ml-6 text-xs text-brand-100/45">
                    {master.specialty} · {master.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Мастерская</h2>
            <address className="mt-3 space-y-2 text-sm not-italic leading-relaxed">
              <p>
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.locality}
              </p>
              <p>{BUSINESS.hours}</p>
            </address>
            <div className="mt-4 space-y-2.5 text-sm">
              <a
                href={BUSINESS.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MapIcon className="h-4 w-4 opacity-60" />
                Яндекс.Карты
              </a>
              <a
                href={contactTelegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <TelegramIcon className="h-4 w-4 opacity-60" />
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-brand-100/45">
          © {year} Свой Сервис · сервисный центр «{BUSINESS.name}»
        </div>
      </div>
    </footer>
  );
}
