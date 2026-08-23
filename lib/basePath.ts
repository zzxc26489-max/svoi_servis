// На превью GitHub Pages сайт живёт в подпути (/svoi_servis) и картинки
// раздаются как есть (images.unoptimized: true в next.config.mjs) — в
// этом режиме next/image не добавляет basePath к src сам, это надо
// делать вручную. На боевом хостинге (Vercel, корень домена) basePath
// пустой, withBasePath ничего не меняет.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
