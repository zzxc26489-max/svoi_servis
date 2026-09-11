"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, Phone, X } from "@phosphor-icons/react";
import BrandMark from "./BrandMark";
import { BUSINESS, MASTERS } from "@/lib/business";

const navItems = [
  { href: "/#services", label: "Услуги" },
  { href: "/#prices", label: "Цены" },
  { href: "/works", label: "Работы" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/vopros-otvet", label: "Вопрос мастеру" },
];

const mobileItems = [...navItems, { href: "/#order", label: "Контакты" }];
const primaryPhone = MASTERS[0];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  function handleLogoClick(event: React.MouseEvent) {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-xl">
        <div className="container-x flex h-[68px] items-center justify-between gap-5">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex min-h-11 shrink-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <BrandMark className="h-10 w-10 lg:h-11 lg:w-11" />
            <span className="block leading-none">
              <span className="block font-display text-[18px] font-extrabold tracking-[-0.03em] text-ink-900 lg:text-[21px]">
                Свой Сервис
              </span>
              <span className="mt-1 block text-[8px] font-medium text-ink-500 sm:text-[10px]">
                Ремонт бытовой техники
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[14px] font-medium text-ink-700 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 lg:gap-5">
            <a
              href={`tel:${primaryPhone.phoneHref}`}
              aria-label={`Позвонить: ${primaryPhone.phoneDisplay}`}
              className="inline-flex min-h-11 items-center gap-3 rounded-xl text-ink-900 transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:px-1"
            >
              <Phone weight="bold" className="h-5 w-5 text-brand-500" />
              <span className="hidden text-right lg:block">
                <span className="block text-[16px] font-bold tabular-nums leading-none">
                  {primaryPhone.phoneDisplay}
                </span>
                <span className="mt-1.5 block text-[10px] font-medium text-ink-400">
                  {BUSINESS.hours}
                </span>
              </span>
            </a>

            <Link
              href="/#order"
              className="btn-primary !hidden !min-h-[46px] !rounded-[11px] !px-6 text-sm xl:!inline-flex"
            >
              Вызвать мастера
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-ink-900 transition-colors hover:bg-mist-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 xl:hidden"
            >
              {menuOpen ? <X className="h-7 w-7" /> : <List className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[68px] z-40 overflow-y-auto bg-white xl:hidden"
        >
          <nav className="container-x flex flex-col gap-1 py-6 text-base font-semibold text-ink-900">
            {mobileItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3.5 transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="container-x border-t border-line py-6">
            <a
              href={`tel:${primaryPhone.phoneHref}`}
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full"
            >
              <Phone weight="bold" className="h-5 w-5" />
              {primaryPhone.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
