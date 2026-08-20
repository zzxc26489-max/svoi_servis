import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Свой Сервис — ремонт бытовой техники на дому",
  description:
    "Ремонт холодильников, стиральных и посудомоечных машин, а также другой бытовой техники. Выезд мастера в день обращения, гарантия на все работы.",
  keywords: [
    "ремонт холодильников",
    "ремонт стиральных машин",
    "ремонт посудомоечных машин",
    "ремонт бытовой техники",
    "мастер на дом",
  ],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
