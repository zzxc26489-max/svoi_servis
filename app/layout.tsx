import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { buildLocalBusinessSchema } from "@/lib/structuredData";
import BackToTopButton from "@/components/BackToTopButton";

// next/font самостоятельно хостит шрифты — нет внешних запросов
// к Google при загрузке страницы, нет скачка шрифта при рендере.
const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zel-servis.ru";

const title = "Свой Сервис — ремонт бытовой техники в Зеленограде и Андреевке";
const description =
  "Ремонт холодильников, стиральных и посудомоечных машин в Зеленограде, Андреевке и рядом. Диагностика от 500 ₽, выезд в день обращения, гарантия от 6 месяцев. Рейтинг 4,9 на Яндекс.Картах.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "ремонт холодильников",
    "ремонт стиральных машин",
    "ремонт посудомоечных машин",
    "ремонт бытовой техники",
    "мастер на дом",
    "ремонт бытовой техники Андреевка",
    "ремонт холодильников Зеленоград",
    "ремонт бытовой техники Солнечногорск",
    "ремонт стиральных машин Химки",
    "ремонт холодильников Красногорск",
    "ремонт бытовой техники Лобня",
  ],
  // Без явных og:title/og:description мессенджеры и соцсети берут
  // превью откуда попало (и потом подолгу кэшируют устаревшее) —
  // задаём их тем же текстом, что title/description.
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Свой Сервис",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  // Черновой предпросмотр на GitHub Pages не должен попадать в поиск —
  // индексировать будем только боевой домен.
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ff5a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = buildLocalBusinessSchema();

  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
        <BackToTopButton />
      </body>
    </html>
  );
}
