import { BUSINESS } from "@/lib/business";
import { StarIcon, StarHalfIcon } from "./icons";

const { value, ratingsCount, reviewsCount } = BUSINESS.rating;

function Stars({ className }: { className?: string }) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.25;

  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`}>
      {Array.from({ length: full }).map((_, index) => (
        <StarIcon key={index} className="h-4 w-4" />
      ))}
      {hasHalf && <StarHalfIcon className="h-4 w-4" />}
    </span>
  );
}

/** Компактная плашка для тёмного фона (Hero). */
export function RatingPill() {
  return (
    <a
      href={BUSINESS.yandexMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-full bg-white/10 py-2 pl-3 pr-4 text-sm ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15"
    >
      <Stars className="text-amber-400" />
      <span className="font-semibold text-white">
        {value.toString().replace(".", ",")}
      </span>
      <span className="text-brand-100/70">
        {ratingsCount} оценок на Яндекс.Картах
      </span>
    </a>
  );
}

/** Развёрнутая карточка для светлой секции. */
export function RatingCard() {
  return (
    <a
      href={BUSINESS.yandexMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col justify-center gap-3 p-5"
    >
      <div className="flex items-center gap-3">
        <span className="font-display text-3xl font-extrabold leading-none text-ink-900">
          {value.toString().replace(".", ",")}
        </span>
        <div>
          <Stars className="text-amber-500" />
          <div className="mt-1 text-xs text-ink-500">
            {ratingsCount} оценок · {reviewsCount} отзывов
          </div>
        </div>
      </div>
      <div className="text-sm">
        <div className="font-semibold text-ink-900">Отзывы на Яндекс.Картах</div>
        <div className="mt-0.5 font-medium text-brand-600">
          Читать отзывы клиентов →
        </div>
      </div>
    </a>
  );
}
