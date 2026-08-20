import OrderForm from "./OrderForm";

const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+7 (900) 000-00-00";
const contactTelegram =
  process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/your_username";

export default function OrderSection() {
  return (
    <section id="order" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="section-title">Оставьте заявку</h2>
            <p className="section-subtitle">
              Заполните форму — мы перезвоним в течение рабочего дня и
              согласуем удобное время визита мастера.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <p>
                Или свяжитесь с нами напрямую:
              </p>
              <a
                href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`}
                className="flex items-center gap-2 text-base font-semibold text-brand-900"
              >
                📞 {contactPhone}
              </a>
              <a
                href={contactTelegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-base font-semibold text-brand-900"
              >
                ✈️ Написать в Telegram
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:col-span-3">
            <OrderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
