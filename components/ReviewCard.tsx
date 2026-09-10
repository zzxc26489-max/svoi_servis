"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/lib/business";
import { QuoteIcon, StarIcon } from "./icons";

// В свёрнутом виде показываем 5 строк (класс line-clamp-5 ниже —
// именно литералом: Tailwind ищет классы по тексту исходника и
// собранный из переменной `line-clamp-${n}` в CSS не попадёт).
// Отзывы очень разной длины (от 51 до 559 символов), а карточки в
// карусели тянутся по самой высокой — без ограничения короткий отзыв
// превращался в плашку с огромным белым полем под текстом.

export default function ReviewCard({ review }: { review: Review }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  // Обрезан ли текст на самом деле — считаем по факту, а не по длине
  // строки: в карточку на мобильном и на десктопе влезает разное
  // число символов, порог «длинный отзыв» в символах врал бы.
  const [clamped, setClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Проверку вешаем только на ResizeObserver: он сам зовёт колбэк
    // сразу при observe() — отдельный синхронный вызов в теле эффекта
    // не нужен (и лишний рендер не вызывает).
    const observer = new ResizeObserver(() => {
      if (expanded) return;
      setClamped(el.scrollHeight > el.clientHeight + 1);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <li className="flex w-[19rem] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-6 sm:w-[22rem]">
      <div className="flex items-start justify-between gap-3">
        <QuoteIcon className="h-7 w-7 shrink-0 text-brand-200" />
        {review.rating && (
          <span className="mt-1 flex shrink-0 items-center gap-0.5 text-amber-500">
            {Array.from({ length: review.rating }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5" />
            ))}
          </span>
        )}
      </div>

      {/* Текст с кнопкой — единым блоком по центру свободного места.
          Карточки в ленте одной высоты (flex тянет их по самой
          высокой), и у короткого отзыва в 2 строки иначе оставалась
          дыра в 145px перед подписью. По центру тот же воздух
          делится сверху и снизу и читается как задумка, а не как
          обрыв. Подпись автора при этом всё равно прижата к низу —
          авторы стоят на одной линии во всей ленте. */}
      <div className="flex flex-1 flex-col justify-center">
        <p
          ref={textRef}
          className={`mt-4 text-[0.94rem] leading-relaxed text-ink-700 ${
            expanded ? "" : "line-clamp-5"
          }`}
        >
          {review.text}
        </p>

        {/* Кнопка — только у отзывов, которые реально не поместились. */}
        {clamped && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="mt-1 inline-flex min-h-[2.75rem] cursor-pointer items-center self-start text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {expanded ? "Свернуть" : "Читать полностью"}
          </button>
        )}
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <p className="font-semibold text-ink-900">{review.author}</p>
        {review.tag && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
            {review.tag}
          </p>
        )}
      </div>
    </li>
  );
}
