import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Logo size={36} />
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

        <a href="#order" className="btn-primary !px-4 !py-2 text-sm">
          Оставить заявку
        </a>
      </div>
    </header>
  );
}
