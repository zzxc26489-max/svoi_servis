import { BUSINESS, MASTERS } from "@/lib/business";
import { PhoneIcon, TelegramIcon, WhatsAppIcon } from "./icons";

// Тонкая тёмная полоса перед подвалом — последний шанс дать заявку
// тем, кто долистал страницу, но ещё не позвонил и не написал.
export default function CtaStrip() {
  return (
    <section className="bg-ink-950">
      <div className="container-x flex flex-col items-start gap-5 border-t border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white">
            Нужен мастер?
          </h2>
          <p className="mt-1 text-sm text-brand-100/60">
            Позвоните или напишите — ответим и назовём цену.
          </p>
        </div>

        <div className="grid w-full gap-2.5 sm:w-auto sm:auto-cols-max sm:grid-flow-col">
          <a
            href={`tel:${MASTERS[0].phoneHref}`}
            className="btn-primary w-full shadow-cta sm:w-auto"
          >
            <PhoneIcon className="h-5 w-5 shrink-0" />
            Позвонить
          </a>
          <a
            href={BUSINESS.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light w-full sm:w-auto"
          >
            <TelegramIcon className="h-5 w-5 shrink-0 text-[#2AABEE]" />
            Telegram
          </a>
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-light w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
