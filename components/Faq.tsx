const faqItems = [
  {
    question: "Сколько стоит диагностика?",
    answer:
      "Стоимость диагностики уточняется при звонке и зависит от типа техники. Если вы соглашаетесь на ремонт у нас — диагностика часто входит в стоимость работ.",
  },
  {
    question: "Вы работаете по выходным?",
    answer:
      "Да, принимаем заявки и выполняем выезды 7 дней в неделю. Точное время визита согласовываем по телефону.",
  },
  {
    question: "Что если моей техники нет в списке услуг?",
    answer:
      "Оставьте заявку с описанием техники и проблемы — мы отремонтируем сами или передадим в партнёрскую мастерскую и проконтролируем весь процесс.",
  },
  {
    question: "Даёте ли вы гарантию?",
    answer:
      "Да, на все выполненные работы и установленные запчасти предоставляется гарантия, срок которой зависит от вида ремонта.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="section-title">Частые вопросы</h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-base font-bold text-brand-950">
                {item.question}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
