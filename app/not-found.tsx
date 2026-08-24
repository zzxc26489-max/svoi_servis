import Link from "next/link";
import { MASTERS } from "@/lib/business";
import { ArrowRightIcon, PhoneIcon, ToolboxIcon } from "@/components/icons";

const primaryPhone = MASTERS[0];

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-mist-50">
      <div className="container-x py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
          <ToolboxIcon className="h-8 w-8" />
        </div>
        <p className="section-eyebrow mt-6">Ошибка 404</p>
        <h1 className="section-title">Такой страницы нет</h1>
        <p className="section-subtitle mx-auto max-w-xl">
          Возможно, адрес введён неточно или страница уже переехала.
          Возвращайтесь на главную — там всё, что нужно: цены, отзывы и
          форма заявки.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            На главную
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <a href={`tel:${primaryPhone.phoneHref}`} className="btn-secondary">
            <PhoneIcon className="h-5 w-5" />
            {primaryPhone.phoneDisplay}
          </a>
        </div>
      </div>
    </main>
  );
}
