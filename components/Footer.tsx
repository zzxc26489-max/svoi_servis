import { BUSINESS } from "@/lib/business";

const contactTelegram =
  process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/your_username";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-brand-950 py-12 text-brand-100/80">
      <div className="container-x flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="text-lg font-bold text-white">Свой Сервис</span>
          <p className="mt-1 text-sm text-brand-100/70">
            сервисный центр «{BUSINESS.name}» · {BUSINESS.address.locality}
          </p>
          <p className="mt-3 max-w-sm text-sm">
            Ремонт бытовой техники на дому и в мастерской: холодильники,
            стиральные и посудомоечные машины, а также другая техника.
          </p>
          <p className="mt-2 max-w-sm text-xs text-brand-100/60">
            Зона выезда: {BUSINESS.primaryAreas.join(", ")} — и по
            договорённости {BUSINESS.extendedAreas.join(", ")}.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <span>{BUSINESS.address.full}</span>
          <span>{BUSINESS.hours}</span>
          <a
            href={BUSINESS.yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Мы на Яндекс.Картах
          </a>
          <a
            href={contactTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Telegram
          </a>
          <span>© {year} Свой Сервис. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
