import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import WorkStatus from "./WorkStatus";
import { RatingPill } from "./RatingBadge";
import QuickLeadForm from "./QuickLeadForm";
import { BoltIcon, ShieldCheckIcon, WalletIcon } from "./icons";

// Фото мастера за работой. Крошечный blur-превью, чтобы не было
// пустого прямоугольника, пока грузится файл (тот же приём, что и в
// галерее «Работы»).
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
    title: BUSINESS.warranty.short,
    text: "И на установленные запчасти",
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950">
      {/* Одно фото на оба брейкпоинта — раньше мобильный прятал его
          через hidden, но priority всё равно клал в <head> preload:
          телефон качал картинку, которую не показывал.
          Мобильный: блок сверху фиксированной высоты — фото 16:9 в
          вертикальный экран целиком не влезает, кроп «на весь экран»
          оставлял бы от мастера узкую полосу.
          От sm: то же фото на всю секцию фоном, как было. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[19rem] sm:inset-0 sm:h-auto"
      >
        <Image
          src={withBasePath(HERO_PHOTO.src)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_28%] sm:object-[50%_0%]"
          placeholder="blur"
          blurDataURL={HERO_PHOTO.blurDataURL}
        />
        {/* Мобильный: фото уходит в фон секции снизу, стыка не видно. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/15 sm:hidden" />
        {/* От sm — асимметричный градиент: тёмный слева под текстом,
            почти прозрачный по центру и справа, там мастер и техника. */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink-950 via-ink-950/55 to-transparent sm:block" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink-950/50 via-transparent to-transparent sm:block" />
      </div>

      {/* pt на мобильном — под фото-блок выше. */}
      <div className="container-x relative pb-16 pt-[16.5rem] sm:py-24 sm:pt-24 lg:py-32">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <RatingPill />
            <WorkStatus />
          </div>

          <h1 className="mt-5 text-balance text-[2rem] font-extrabold leading-[1.06] tracking-tight text-white sm:mt-6 sm:text-5xl lg:text-[3.25rem]">
            Ремонт холодильников и стиральных машин{" "}
            <span className="text-accent-500">на дому</span>
          </h1>

          {/* Короче, чем было: на мобильном каждая лишняя строка здесь
              отодвигает форму ещё дальше за сгиб. */}
          <p className="mt-4 text-lg leading-relaxed text-white/85 sm:mt-5">
            {BUSINESS.primaryAreas.join(", ")} и соседние районы. Свой мастер
            по каждому направлению — без колл-центра и ожидания на линии.
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

          {/* На мобильном форма в той же белой карточке с заголовком,
              что и была: без обёртки поля выглядели голыми на тёмном
              фоне. От sm рядом фото и трасты в строку — там компактная
              версия без карточки, без Telegram/WhatsApp (они в секции
              заявки). */}
          <div className="mt-9 rounded-2xl bg-white p-6 shadow-lift sm:hidden">
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
          <div className="mt-9 hidden max-w-md sm:block">
            <QuickLeadForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}
