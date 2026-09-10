"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { MASTERS } from "@/lib/business";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

// Ссылки ведут на главную с якорем («/#services»), а не просто
// «#services»: со страницы архива работ голый якорь никуда не ведёт.
// next/link сам подставляет basePath на превью GitHub Pages.
const navItems = [
  { href: "/#services", label: "Услуги" },
  { href: "/#prices", label: "Цены" },
  { href: "/works", label: "Работы" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/vopros-otvet", label: "Вопрос мастеру" },
];

// Только в мобильном меню — в верхней навигации и так тесно. Контакты
// и политика не нужны на видном месте на десктопе, где всё это уже
// есть в подвале и в секции заявки.
const mobileOnlyItems = [
  { href: "/#order", label: "Контакты" },
  { href: "/privacy", label: "Обработка персональных данных" },
];

// В шапке показываем один номер — мастера по холодильникам как самому
// частому обращению. Полный список — в секции контактов и в подвале.
const primaryPhone = MASTERS[0];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // На главной клик по логотипу никуда не ведёт (та же страница) —
  // Next.js в этом случае не скроллит, поэтому поднимаем наверх сами.
  // На остальных страницах переход на «/» и так открывает её сверху.
  function handleLogoClick(event: React.MouseEvent) {
    if (pathname !== "/") return;
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex min-h-[2.75rem] shrink-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <Logo size={34} />
            <span className="font-display text-lg font-bold text-ink-900">
              Свой Сервис
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-ink-500 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-brand-600"
              >
                {item.label}
              </Link>
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
            {/* !hidden/lg:!inline-flex, а не просто hidden/lg:inline-flex:
                .btn-primary сама задаёт display (через @apply btn), и в
                каскаде она идёт позже обычных утилит — без !important
                «hidden» её проигрывает, кнопка остаётся видимой ниже lg. */}
            <Link
              href="/#order"
              className="btn-primary !hidden !min-h-[2.5rem] !px-4 text-sm lg:!inline-flex"
            >
              Вызвать мастера
            </Link>

            {/* От lg — полное меню сверху, кнопка не нужна. До lg —
                открывает список страниц ниже, включая «Вызвать
                мастера» уже как обычную ссылку на форму — она
                рабочая, просто раньше терялась среди мелких элементов
                шапки. */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-700 transition-colors hover:bg-mist-100 lg:hidden"
            >
              {menuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Вне <header>: у него backdrop-blur (backdrop-filter), а это
          создаёт containing block для position:fixed потомков —
          вложенный оверлей схлопнулся бы внутри 64px шапки и не ловил
          бы клики по всей высоте экрана. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white lg:hidden"
        >
          <nav className="container-x flex flex-col gap-1 py-6 text-base font-medium text-ink-700">
            {[...navItems, ...mobileOnlyItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 transition-colors hover:bg-mist-50 hover:text-brand-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="container-x flex flex-col gap-3 border-t border-line py-6">
            <a
              href={`tel:${primaryPhone.phoneHref}`}
              onClick={() => setMenuOpen(false)}
              className="btn-secondary w-full"
            >
              <PhoneIcon className="h-4 w-4 text-brand-600" />
              {primaryPhone.phoneDisplay}
            </a>
            <Link
              href="/#order"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full"
            >
              Вызвать мастера
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
