import Image from "next/image";
import {
  CurrencyRub,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "@phosphor-icons/react/dist/ssr";
import { BUSINESS, MASTERS, pluralRu, RATING_FORMS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";
import QuickLeadForm from "./QuickLeadForm";
import WorkStatus from "./WorkStatus";

const HERO_PHOTO = "/hero/dmitry-portrait.webp";
const primaryPhone = MASTERS[0];

const trustPoints = [
  {
    icon: Truck,
    title: "Выезд в день обращения",
    text: BUSINESS.hours,
  },
  {
    icon: CurrencyRub,
    title: "Выезд и диагностика — бесплатно",
    text: "При ремонте. Откажетесь — от 500 ₽",
  },
  {
    icon: ShieldCheck,
    title: BUSINESS.warranty.short,
    text: "И на установленные запчасти",
  },
];

function RatingLine() {
  return (
    <a
      href={BUSINESS.yandexMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[12px] text-ink-700 transition-colors hover:text-brand-600 lg:gap-3 lg:text-sm"
    >
      <span className="inline-flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            weight="fill"
            className="h-3.5 w-3.5 lg:h-4 lg:w-4"
          />
        ))}
      </span>
      <span className="font-bold text-ink-900">
        {BUSINESS.rating.value.toString().replace(".", ",")}
      </span>
      <span className="text-ink-500">на Яндекс Картах</span>
      <span className="h-4 w-px bg-line" />
      <span className="text-ink-500">
        {BUSINESS.rating.ratingsCount}{" "}
        {pluralRu(BUSINESS.rating.ratingsCount, RATING_FORMS)}
      </span>
    </a>
  );
}

function TrustPoint({ item }: { item: (typeof trustPoints)[number] }) {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-4 lg:gap-3">
      <Icon
        weight="regular"
        className="h-7 w-7 shrink-0 text-brand-500 lg:h-8 lg:w-8"
      />
      <div>
        <p className="font-display text-[15px] font-bold leading-[1.2] text-ink-900">
          {item.title}
        </p>
        <p className="mt-1 text-[12px] leading-[1.35] text-ink-500">
          {item.text}
        </p>
      </div>
    </div>
  );
}

// Одна разметка на оба брейкпоинта. Раньше первый экран был в вёрстке дважды —
// отдельными блоками под lg и под мобильный, — и в DOM висели два
// одинаковых <h1> и две формы, одна из которых всегда скрыта.
// Порядок на мобильном: текст → фото → форма. От lg — две колонки:
// слева текст и форма (два ряда по 50%, прижаты к стыку, отсюда
// визуальный центр), справа фото на всю высоту.
export default function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className="lg:grid lg:min-h-[620px] lg:grid-cols-[48%_52%] lg:grid-rows-[1fr_1fr]">
        <div className="px-5 pb-5 pt-4 sm:px-7 lg:col-start-1 lg:row-start-1 lg:flex lg:min-w-0 lg:flex-col lg:justify-end lg:px-10 lg:pb-0 lg:pt-10 xl:pl-[max(40px,calc((100vw-1440px)/2+40px))] xl:pr-12">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <RatingLine />
            <WorkStatus tone="light" />
          </div>

          <h1 className="mt-5 max-w-[620px] font-display text-[clamp(2.05rem,9.5vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.052em] text-ink-900 lg:mt-7 lg:text-[clamp(3rem,4.2vw,4.25rem)] lg:leading-[1.02] lg:tracking-[-0.055em]">
            Ремонт техники
            <br />
            на дому — честно
            <br />
            и <span className="text-brand-500">с гарантией</span>
          </h1>

          <p className="mt-4 max-w-xl text-[15px] leading-[1.5] text-ink-700 lg:mt-6 lg:max-w-[570px] lg:text-[17px] lg:leading-[1.55]">
            Холодильники, стиральные и посудомоечные машины в Зеленограде,
            Ржавках, Андреевке и соседних районах. Свой мастер по каждому
            направлению — без колл-центра и ожидания на линии.
          </p>
        </div>

        <div className="relative h-[235px] w-full overflow-hidden sm:h-[340px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-auto lg:min-h-[620px]">
          <Image
            src={withBasePath(HERO_PHOTO)}
            alt="Мастер ремонтирует стиральную машину на дому"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 52vw"
            className="scale-[1.12] object-cover object-[58%_center] lg:scale-100 lg:object-[54%_center]"
          />
        </div>

        {/* Форма прямо в первом экране, а не кнопка-переход к ней ниже:
            заявка — единственное целевое действие страницы, и лишний
            скролл до неё стоит части заявок. Телефон рядом — для тех,
            кому проще позвонить. */}
        <div className="px-5 pb-8 pt-4 sm:px-7 lg:col-start-1 lg:row-start-2 lg:flex lg:flex-col lg:items-start lg:px-10 lg:pb-10 lg:pt-7 xl:pl-[max(40px,calc((100vw-1440px)/2+40px))] xl:pr-12">
          <div className="lg:max-w-[560px] lg:self-stretch">
            <QuickLeadForm compact />
          </div>

          <a
            href={`tel:${primaryPhone.phoneHref}`}
            className="mt-3 inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[10px] border border-line bg-white px-4 text-ink-900 transition-colors hover:border-brand-300 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:mt-4 lg:min-h-[52px] lg:w-auto lg:justify-start lg:rounded-[12px] lg:px-6"
          >
            <Phone weight="bold" className="h-5 w-5 text-brand-500" />
            <span>
              <span className="block text-[16px] font-bold tabular-nums leading-none text-ink-900">
                {primaryPhone.phoneDisplay}
              </span>
              <span className="mt-1 block text-[10px] text-ink-500 lg:mt-1.5 lg:text-[11px]">
                <span className="lg:hidden">{BUSINESS.hours}</span>
                <span className="hidden lg:inline">
                  Или позвоните — ответим сразу
                </span>
              </span>
            </span>
          </a>

          <div className="mt-6 grid gap-5 border-b border-line pb-7 lg:mt-10 lg:max-w-[620px] lg:grid-cols-3 lg:border-b-0 lg:pb-0">
            {trustPoints.map((item) => (
              <TrustPoint key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
