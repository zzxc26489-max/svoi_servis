"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { WORKS, type WorkCategory } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";

const ALL = "Все работы" as const;
type Filter = typeof ALL | WorkCategory;

export default function WorksGallery() {
  const [filter, setFilter] = useState<Filter>(ALL);

  // Показываем только те направления, по которым реально есть фото —
  // пустая вкладка выглядит как поломка сайта.
  const filters = useMemo<Filter[]>(() => {
    const present = new Set<WorkCategory>();
    for (const work of WORKS) present.add(work.category);
    return [ALL, ...present];
  }, []);

  const visible = useMemo(
    () =>
      filter === ALL ? WORKS : WORKS.filter((work) => work.category === filter),
    [filter],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Фильтр работ по технике"
        className="flex flex-wrap gap-2"
      >
        {filters.map((name) => {
          const active = filter === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              aria-pressed={active}
              className={`min-h-[2.75rem] cursor-pointer rounded-full px-5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                active
                  ? "bg-brand-600 text-white"
                  : "border border-line bg-white text-ink-700 hover:border-brand-300 hover:text-brand-600"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-5 text-sm text-ink-400">
        {visible.length === WORKS.length
          ? `Всего работ: ${WORKS.length}`
          : `Показано: ${visible.length} из ${WORKS.length}`}
      </p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((work) => (
          <li key={work.src} className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-mist-100">
              <Image
                src={withBasePath(work.src)}
                alt={work.alt}
                fill
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL={work.blurDataURL}
              />
            </div>
            <div className="px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                {work.category}
              </p>
              {work.caption && (
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                  {work.caption}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
