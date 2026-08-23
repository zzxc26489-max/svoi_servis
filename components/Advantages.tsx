import { BUSINESS, MASTERS, PRICES } from "@/lib/business";
import {
  StarIcon,
  StarHalfIcon,
  ShieldCheckIcon,
  BoltIcon,
  WalletIcon,
  ToolboxIcon,
  CheckIcon,
} from "./icons";

const advantages = [
  {
    icon: ShieldCheckIcon,
    title: "Гарантия на работы",
    description:
      "Даём гарантию на выполненный ремонт и установленные запчасти.",
  },
  {
    icon: BoltIcon,
    title: "Быстрый выезд",
    description: "Мастер приезжает в день обращения или на следующий день.",
  },
  {
    icon: WalletIcon,
    title: "Честные цены",
    description: "Называем стоимость до начала ремонта — без скрытых доплат.",
  },
  {
    icon: ToolboxIcon,
    title: "Любая техника",
    description:
      "Возьмёмся за ремонт любой бытовой техники — уточним детали и сроки после заявки.",
  },
];

// Реальных мастеров двое — Дмитрий и Андрей. У Андрея два разных
// номера (по стиральным и посудомоечным машинам), поэтому просто
// MASTERS.length здесь считал бы его за двоих.
const mastersCount = new Set(MASTERS.map((master) => master.name)).size;

// Минимальная цена диагностики по прайсу — берём из первой позиции
// каждой группы, а не вписываем цифру руками.
const diagnosticsFrom = Math.min(
  ...PRICES.flatMap((group) => group.items.map((item) => item.price)),
);

export default function Advantages() {
  const { value, ratingsCount, reviewsCount } = BUSINESS.rating;
  const fullStars = Math.floor(value);
  const hasHalfStar = value - fullStars >= 0.25;

  return (
    <section id="advantages" className="dark-texture section bg-ink-950">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-500">
              Почему мы
            </p>
            <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Почему нам доверяют
            </h2>

            <ul className="mt-8 space-y-5">
              {advantages.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-500">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-100/60">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Панель с цифрами — только реальные данные с карточки на
              Яндекс.Картах и из прайса, ничего не придумываем. */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
            <a
              href={BUSINESS.yandexMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-colors hover:bg-white/10"
            >
              <span className="font-display text-3xl font-extrabold leading-none text-white">
                {value.toString().replace(".", ",")}
              </span>
              <div>
                <span className="inline-flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: fullStars }).map((_, index) => (
                    <StarIcon key={index} className="h-4 w-4" />
                  ))}
                  {hasHalfStar && <StarHalfIcon className="h-4 w-4" />}
                </span>
                <div className="mt-1 text-xs text-brand-100/60">
                  {ratingsCount} оценок · {reviewsCount} отзывов на
                  Яндекс.Картах
                </div>
              </div>
            </a>

            <dl className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-xs text-brand-100/55">Мастеров в команде</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold text-white">
                  {mastersCount}
                </dd>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <dt className="text-xs text-brand-100/55">Диагностика от</dt>
                <dd className="mt-1 whitespace-nowrap font-display text-2xl font-extrabold text-white">
                  {diagnosticsFrom}&nbsp;₽
                </dd>
              </div>
              <div className="col-span-2 rounded-xl bg-white/5 p-4">
                <dt className="text-xs text-brand-100/55">Режим работы</dt>
                <dd className="mt-1 font-display text-lg font-bold text-white">
                  {BUSINESS.hours}
                </dd>
              </div>
            </dl>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-brand-100/50">
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
              Цифры — с реальной карточки сервиса на Яндекс.Картах.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
