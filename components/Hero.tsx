import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CurrencyRub,
  Phone,
  ShieldCheck,
  Star,
  Truck,
} from "@phosphor-icons/react/dist/ssr";
import { BUSINESS, MASTERS } from "@/lib/business";
import { withBasePath } from "@/lib/basePath";

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
    title: "Диагностика от 500 ₽",
    text: "Цена ремонта — до начала работ",
  },
  {
    icon: ShieldCheck,
    title: BUSINESS.warranty.short,
    text: "И на установленные запчасти",
  },
];

function RatingLine({ mobile = false }: { mobile?: boolean }) {
  return (
    <a
      href={BUSINESS.yandexMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center text-ink-700 transition-colors hover:text-brand-600 ${
        mobile ? "gap-2 text-[12px]" : "gap-3 text-sm"
      }`}
    >
      <span className="inline-flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            weight="fill"
            className={mobile ? "h-3.5 w-3.5" : "h-4 w-4"}
          />
        ))}
      </span>
      <span className="font-bold text-ink-900">4,9</span>
      <span className="text-ink-500">на Яндекс Картах</span>
      <span className="h-4 w-px bg-line" />
      <span className="text-ink-500">28 оценок</span>
    </a>
  );
}

function TrustPoint({
  item,
  mobile = false,
}: {
  item: (typeof trustPoints)[number];
  mobile?: boolean;
}) {
  const Icon = item.icon;
  return (
    <div className={`flex items-start ${mobile ? "gap-4" : "gap-3"}`}>
      <Icon
        weight="regular"
        className={`shrink-0 text-brand-500 ${mobile ? "h-7 w-7" : "h-8 w-8"}`}
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

export default function Hero() {
  return (
    <section id="top" className="bg-white">
      <div className="hidden min-h-[620px] grid-cols-[48%_52%] lg:grid">
        <div className="flex min-w-0 flex-col justify-center px-10 py-10 xl:px-[max(40px,calc((100vw-1440px)/2+40px))] xl:pr-12">
          <RatingLine />

          <h1 className="mt-7 max-w-[620px] font-display text-[clamp(3rem,4.2vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-ink-900">
            Ремонт техники
            <br />
            на дому — честно
            <br />
            и <span className="text-brand-500">с гарантией</span>
          </h1>

          <p className="mt-6 max-w-[570px] text-[17px] leading-[1.55] text-ink-700">
            Холодильники, стиральные и посудомоечные машины в Зеленограде,
            Ржавках, Андреевке и соседних районах. Свой мастер по каждому
            направлению — без колл-центра и ожидания на линии.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/#order"
              className="btn-primary !min-h-[58px] !rounded-[12px] !px-8 text-[17px]"
            >
              Вызвать мастера
              <ArrowRight weight="bold" className="h-5 w-5" />
            </Link>
            <a
              href={`tel:${primaryPhone.phoneHref}`}
              className="inline-flex min-h-[58px] items-center gap-3 rounded-[12px] border border-line bg-white px-6 transition-colors hover:border-brand-300 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Phone weight="bold" className="h-5 w-5 text-brand-500" />
              <span>
                <span className="block text-[16px] font-bold tabular-nums leading-none text-ink-900">
                  {primaryPhone.phoneDisplay}
                </span>
                <span className="mt-1.5 block text-[11px] text-ink-500">
                  Звоните, поможем
                </span>
              </span>
            </a>
          </div>

          <div className="mt-10 grid max-w-[620px] grid-cols-3 gap-5">
            {trustPoints.map((item) => (
              <TrustPoint key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="relative min-h-[620px] overflow-hidden">
          <Image
            src={withBasePath(HERO_PHOTO)}
            alt="Мастер ремонтирует стиральную машину на дому"
            fill
            priority
            sizes="52vw"
            className="object-cover object-[54%_center]"
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="px-5 pb-5 pt-4 sm:px-7">
          <RatingLine mobile />
          <h1 className="mt-5 font-display text-[clamp(2.05rem,9.5vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.052em] text-ink-900">
            Ремонт техники
            <br />
            на дому — честно
            <br />
            и <span className="text-brand-500">с гарантией</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.5] text-ink-700">
            Холодильники, стиральные и посудомоечные машины в Зеленограде,
            Ржавках, Андреевке и соседних районах. Свой мастер по каждому
            направлению — без колл-центра и ожидания на линии.
          </p>
        </div>

        <div className="relative h-[235px] w-full overflow-hidden sm:h-[340px]">
          <Image
            src={withBasePath(HERO_PHOTO)}
            alt="Мастер ремонтирует стиральную машину на дому"
            fill
            priority
            sizes="100vw"
            className="scale-[1.12] object-cover object-[58%_center]"
          />
        </div>

        <div className="space-y-3 px-5 pb-8 pt-3 sm:px-7">
          <Link
            href="/#order"
            className="btn-primary w-full !min-h-[54px] !rounded-[10px] text-[16px]"
          >
            Вызвать мастера
            <ArrowRight weight="bold" className="h-5 w-5" />
          </Link>
          <a
            href={`tel:${primaryPhone.phoneHref}`}
            className="inline-flex min-h-[50px] w-full items-center justify-center gap-3 rounded-[10px] border border-line bg-white px-4 text-ink-900 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <Phone weight="bold" className="h-5 w-5 text-brand-500" />
            <span>
              <span className="block text-[16px] font-bold tabular-nums leading-none">
                {primaryPhone.phoneDisplay}
              </span>
              <span className="mt-1 block text-[10px] text-ink-500">
                {BUSINESS.hours}
              </span>
            </span>
          </a>

          <div className="space-y-5 border-b border-line pb-7 pt-3">
            {trustPoints.map((item) => (
              <TrustPoint key={item.title} item={item} mobile />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
