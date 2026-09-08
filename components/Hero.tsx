import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import WorkStatus from "./WorkStatus";
import { RatingPill } from "./RatingBadge";
import QuickLeadForm from "./QuickLeadForm";
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
    title: (
      <>
        Диагностика от <span className="whitespace-nowrap">500 ₽</span>
      </>
    ),
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
      {/* Фото на весь экран — только от sm: на мобильном тесно тексту,
          лишний слой мешает. */}
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
        {/* Асимметричный градиент: тёмный слева под текстом, почти
            прозрачный по центру и справа — там мастер и техника, их не
            прячем. Второй слой — лёгкий, снизу, под нижние трасты. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
      </div>

      <div className="container-x relative py-16 sm:py-24 lg:py-32">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <RatingPill />
            <WorkStatus />
          </div>

          <h1 className="mt-6 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Ремонт холодильников и стиральных машин{" "}
            <span className="text-accent-500">на дому</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-white/85">
            {BUSINESS.primaryAreas.join(", ")} и соседние районы. Свой мастер
            по каждому направлению — звоните напрямую, без колл-центра и
            ожидания на линии.
          </p>

          {/* Одной строкой — экономит высоту под форму ниже. На узких
              экранах всё равно переносится по одному в строке. */}
          <dl className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {trustPoints.map(({ icon: Icon, title, text }) => (
              <div key={text} className="flex items-start gap-3 sm:block">
                <Icon className="h-6 w-6 shrink-0 text-accent-500 sm:mb-2.5" />
                <div className="min-w-0">
                  <dt className="text-base font-semibold leading-snug text-white">
                    {title}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug text-white/75">
                    {text}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-9 max-w-md">
            <QuickLeadForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
