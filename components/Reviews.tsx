import { BUSINESS, REVIEWS } from "@/lib/business";
import { QuoteIcon, StarIcon, ArrowRightIcon } from "./icons";
import Carousel from "./Carousel";

export default function Reviews() {
  const items = REVIEWS.map((review) => (
    <li
      key={review.author}
      className="flex w-[19rem] shrink-0 snap-start flex-col rounded-2xl border border-line bg-white p-6 sm:w-[22rem]"
    >
      <div className="flex items-start justify-between gap-3">
        <QuoteIcon className="h-7 w-7 shrink-0 text-brand-200" />
        {review.rating && (
          <span className="mt-1 flex shrink-0 items-center gap-0.5 text-amber-500">
            {Array.from({ length: review.rating }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5" />
            ))}
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-ink-700">
        {review.text}
      </p>

      <div className="mt-5 border-t border-line pt-4">
        <p className="font-semibold text-ink-900">{review.author}</p>
        {review.tag && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">
            {review.tag}
          </p>
        )}
      </div>
    </li>
  ));

  return (
    <section id="reviews" className="section bg-mist-50">
      <div className="container-x">
        <div>
          <p className="section-eyebrow">Отзывы</p>
          <h2 className="section-title">Что говорят клиенты</h2>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-500">
            <span className="inline-flex items-center gap-1 text-amber-500">
              {Array.from({ length: 4 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
              <StarIcon className="h-4 w-4 opacity-40" />
            </span>
            <span className="font-semibold text-ink-900">
              {BUSINESS.rating.value.toString().replace(".", ",")}
            </span>
            <span>
              · {BUSINESS.rating.ratingsCount} оценок на Яндекс.Картах
            </span>
          </p>
        </div>

        <div className="mt-8">
          <Carousel
            ariaLabel="Отзывы клиентов с Яндекс.Карт"
            items={items}
            fadeFrom="from-mist-50"
          />
        </div>

        <a
          href={BUSINESS.yandexMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Все отзывы на Яндекс.Картах
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
