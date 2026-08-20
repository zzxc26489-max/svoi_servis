import QuickLeadForm from "./QuickLeadForm";
import DirectContacts from "./DirectContacts";
import { BUSINESS } from "@/lib/business";

export default function OrderSection() {
  return (
    <section id="order" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="section-title">Оставьте номер</h2>
            <p className="section-subtitle">
              Один номер телефона — больше ничего заполнять не нужно.
              Перезвоним в течение рабочего дня и уточним детали устно.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <p>📍 {BUSINESS.address.full}</p>
              <p>🕐 {BUSINESS.hours}</p>
              <a
                href={BUSINESS.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-semibold text-brand-900"
              >
                🗺 Мы на Яндекс.Картах — отзывы и фото
              </a>
            </div>

            <div className="mt-8" id="contacts">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                Уже знаете, что сломалось? Звоните напрямую нужному мастеру:
              </p>
              <DirectContacts />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:col-span-3 lg:flex lg:flex-col lg:justify-center">
            <QuickLeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
