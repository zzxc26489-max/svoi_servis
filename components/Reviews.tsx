"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BUSINESS, REVIEWS } from "@/lib/business";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  QuoteIcon,
  StarIcon,
  ArrowRightIcon,
} from "./icons";

export default function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    // Прокручиваем ровно на ширину видимой области минус отступ,
    // чтобы карточки не «резались» пополам.
    const step = Math.max(track.clientWidth * 0.8, 280);
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="section bg-mist-50">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Отзывы</p>
            <h2 className="section-title">Что говорят клиенты</h2>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-500">
              <span className="inline-flex items-center gap-1 text-amber-500">
                {Array.from({ length: 4 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
                <StarIcon className="h-4 w-4 opacity-40" />
              </span>
              <span className="font-semibold text-ink-900">
                {BUSINESS.rating.value.toString().replace(".", ",")}
              </span>
              <span>
                · {BUSINESS.rating.ratingsCount} оценок на Яндекс.Картах
              </span>
            </p>
          </div>

          {/* Стрелки — для мыши; свайп и клавиатура работают и без них */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Предыдущие отзывы"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-700"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="Следующие отзывы"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:text-ink-700"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Прокрутка живёт внутри своего контейнера — страница вбок
            не едет. Клавиатура и свайп работают нативно. */}
        <ul
          ref={trackRef}
          onScroll={syncArrows}
          tabIndex={0}
          aria-label="Отзывы клиентов с Яндекс.Карт"
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <li
              key={review.author}
              className="flex w-[19rem] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-6 sm:w-[22rem]"
            >
              <QuoteIcon className="h-7 w-7 shrink-0 text-brand-200" />

              <p className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-ink-700">
                {review.text}
              </p>

              <div className="mt-5 border-t border-line pt-4">
                <p className="font-semibold text-ink-900">{review.author}</p>
                {review.tag && (
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
                    {review.tag}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <a
          href={BUSINESS.yandexMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Все отзывы на Яндекс.Картах
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
