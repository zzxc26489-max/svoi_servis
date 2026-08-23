import { BUSINESS, PRICES, MASTERS, joinRu } from "@/lib/business";

// Без этого сборка со статическим экспортом (GITHUB_PAGES=true) падает —
// см. тот же комментарий в app/robots.ts.
export const dynamic = "force-static";

// Формат по llmstxt.org: H1, короткая цитата-описание, разделы markdown-
// ссылками. Та же честная выжимка, что и на самом сайте — источник
// данных общий (lib/business.ts), выдумывать здесь нечего.
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const areas = joinRu([...BUSINESS.primaryAreas, ...BUSINESS.extendedAreas]);

  const priceLines = PRICES.flatMap((group) =>
    group.items.map(
      (item) => `- ${group.category}: ${item.title} — от ${item.price} ₽`,
    ),
  ).join("\n");

  const masterLines = MASTERS.map(
    (master) => `- ${master.specialty}: ${master.phoneDisplay} (${master.name})`,
  ).join("\n");

  const body = `# Свой Сервис

> Ремонт холодильников, стиральных и посудомоечных машин на дому и в мастерской в ${areas}. Диагностика от 500 ₽, рейтинг ${BUSINESS.rating.value.toString().replace(".", ",")} на Яндекс.Картах (${BUSINESS.rating.ratingsCount} оценок, ${BUSINESS.rating.reviewsCount} отзывов).

## Услуги и цены

${priceLines}

## Контакты

${masterLines}
- Telegram: ${BUSINESS.telegramUrl}
- WhatsApp: ${BUSINESS.whatsappUrl}
- Режим работы: ${BUSINESS.hours}
- Адрес мастерской: ${BUSINESS.address.full}
- Карточка на Яндекс.Картах: ${BUSINESS.yandexMapsUrl}

## Страницы

- [Главная](${siteUrl}/): вся воронка — услуги, цены, отзывы, форма заявки
- [Архив работ](${siteUrl}/works): фотографии реальных ремонтов с фильтром по технике
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
