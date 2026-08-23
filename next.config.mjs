const isGithubPages = process.env.GITHUB_PAGES === "true";
// Меняйте вместе с именем репозитория, если оно изменится.
const repoName = "svoi_servis";
const basePath = isGithubPages ? `/${repoName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath из конфига next/image (и next/link) подставляет сам, но
  // с images.unoptimized: true — НЕ подставляет в src картинок из
  // public/, это приходится делать вручную (lib/basePath.ts). Поэтому
  // прокидываем значение и в env, доступным на клиенте.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // Статический экспорт нужен только для превью на GitHub Pages —
  // на «боевом» хостинге (Vercel и т.п.) собираем как обычно, с рабочим
  // /api/order. Собирается через: GITHUB_PAGES=true npm run build
  ...(isGithubPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
