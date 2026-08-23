import { BUSINESS, MASTERS } from "@/lib/business";

// JSON-LD для schema.org/LocalBusiness. Данные должны дословно совпадать
// с карточкой на Яндекс.Картах (см. lib/business.ts) — это повышает
// доверие поисковиков и вероятность красивого сниппета в выдаче.
export function buildLocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS.name,
    ...(siteUrl ? { url: siteUrl } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      // Берём из BUSINESS, чтобы часы в разметке не разошлись с теми,
      // что показаны на сайте.
      opens: `${String(BUSINESS.hoursRange.opens).padStart(2, "0")}:00`,
      closes: `${String(BUSINESS.hoursRange.closes).padStart(2, "0")}:00`,
    },
    contactPoint: MASTERS.map((master) => ({
      "@type": "ContactPoint",
      telephone: master.phoneDisplay,
      contactType: "customer service",
      areaServed: "RU",
      availableLanguage: "Russian",
      description: `${master.specialty} — ${master.name}`,
    })),
    priceRange: "500 ₽ – 5000 ₽",
    sameAs: [
      BUSINESS.yandexMapsUrl,
      BUSINESS.telegramUrl,
      BUSINESS.telegramGroupUrl,
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      reviewCount: BUSINESS.rating.reviewsCount,
      ratingCount: BUSINESS.rating.ratingsCount,
      bestRating: 5,
    },
    areaServed: [...BUSINESS.primaryAreas, ...BUSINESS.extendedAreas],
  };
}

// FAQPage — из тех же вопросов-ответов, что показаны в Faq.tsx,
// дословно (передаются параметром, а не дублируются здесь) — даёт
// право на расширенный сниппет с раскрывающимися вопросами в выдаче.
export function buildFaqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// BreadcrumbList — для страниц глубже главной (сейчас только /works).
// items — от корня к текущей странице, name/url для каждого уровня.
export function buildBreadcrumbSchema(
  items: { name: string; url?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
