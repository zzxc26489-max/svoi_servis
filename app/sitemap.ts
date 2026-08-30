import type { MetadataRoute } from "next";

// Без этого сборка со статическим экспортом (GITHUB_PAGES=true) падает —
// см. тот же комментарий в app/robots.ts.
export const dynamic = "force-static";

// На превью GitHub Pages индексация всё равно запрещена (app/robots.ts),
// но карту всё равно собираем по реальному домену из env — если он не
// задан (локальная сборка, превью), даём пустой base, ссылки будут
// относительными и просто не используются никем.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Политика в карте есть (страница обязана быть доступной), но в
    // выдаче не нужна — на самой странице стоит noindex.
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];
}
