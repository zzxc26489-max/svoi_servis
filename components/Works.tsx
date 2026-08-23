import Image from "next/image";
import { WORKS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import Carousel from "./Carousel";

export default function Works() {
  // Пока фото не добавлены — секции на странице нет.
  if (WORKS.length === 0) return null;

  const items = WORKS.map((work) => (
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
        <p className="section-eyebrow">Как проходит ремонт</p>
        <h2 className="section-title">С чем мы работаем</h2>
        <p className="section-subtitle">
          Диагностика и ремонт — на месте, с профессиональным
          оборудованием.
        </p>

        <div className="mt-10">
          <Carousel ariaLabel="Примеры ремонта техники" items={items} />
        </div>
      </div>
    </section>
  );
}
