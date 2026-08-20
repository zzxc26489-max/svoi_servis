type Service = {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
};

const services: Service[] = [
  {
    icon: "🧊",
    title: "Холодильники",
    description:
      "Не морозит, течёт, шумит, не выключается. Диагностика и ремонт компрессоров, термостатов, системы No Frost.",
    highlight: true,
  },
  {
    icon: "🌀",
    title: "Стиральные машины",
    description:
      "Не сливает воду, не крутит барабан, течёт, выдаёт ошибку. Замена подшипников, насосов, электроники.",
    highlight: true,
  },
  {
    icon: "🍽",
    title: "Посудомоечные машины",
    description:
      "Не моет, не сушит, протекает, не набирает воду. Чистка, замена насосов и нагревательных элементов.",
    highlight: true,
  },
  {
    icon: "🔥",
    title: "Плиты и духовые шкафы",
    description: "Газовые и электрические плиты, варочные панели, духовки.",
  },
  {
    icon: "❄️",
    title: "Кондиционеры",
    description: "Заправка фреоном, чистка, ремонт сплит-систем.",
  },
  {
    icon: "☕️",
    title: "Кофемашины и мелкая техника",
    description: "Кофемашины, микроволновки, пылесосы, водонагреватели и др.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="section-title">Какую технику мы ремонтируем</h2>
          <p className="section-subtitle">
            Основная специализация — холодильники, стиральные и посудомоечные
            машины. Остальную бытовую технику принимаем в ремонт и
            передаём проверенным партнёрским мастерским под своим контролем.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={`rounded-2xl border p-6 transition-shadow hover:shadow-card ${
                service.highlight
                  ? "border-brand-200 bg-brand-50"
                  : "border-slate-100 bg-white"
              }`}
            >
              <span className="text-3xl">{service.icon}</span>
              <h3 className="mt-4 text-lg font-bold text-brand-950">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-500">
          Не нашли свою технику в списке? Оставьте заявку — мы подскажем,
          сможем ли помочь.
        </p>
      </div>
    </section>
  );
}
