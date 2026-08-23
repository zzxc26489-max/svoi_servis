import Image from "next/image";
import Link from "next/link";
import { WORKS, getFeaturedWorks } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import Carousel from "./Carousel";
import { ArrowRightIcon } from "./icons";

export default function Works() {
  // Пока фото не добавлены — секции на странице нет.
  if (WORKS.length === 0) return null;

  // На главной — по паре фото на направление, не весь архив; всё
  // целиком смотрят на /works.
  const items = getFeaturedWorks().map((work) => (
    <li
      key={work.src}
      className="w-[15rem] shrink-0 snap-start card overflow-hidden sm:w-[18rem]"
    >
      <div className="relative aspect-[4/3] bg-mist-100">
        <Image
          src={withBasePath(work.src)}
          alt={work.alt}
          fill
          sizes="288px"
          className="object-cover"
          placeholder="blur"
          blurDataURL={work.blurDataURL}
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {work.category}
        </span>
      </div>
      {work.caption && (
        <p className="px-5 py-4 text-sm leading-relaxed text-ink-500">
          {work.caption}
        </p>
      )}
    </li>
  ));

  return (
    <section id="works" className="section bg-white">
      <div className="container-x">
        <p className="section-eyebrow">Наши работы</p>
        <h2 className="section-title">Как это выглядит на деле</h2>
        <p className="section-subtitle">
          Реальные ремонты — диагностика, заправка контура, замена деталей.
          Без стоковых картинок.
        </p>

        <div className="mt-10">
          <Carousel ariaLabel="Примеры ремонта техники" items={items} />
        </div>

        <Link
          href="/works"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Смотреть все работы
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
