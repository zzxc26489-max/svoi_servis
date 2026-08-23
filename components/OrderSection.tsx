import QuickLeadForm from "./QuickLeadForm";
import DirectContacts from "./DirectContacts";
import WorkStatus from "./WorkStatus";
import { RatingCard } from "./RatingBadge";
import { BUSINESS } from "@/lib/business";
import { ClockIcon, MapPinIcon, MapIcon } from "./icons";

export default function OrderSection() {
  return (
    <section id="order" className="section bg-white">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
          {/* Контакты и доверие */}
          <div>
            <p className="section-eyebrow">Контакты</p>
            <h2 className="section-title">Как с нами связаться</h2>
            <p className="section-subtitle">
              Уже знаете, что сломалось? Звоните мастеру по вашей технике
              напрямую — он и приедет.
            </p>

            <div className="mt-8">
              <DirectContacts />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <RatingCard />

              <div className="card space-y-3 p-5 text-sm">
                <div className="flex gap-2.5">
                  <ClockIcon className="h-5 w-5 shrink-0 text-brand-600" />
                  <div>
                    <div className="font-semibold text-ink-900">
                      Режим работы
                    </div>
                    <div className="mt-0.5 text-ink-500">{BUSINESS.hours}</div>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <MapPinIcon className="h-5 w-5 shrink-0 text-brand-600" />
                  <div>
                    <div className="font-semibold text-ink-900">Мастерская</div>
                    <div className="mt-0.5 leading-snug text-ink-500">
                      {BUSINESS.address.street}, {BUSINESS.address.locality}
                    </div>
                    <a
                      href={BUSINESS.yandexMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 font-medium text-brand-600 hover:text-brand-700"
                    >
                      <MapIcon className="h-4 w-4" />
                      Показать на карте
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Форма заявки — плотная карточка без пустот */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6 shadow-lift sm:p-7">
              <div className="mb-4">
                <WorkStatus tone="light" />
              </div>
              <h3 className="font-display text-xl font-bold text-ink-900">
                Не знаете, в чём причина?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Оставьте номер — перезвоним, расспросим о поломке и подберём
                нужного мастера.
              </p>
              <div className="mt-5">
                <QuickLeadForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
