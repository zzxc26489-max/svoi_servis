import Link from "next/link";
import { BUSINESS, MASTERS, joinRu } from "@/lib/business";
import Logo from "./Logo";
import { TelegramIcon, WhatsAppIcon, MapIcon, PhoneIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark-texture bg-ink-950 py-14 text-brand-100/70">
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
              и в мастерской.
            </p>
            <p className="mt-4 text-sm">
              <span className="text-white/90">Зона выезда:</span>{" "}
              {BUSINESS.primaryAreas.join(", ")} — и по договорённости{" "}
              {joinRu(BUSINESS.extendedAreas.slice(0, 5))}, а также другие
              города Подмосковья — уточняйте по заявке.
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
                href={BUSINESS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <TelegramIcon className="h-4 w-4 opacity-60" />
                Написать в Telegram
              </a>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 opacity-60" />
                WhatsApp
              </a>
              <a
                href={BUSINESS.telegramGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <TelegramIcon className="h-4 w-4 opacity-60" />
                Группа в Telegram
              </a>
            </div>
          </div>
        </div>

        {/* pb на мобильном — под липкую полосу звонка, иначе она
            перекрывает последнюю строку подвала. */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pb-16 pt-6 text-xs text-brand-100/45 sm:flex-row sm:items-center sm:justify-between sm:pb-0">
          <p>© {year} Свой Сервис · сервисный центр «{BUSINESS.name}»</p>
          <Link
            href="/privacy"
            className="transition-colors hover:text-white"
          >
            Обработка персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
}
