const advantages = [
  {
    icon: "✅",
    title: "Гарантия на работы",
    description: "Даём гарантию на выполненный ремонт и установленные запчасти.",
  },
  {
    icon: "⚡️",
    title: "Быстрый выезд",
    description: "Мастер приезжает в день обращения или на следующий день.",
  },
  {
    icon: "💰",
    title: "Честные цены",
    description: "Называем стоимость до начала ремонта — без скрытых доплат.",
  },
  {
    icon: "🧰",
    title: "Любая техника",
    description:
      "Если сами не чиним — передаём в проверенную партнёрскую мастерскую под контролем.",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="max-w-2xl">
          <h2 className="section-title">Почему выбирают нас</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <div key={item.title} className="rounded-2xl bg-brand-50 p-6">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-4 text-base font-bold text-brand-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
