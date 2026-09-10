import Link from "next/link";
import { BUSINESS, joinRu } from "@/lib/business";
import { buildFaqSchema } from "@/lib/structuredData";
import { ArrowRightIcon } from "./icons";

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
    answer: `Основная зона — ${joinRu(BUSINESS.primaryAreas)}. По договорённости выезжаем в ${joinRu(BUSINESS.extendedAreas.slice(0, 5))} и другие города Подмосковья. Не уверены, доедем ли до вас — оставьте заявку с адресом, обсудим по телефону.`,
  },
  {
    question: "Что если моей техники нет в списке услуг?",
    answer:
      "Оставьте заявку с описанием техники и поломки — свяжемся и скажем, сможем ли помочь и сколько это будет стоить.",
  },
  {
    question: "Даёте ли вы гарантию и на какой срок?",
    answer: `Да — ${BUSINESS.warranty.full.charAt(0).toLowerCase()}${BUSINESS.warranty.full.slice(1)}`,
  },
  {
    question: "Ремонт на дому или нужно везти технику?",
    answer:
      "Большинство поломок устраняем на дому. Если нужен стенд или сложная разборка — забираем в мастерскую на Жилинской и возвращаем после ремонта.",
  },
];

export default function Faq() {
  const schema = buildFaqSchema(faqItems);

  return (
    <section id="faq" className="section bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-x">
        <p className="section-eyebrow">Вопросы</p>
        <h2 className="section-title">Что обычно спрашивают</h2>

        {/* Отступы — на самом summary, а не на карточке: иначе нажатие
            рядом с вопросом (по полю карточки) ничего не открывает,
            реагирует только строка текста. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="card group open:border-brand-300"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 font-semibold text-ink-900 [&::-webkit-details-marker]:hidden sm:p-6">
                {item.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl leading-none text-brand-600 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500 sm:px-6 sm:pb-6">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <Link
          href="/vopros-otvet"
          className="mt-5 inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Не нашли ответ — задайте свой вопрос мастеру
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
