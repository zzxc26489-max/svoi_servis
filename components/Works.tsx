import Image from "next/image";
import { WORKS } from "@/lib/business";

export default function Works() {
  // Пока фото не добавлены — секции на странице нет.
  if (WORKS.length === 0) return null;

  return (
    <section id="works" className="section bg-white">
      <div className="container-x">
        <p className="section-eyebrow">Как проходит ремонт</p>
        <h2 className="section-title">С чем мы работаем</h2>
        <p className="section-subtitle">
          Диагностика и ремонт — на месте, с профессиональным
          оборудованием.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <li key={work.src} className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-mist-100">
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
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
          ))}
        </ul>
      </div>
    </section>
  );
}
