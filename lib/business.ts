// Единый источник правды для данных компании. Эти значения должны
// дословно совпадать с карточкой на Яндекс.Картах (NAP-консистентность
// важна и для доверия клиентов, и для локального SEO).

export type Master = {
  name: string;
  specialty: string;
  phoneDisplay: string;
  phoneHref: string;
};

export const BUSINESS = {
  name: "Много Техники",
  address: {
    street: "Жилинская ул., 13, стр. 1",
    locality: "рп. Андреевка",
    region: "городской округ Солнечногорск, Московская область",
    full: "Жилинская ул., 13, стр. 1, рп. Андреевка, городской округ Солнечногорск, Московская область",
  },
  hours: "Ежедневно 9:00–22:00",
  yandexMapsUrl: "https://yandex.ru/maps/org/mnogo_tekhniki/136163852709/",
  // Личный рабочий аккаунт — сюда пишут клиенты по заявкам.
  telegramUrl: "https://t.me/Svoimas",
  // Открытая группа сервиса.
  telegramGroupUrl: "https://t.me/svoiserviz",
  // WhatsApp Андрея (Михалыча), +7 901 743-37-96.
  whatsappUrl: "https://wa.me/79017433796",
  // Основной фокус — Зеленоград и Андреевка, но выезжаем и дальше, если
  // это приносит заявки. Держим одним списком, чтобы гео-упоминания на
  // сайте (Hero, Footer, schema.org) не расходились.
  primaryAreas: ["Зеленоград", "Андреевка"],
  extendedAreas: ["Солнечногорск", "Красногорск", "Химки", "Лобня"],
  // Данные карточки на Яндекс.Картах. Обновлять вручную вместе с
  // карточкой — цифры показываются на сайте как есть.
  rating: {
    value: 4.5,
    ratingsCount: 16,
    reviewsCount: 11,
  },
} as const;

export type WorkPhoto = {
  /** Путь от корня public, например /works/fridge-01.webp */
  src: string;
  /** Что на фото — обязателен: и для доступности, и для SEO. */
  alt: string;
  caption?: string;
  /** Крошечная блюр-версия (base64) — показывается, пока грузится
      полный файл, чтобы вместо пустого прямоугольника было размытое
      превью. Генерируется вместе с самим файлом. */
  blurDataURL: string;
};

// Временные иллюстративные фото (сгенерированы, не с реальных объектов) —
// чтобы секция не пустовала, пока не пришлют настоящие снимки работ.
// Заменить на реальные по мере поступления, см. PROJECT.md. Формат —
// WebP (легче JPEG при том же качестве).
export const WORKS: WorkPhoto[] = [
  {
    src: "/works/fridge-diagnostics.webp",
    alt: "Диагностика холодильника тепловизором и мультиметром",
    caption: "Диагностика и ремонт холодильников",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoQABAAA4BaJZwAAjxAiOdN3ggAAP4K/069can6wIN9YhpOqB0QZKw1NfFqJ9NEqrjhUdumHlI2+ZKqZd2XSiNoXzF4P5O/8nW2Tbxh7QPq0lOy/YRTRs/GqZ9BjZHlCX1mAhIDgAA=",
  },
  {
    src: "/works/fridge-no-frost.webp",
    alt: "Ремонт холодильника с системой No Frost",
    caption: "Ремонт холодильника No Frost",
    blurDataURL:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABwAgCdASoQABAAA4BaJZQCw7YvryZerqxWz/MAAP7rwZ3d6z6UWqCWBQujsp3f06f1st8aJ6B/h6hi4ewsO/wVzy7r9g+KxIN1aODXgR0NIKyohvWak3eyr/ZiG44timJl1K6St+uP1Ad6XKtHuwAA",
  },
  {
    src: "/works/fridge-refrigerant.webp",
    alt: "Заправка холодильного контура манометрами",
    caption: "Заправка и ремонт холодильного контура",
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAwAgCdASoQABAAA4BaJYwCw7DPJ9QJG3MAAAD8dhqXU/eSZLmwU6YB4OcRYaue4pzVUWdy8aOH7z+Dtv8VheH3qkPm6H29bHNGj7K6MEqpjSrGNaUZG5I7fK0vbc4uhDjh5n6ev0vwAA==",
  },
  {
    src: "/works/washer-bearings.webp",
    alt: "Замена подшипников барабана стиральной машины",
    caption: "Замена подшипников стиральной машины",
    blurDataURL:
      "data:image/webp;base64,UklGRn4AAABXRUJQVlA4IHIAAABwAgCdASoQABAAA4BaJZwCdAYtfq6Ph8wv2AAAAP6jb2HGrSkWg22r5vGgKXIo2vqd1Avt/gzeom5JVplDZ6B2y0Nm0Oe0iLlKdPdSdOjK9MEWuVBgvcgYmeVyyq4ZudGBZLX2SsrlTei2cpuT03OoAAA=",
  },
  {
    src: "/works/washer-drain.webp",
    alt: "Чистка сливного фильтра стиральной машины",
    caption: "Стиральная машина не сливает воду",
    blurDataURL:
      "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAAAwAgCdASoQABAAA4BaJYgCdAYuHuPEwBbAAAD9AwAEuCLR2OGb70SksayWC3fFXucZoh36kvz6+a0ZzYvFLFmy5Ng4Ye/5ZXT/7G9xSc8bSBZZ6eedqNMfiTFQyXNwfcB9f/FdjeYq4aC8zUPMr1iCJkQun/sApKAAAA==",
  },
  {
    src: "/works/washer-diagnostics.webp",
    alt: "Диагностика стиральной машины мультиметром",
    caption: "Диагностика и ремонт стиральных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAACQAgCdASoQABAAA4BaJZQCdAYv12Xqp37r+gMGAAD+2B9w5be/6Y1A5nRbwkUGX6siZ0PX4Iw7A0eV7bEFa77IqgWpcL768DUuBgNaCB2sywXzGdxRNFj4/vj5ftL9fMUmck0DfCTBoStKpAA=",
  },
  {
    src: "/works/dishwasher-pump.webp",
    alt: "Ремонт сливного насоса посудомоечной машины",
    caption: "Посудомоечная машина не сливает воду",
    blurDataURL:
      "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABwAgCdASoQABAAA4BaJYwCdAdwBuilrk4VXaQAAP7XmpFFQJNJNoSniSIoLIYihg4s4ExrZa1iJ/iGZ4lQYX7z7r03j2/y5Dk2bAjZmVXhC3CWSh82lvORTE1ZspzgyWqu7+B3L6UDY324AAA=",
  },
  {
    src: "/works/dishwasher-drain.webp",
    alt: "Устранение протечки посудомоечной машины",
    caption: "Диагностика и ремонт посудомоечных машин",
    blurDataURL:
      "data:image/webp;base64,UklGRnoAAABXRUJQVlA4IG4AAAAwAgCdASoQABAAA4BaJQBOgMXD5NbntHqnYAD7I8SDvnIRwDjVuKfezdmaG5T7XNkp+5wGGR4enAAh5Dnv01OS430SfsDfB0JeoDkblzN290WyMgVmuh3buJCWJwt3W50VS6Y31aA3lXHu+oAAAA==",
  },
  {
    src: "/works/dishwasher-diagnostics.webp",
    alt: "Диагностика электроники посудомоечной машины",
    caption: "Посудомоечная машина не греет воду",
    blurDataURL:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADwAQCdASoQABAAA4BaJYwCsACzpNm3nQAA/uKVO+P8OOPlzh2QDqNzVXVQr4AZL7ZInx93EmuAeBHkYbgn9NmBxN7cA9gBhsrAoxdUfHWj74xBjsN9QWHg937Svt8qj7OdWPdr/U9w0DG8a0LCwAAA",
  },
];

export type Review = {
  author: string;
  text: string;
  /** Техника, если клиент назвал её в отзыве. Не додумываем. */
  tag?: string;
};

// Отзывы с карточки на Яндекс.Картах, дословно. Даты и уровни
// «Знатока города» не показываем — по просьбе владельца.
export const REVIEWS: Review[] = [
  {
    author: "Инкогнито 9742",
    tag: "Холодильник",
    text: "Прекрасное место, мастер Андрей и Дмитрий знают свое дело, умеют чинить как стиральные машины, так и холодильники, работают прозрачно и честно. Починили холодильник быстро и с первого раза, уже 10 месяцев после ремонта и никаких проблем!!! Все детально объясняют, показывают наглядно и на примерах, в общем рекомендую, реально классные ребята!",
  },
  {
    author: "Елена Морошкина",
    tag: "Посудомоечная машина",
    text: "Выражаем благодарность мастеру Дмитрию. Сломалась посудомоечная машина. Мастер приехал в назначенное время, провел диагностику, ремонт. Всё быстро, профессионально, аккуратно. Спасибо большое.",
  },
  {
    author: "Владимир П.",
    tag: "Стиральная машина",
    text: "Отличный сервис, все делают по совести, без развода на лишний ремонт, починили стиралку оперативно в срок, огромное спасибо мастеру Андрею!!!",
  },
  {
    author: "dronake27",
    tag: "Посудомоечная машина",
    text: "Привез посудомойку с поломкой (не грела воду) мастер Андрей все объяснил и предложил несколько вариантов замены ТЭНА. Я согласился. Срок ремонта обозначили в 5 дней. Через 3 дня все было готово.",
  },
  {
    author: "Владимир М.",
    text: "Отличная мастерская. Всё сделали быстро и качественно. Все вопросы и проблемы решили. Отличные специалисты, рекомендую. Цена и качество отличное.",
  },
  {
    author: "Мария Архипова",
    tag: "Стиральная машина",
    text: "Мастер Андрей починил стиральную машинку качественно. Отлично работает до сих пор. Цену не накручивает. Так же давала его координаты многим знакомым — все остались довольны. Рекомендую.",
  },
  {
    author: "Алина Б.",
    text: "Прекрасное место, мастера знают толк. Все починили в срок. Все работает, все супер!",
  },
  {
    author: "Ульяна С.",
    tag: "Стиральная машина",
    text: "Мастер Андрей помог в решении проблемы с поломанной стиральной машиной!!! Все вопросы решили!!! Профессионально, быстро!!! Большое спасибо!!!",
  },
  {
    author: "Галина Лукашенко",
    tag: "Стиральная машина",
    text: "Приобрела стиральную машинку, работает отлично уже 3 года, спасибо мастерам!!!",
  },
  {
    author: "Оксана З.",
    text: "Отличный мастер, сделал все быстро. Большое спасибо! Рекомендую!",
  },
  {
    author: "Андрей Андреев",
    text: "Отличная организация, ремонт быстрый и качественный.",
  },
];

export type PriceItem = {
  title: string;
  price: number;
  note?: string;
};

export type PriceGroup = {
  category: string;
  items: PriceItem[];
};

// Прайс дословно совпадает с разделом «Товары и услуги» на
// Яндекс.Картах — расхождение цен между сайтом и картой быстро
// превращается в спор с клиентом на пороге.
export const PRICES: PriceGroup[] = [
  {
    category: "Холодильники",
    items: [
      { title: "Диагностика и ремонт холодильников", price: 500 },
      { title: "Ремонт холодильника No Frost", price: 1000 },
      { title: "Заправка и ремонт холодильного контура", price: 2000 },
    ],
  },
  {
    category: "Стиральные машины",
    items: [
      { title: "Диагностика и ремонт стиральных машин", price: 500 },
      { title: "Не сливает воду", price: 500 },
      { title: "Не греет воду", price: 500 },
      { title: "Замена подшипников", price: 5000 },
    ],
  },
  {
    category: "Посудомоечные машины",
    items: [
      { title: "Диагностика и ремонт посудомоечных машин", price: 500 },
      { title: "Не сливает воду", price: 500 },
      { title: "Не греет воду", price: 500 },
    ],
  },
];

export const MASTERS: Master[] = [
  {
    name: "Дмитрий",
    specialty: "Холодильники",
    phoneDisplay: "+7 999 096-08-46",
    phoneHref: "+79990960846",
  },
  {
    name: "Андрей",
    specialty: "Стиральные машины",
    phoneDisplay: "+7 901 743-37-96",
    phoneHref: "+79017433796",
  },
  {
    name: "Андрей",
    specialty: "Посудомоечные машины",
    phoneDisplay: "+7 991 943-85-04",
    phoneHref: "+79919438504",
  },
];
