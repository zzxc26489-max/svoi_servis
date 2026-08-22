const steps = [
  {
    title: "Оставляете заявку",
    description:
      "Номер телефона на сайте или прямой звонок мастеру — больше ничего заполнять не нужно.",
  },
  {
    title: "Мы перезваниваем",
    description:
      "Уточняем поломку, называем ориентировочную стоимость и согласуем удобное время.",
  },
  {
    title: "Диагностика на месте",
    description:
      "Мастер находит причину и озвучивает окончательную цену — до начала ремонта.",
  },
  {
    title: "Ремонт и гарантия",
    description:
      "Чиним на месте или забираем в мастерскую. На работы и запчасти — гарантия.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-mist-50">
      <div className="container-x">
        <p className="section-eyebrow">Как это работает</p>
        <h2 className="section-title">Четыре шага до рабочей техники</h2>

        {/* Нумерация здесь несёт смысл — это реальная последовательность */}
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 font-display text-base font-bold text-white">
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-px flex-1 bg-line lg:block"
                  />
                )}
              </div>
              <h3 className="mt-4 text-base font-bold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
