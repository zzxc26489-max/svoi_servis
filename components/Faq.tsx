import { BUSINESS, joinRu } from "@/lib/business";

const faqItems = [
  {
    question: "Сколько стоит диагностика?",
    answer:
      "Диагностика — от 500 ₽ и зависит от типа техники. Точную стоимость мастер называет на месте, до начала ремонта.",
  },
  {
    question: "Вы работаете по выходным?",
    answer:
      "Да, принимаем заявки и выезжаем каждый день с 9:00 до 22:00. Точное время визита согласуем по телефону.",
  },
  {
    question: "Куда вы выезжаете?",
    answer: `Основная зона — ${joinRu(BUSINESS.primaryAreas)}. По договорённости выезжаем в ${BUSINESS.extendedAreas.join(", ")} и другие города Подмосковья. Не уверены, доедем ли до вас — оставьте заявку с адресом, обсудим по телефону.`,
  },
  {
    question: "Что если моей техники нет в списке услуг?",
    answer:
      "Оставьте заявку с описанием техники и поломки — свяжемся и скажем, сможем ли помочь и сколько это будет стоить.",
  },
  {
    question: "Даёте ли вы гарантию?",
    answer:
      "Да, на все выполненные работы и установленные запчасти. Срок зависит от вида ремонта — мастер укажет его в документах.",
  },
  {
    question: "Ремонт на дому или нужно везти технику?",
    answer:
      "Большинство поломок устраняем на дому. Если нужен стенд или сложная разборка — забираем в мастерскую на Жилинской и возвращаем после ремонта.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="section bg-white">
      <div className="container-x">
        <p className="section-eyebrow">Вопросы</p>
        <h2 className="section-title">Что обычно спрашивают</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="card group p-5 open:border-brand-300 sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl leading-none text-brand-600 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
