import {
  ShieldCheckIcon,
  BoltIcon,
  WalletIcon,
  ToolboxIcon,
} from "./icons";

const advantages = [
  {
    icon: ShieldCheckIcon,
    title: "Гарантия на работы",
    description:
      "Даём гарантию на выполненный ремонт и установленные запчасти.",
  },
  {
    icon: BoltIcon,
    title: "Быстрый выезд",
    description: "Мастер приезжает в день обращения или на следующий день.",
  },
  {
    icon: WalletIcon,
    title: "Честные цены",
    description: "Называем стоимость до начала ремонта — без скрытых доплат.",
  },
  {
    icon: ToolboxIcon,
    title: "Любая техника",
    description:
      "Если сами не чиним — передаём в проверенную партнёрскую мастерскую под контролем.",
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="section bg-white">
      <div className="container-x">
        <p className="section-eyebrow">Почему мы</p>
        <h2 className="section-title">Что получает клиент</h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
