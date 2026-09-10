import {
  BUSINESS,
  REVIEWS,
  pluralRu,
  RATING_FORMS,
} from "@/lib/business";
import { StarIcon, ArrowRightIcon } from "./icons";
import Carousel from "./Carousel";
import ReviewCard from "./ReviewCard";

// Звёзды считаем от реального рейтинга, а не рисуем руками: при
// изменении оценки на карточке картинка иначе разъезжается с числом.
// Округляем до целой звезды — при 4,9 показываем 5 полных, а не 4 и
// половину.
const fullStars = Math.round(BUSINESS.rating.value);

export default function Reviews() {
  const items = REVIEWS.map((review) => (
    <ReviewCard key={review.author} review={review} />
  ));

  return (
    <section id="reviews" className="section bg-mist-50">
      <div className="container-x">
        <div>
          <p className="section-eyebrow">Отзывы</p>
          <h2 className="section-title">Что говорят клиенты</h2>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-500">
            <span className="inline-flex items-center gap-1 text-amber-500">
              {Array.from({ length: fullStars }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </span>
            <span className="font-semibold text-ink-900">
              {BUSINESS.rating.value.toString().replace(".", ",")}
            </span>
            <span>
              · {BUSINESS.rating.ratingsCount}{" "}
              {pluralRu(BUSINESS.rating.ratingsCount, RATING_FORMS)} на
              Яндекс.Картах
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
          className="mt-1 inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Все отзывы на Яндекс.Картах
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
