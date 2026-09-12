"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";

// Показываем стрелку, только когда пролистали больше экрана — на
// первом экране она не нужна, там и так всё видно.
const SHOW_AFTER_PX = 600;

export default function BackToTopButton() {
  const [scrolled, setScrolled] = useState(false);
  // Секции, над которыми кнопку прячем: она круглая, висит поверх и
  // садится на то, по чему человек как раз собирался нажать — кнопки
  // «Telegram»/«WhatsApp» в форме, ссылку под вопросами. По формам
  // тот же приём и те же секции, что и в StickyCallBar.
  const [overForm, setOverForm] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // faq — последняя секция перед подвалом, и в ней своя ссылка
    // в правом нижнем углу: круглая кнопка садилась прямо на неё.
    const targets = ["top", "order", "faq"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const blocking = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) blocking.add(entry.target);
          else blocking.delete(entry.target);
        }
        setOverForm(blocking.size > 0);
      },
      { rootMargin: "0px 0px -25% 0px" },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = scrolled && !overForm;

  function scrollToTop() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Наверх страницы"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      // bottom-20 на мобильном — чтобы не перекрываться с липкой
      // полосой звонка (StickyCallBar), у неё своя высота снизу.
      className={`fixed bottom-20 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-white shadow-lg shadow-ink-900/25 transition-all duration-300 hover:bg-ink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </button>
  );
}
