"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type CarouselProps = {
  ariaLabel: string;
  /** Готовые <li key=...> элементы — карточки у каждой секции свои. */
  items: React.ReactNode[];
  /** Пауза между автопрокруткой, мс. 0 — без автопрокрутки. */
  autoPlayMs?: number;
  /** Цвет фона секции — для градиента-подсказки у правого края
      (должен совпадать с bg секции, иначе виден шов). */
  fadeFrom?: "from-white" | "from-mist-50";
};

// Общая карусель для «Отзывов», «Какую технику ремонтируем» и «С чем
// мы работаем»: едет сама, пока её не трогают, и прокручивается вручную
// (свайп, стрелки, клавиатура). Затухание у правого края и стрелки —
// подсказка, что список можно листать дальше.
export default function Carousel({
  ariaLabel,
  items,
  autoPlayMs = 4500,
  fadeFrom = "from-white",
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pausedRef = useRef(false);

  const syncArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setAtStart(scrollLeft < 8);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 8);
  }, []);

  useEffect(() => {
    syncArrows();
    window.addEventListener("resize", syncArrows);
    return () => window.removeEventListener("resize", syncArrows);
  }, [syncArrows]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Прокручиваем ровно на ширину видимой области минус отступ,
    // чтобы карточки не «резались» пополам.
    const step = Math.max(track.clientWidth * 0.8, 280);
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  // Автопрокрутка должна идти, только пока карусель реально видна —
  // иначе она уезжает вперёд, пока человек ещё листает страницу выше,
  // и к моменту, когда до неё доскроллят, там уже не первая карточка
  // (для «Какую технику мы ремонтируем» это особенно важно — там
  // сначала должны быть видны холодильники/стиралки/посудомойки).
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoPlayMs || items.length < 2 || !isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = track;
      if (scrollLeft + clientWidth >= scrollWidth - 8) {
        // Долистали до конца — начинаем заново (бесконечная лента).
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, autoPlayMs);

    return () => clearInterval(id);
  }, [autoPlayMs, items.length, scrollByCard, isVisible]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div ref={wrapRef} className="relative">
      <ul
        ref={trackRef}
        onScroll={syncArrows}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onFocus={pause}
        onBlur={resume}
        tabIndex={0}
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items}
      </ul>

      {/* Затухание у правого края — визуальная подсказка, что список
          продолжается за рамкой экрана. */}
      {!atEnd && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l ${fadeFrom} to-transparent sm:block`}
        />
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Прокрутить назад"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-700"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Прокрутить вперёд"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-700"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
