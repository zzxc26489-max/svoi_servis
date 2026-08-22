import Logo from "./Logo";
import { MASTERS } from "@/lib/business";
import { PhoneIcon } from "./icons";

const navItems = [
  { href: "#services", label: "Услуги" },
  { href: "#prices", label: "Цены" },
  { href: "#how-it-works", label: "Как работаем" },
  { href: "#faq", label: "Вопросы" },
];

// В шапке показываем один номер — мастера по холодильникам как самому
// частому обращению. Полный список — в секции контактов и в подвале.
const primaryPhone = MASTERS[0];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          <Logo size={34} />
          <span className="font-display text-lg font-bold text-ink-900">
            Свой Сервис
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-500 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-brand-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={`tel:${primaryPhone.phoneHref}`}
            className="hidden items-center gap-2 text-sm font-semibold tabular-nums text-ink-900 transition-colors hover:text-brand-600 sm:flex"
          >
            <PhoneIcon className="h-4 w-4 text-brand-600" />
            {primaryPhone.phoneDisplay}
          </a>
          <a href="#order" className="btn-primary !min-h-[2.5rem] !px-4 text-sm">
            Вызвать мастера
          </a>
        </div>
      </div>
    </header>
  );
}
