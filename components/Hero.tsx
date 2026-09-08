import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import QuickLeadForm from "./QuickLeadForm";
import WorkStatus from "./WorkStatus";
import { RatingPill } from "./RatingBadge";
import { BoltIcon, ShieldCheckIcon, WalletIcon } from "./icons";

// Реальное фото Дмитрия за работой — не студийная постановка.
// Крошечный blur-превью, чтобы не было пустого прямоугольника, пока
// грузится файл (тот же приём, что и в галерее «Работы»).
const HERO_PHOTO = {
  src: "/hero/dmitry-portrait.webp",
  blurDataURL:
    "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAQCdASoQAAkAA4BaJYgCdACqLPP7AAD+CXaSc5Lm8ilQGRA/8Ac/CVhwA9ShGmfhOYrqRkORvyR5+3pMxl0fo963we2I7Od8qckJhweP7YXba1SwA/IDTcsjrr0hhFQAAA==",
};

const trustPoints = [
  {
    icon: BoltIcon,
    title: "Выезд в день обращения",
    text: "Ежедневно 9:00–22:00",
  },
  {
    icon: WalletIcon,
    //   — неразрывный пробел: иначе «₽» отрывается на новую строку
    title: "Диагностика от 500 ₽",
    text: "Цена ремонта — до начала работ",
  },
  {
    icon: ShieldCheckIcon,
    title: "Гарантия на работы",
    text: "И на установленные запчасти",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950">
      {/* Фото на весь экран, без обрезанного полотна и затемнённых
          «полей» по бокам — только от sm: на мобильном тесно тексту с
          формой, лишний слой мешает. */}
      <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
        <Image
          src={withBasePath(HERO_PHOTO.src)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_0%]"
          placeholder="blur"
          blurDataURL={HERO_PHOTO.blurDataURL}
        />
        {/* Один ровный тёмный слой поверх всего фото — держит текст и
            карточку формы читаемыми, без отдельных «пятен» по зонам. */}
        <div className="absolute inset-0 bg-ink-950/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/20" />
      </div>

      <div className="container-x relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Левая колонка — оффер и доверие */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <RatingPill />
              <WorkStatus />
            </div>

            <h1 className="mt-6 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Ремонт холодильников и стиральных машин{" "}
              <span className="text-accent-500">на дому</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              {BUSINESS.primaryAreas.join(", ")} и соседние районы. Свой
              мастер по каждому направлению — звоните напрямую, без
              колл-центра и ожидания на линии.
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3 sm:block">
                  <Icon className="h-6 w-6 shrink-0 text-accent-500 sm:mb-2.5" />
                  <div className="min-w-0">
                    <dt className="text-[0.95rem] font-semibold leading-snug text-white">
                      {title}
                    </dt>
                    <dd className="mt-1 text-sm leading-snug text-white/60">
                      {text}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Правая колонка — форма заявки, главное действие страницы */}
          <div className="rounded-2xl bg-white p-6 shadow-lift sm:p-7">
            <h2 className="text-xl font-bold text-ink-900">
              Вызвать мастера
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              Оставьте номер — перезвоним, уточним поломку и назовём
              стоимость до выезда.
            </p>
            <div className="mt-5">
              <QuickLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
