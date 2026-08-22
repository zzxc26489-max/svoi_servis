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
      opens: "09:00",
      closes: "22:00",
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
