import Image from "next/image";
import { BUSINESS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import QuickLeadForm from "./QuickLeadForm";
import WorkStatus from "./WorkStatus";
import { RatingPill } from "./RatingBadge";
import { BoltIcon, ShieldCheckIcon, WalletIcon } from "./icons";

// Реальное фото Дмитрия — не студийная постановка, но кадр анфас,
// поэтому здесь он не фон, а отдельная карточка-портрет по центру.
const HERO_PORTRAIT = {
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
    <section id="top" className="dark-texture relative overflow-hidden bg-ink-950">
      {/* Мягкая подсветка фона — задаёт глубину, не отвлекая от текста */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70rem 40rem at 15% -10%, rgba(52,102,246,0.45) 0%, transparent 60%), radial-gradient(50rem 30rem at 90% 0%, rgba(234,88,12,0.22) 0%, transparent 55%)",
        }}
      />

      <div className="container-x relative py-14 sm:py-20 lg:py-24">
        {/* Портрет мастера, сверху на мобильном; на широком экране —
            между текстом и формой, ничего не перекрывает. */}
        <div className="mx-auto mb-10 w-48 sm:w-56 lg:hidden">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10">
            <Image
              src={withBasePath(HERO_PORTRAIT.src)}
              alt="Дмитрий — мастер по ремонту холодильников и стиральных машин"
              fill
              priority
              sizes="12rem"
              className="object-cover object-top"
              placeholder="blur"
              blurDataURL={HERO_PORTRAIT.blurDataURL}
            />
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 xl:gap-12">
          {/* Левая колонка — оффер и доверие */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <RatingPill />
              <WorkStatus />
            </div>

            <h1 className="mt-6 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[2.6rem] xl:text-[3rem]">
              Ремонт холодильников и стиральных машин{" "}
              <span className="text-accent-500">на дому</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100/85">
              {BUSINESS.primaryAreas.join(", ")} и соседние районы. Свой
              мастер по каждому направлению — звоните напрямую, без
              колл-центра и ожидания на линии.
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 sm:gap-6 lg:gap-4">
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-accent-500" />
                  <div className="min-w-0">
                    <dt className="text-[0.95rem] font-semibold leading-snug text-white">
                      {title}
                    </dt>
                    <dd className="mt-1 text-sm leading-snug text-brand-100/60">
                      {text}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Портрет мастера — только от lg, тут он в центре между
              оффером и формой */}
          <div className="hidden lg:block lg:w-56 xl:w-64">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/10">
              <Image
                src={withBasePath(HERO_PORTRAIT.src)}
                alt="Дмитрий — мастер по ремонту холодильников и стиральных машин"
                fill
                priority
                sizes="16rem"
                className="object-cover object-top"
                placeholder="blur"
                blurDataURL={HERO_PORTRAIT.blurDataURL}
              />
            </div>
            <p className="mt-3 text-center text-sm font-medium text-brand-100/70">
              Дмитрий, мастер по холодильникам
            </p>
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
