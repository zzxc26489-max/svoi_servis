const steps = [
  {
    number: "1",
    title: "Оставляете заявку",
    description:
      "Заполняете форму на сайте или звоните — коротко описываете технику и проблему.",
  },
  {
    number: "2",
    title: "Мы перезваниваем",
    description:
      "Уточняем детали, называем ориентировочную стоимость и согласовываем удобное время визита.",
  },
  {
    number: "3",
    title: "Диагностика на месте",
    description:
      "Мастер приезжает, определяет причину поломки и озвучивает окончательную стоимость ремонта.",
  },
  {
    number: "4",
    title: "Ремонт и гарантия",
    description:
      "Чиним технику на месте или забираем в мастерскую. На все работы и запчасти — гарантия.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="section-title">Как это работает</h2>
          <p className="section-subtitle">
            От заявки до починенной техники — четыре простых шага.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-bold text-brand-950">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
