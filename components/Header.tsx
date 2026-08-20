import { BUSINESS } from "@/lib/business";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">
            С
          </span>
          <span className="text-lg font-bold text-brand-950">
            Свой Сервис
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#services" className="hover:text-brand-700">
            Услуги
          </a>
          <a href="#how-it-works" className="hover:text-brand-700">
            Как это работает
          </a>
          <a href="#advantages" className="hover:text-brand-700">
            Почему мы
          </a>
          <a href="#faq" className="hover:text-brand-700">
            Вопросы
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BUSINESS.yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-semibold text-brand-900 hover:text-brand-700 lg:block"
          >
            {BUSINESS.address.street}, {BUSINESS.address.locality}
          </a>
          <a href="#order" className="btn-primary !px-4 !py-2 text-sm">
            Оставить заявку
          </a>
        </div>
      </div>
    </header>
  );
}
