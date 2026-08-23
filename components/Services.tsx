import type { ReactNode } from "react";
import Carousel from "./Carousel";

// Простые line-иконки вместо эмодзи (эмодзи рендерятся по-разному на
// разных ОС и не читаются скринридерами осмысленно — см. чек-лист
// ui-ux-pro-max, категория "Style Selection").
function FridgeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <line x1="5" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="1.75" />
      <line x1="8" y1="5.5" x2="8" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="8" y1="11.5" x2="8" y2="14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function WashingMachineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect x="3" y="2" width="18" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <line x1="6" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="12" cy="13.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9.5 13.5a2.5 2.5 0 0 1 5 -1.8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function DishwasherIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect x="3" y="2" width="18" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="4.5" r="0.9" fill="currentColor" />
      <line x1="6" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="6" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="6" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function StoveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="8" cy="8.5" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="8.5" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6.5" y="13" width="11" height="5.5" rx="1.2" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function AcUnitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect x="2" y="6" width="20" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M6 18l2.5 -4M12 18l1 -4M17 18l1.5 -4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function SmallApplianceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
      <path d="M6 10h12v5a4 4 0 0 1 -4 4H10a4 4 0 0 1 -4 -4v-5Z" stroke="currentColor" strokeWidth="1.75" />
      <path d="M18 12h1.5a2 2 0 0 1 0 4H18" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9 3c0 1 -1 1 -1 2s1 1 1 2M13 3c0 1 -1 1 -1 2s1 1 1 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type Service = {
  icon: ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
};

const services: Service[] = [
  {
    icon: <FridgeIcon />,
    title: "Холодильники",
    description:
      "Не морозит, течёт, шумит, не выключается. Диагностика и ремонт компрессоров, термостатов, системы No Frost.",
    highlight: true,
  },
  {
    icon: <WashingMachineIcon />,
    title: "Стиральные машины",
    description:
      "Не сливает воду, не крутит барабан, течёт, выдаёт ошибку. Замена подшипников, насосов, электроники.",
    highlight: true,
  },
  {
    icon: <DishwasherIcon />,
    title: "Посудомоечные машины",
    description:
      "Не моет, не сушит, протекает, не набирает воду. Чистка, замена насосов и нагревательных элементов.",
    highlight: true,
  },
  {
    icon: <StoveIcon />,
    title: "Плиты и духовые шкафы",
    description: "Газовые и электрические плиты, варочные панели, духовки.",
  },
  {
    icon: <AcUnitIcon />,
    title: "Кондиционеры",
    description: "Заправка фреоном, чистка, ремонт сплит-систем.",
  },
  {
    icon: <SmallApplianceIcon />,
    title: "Кофемашины и мелкая техника",
    description: "Кофемашины, микроволновки, пылесосы, водонагреватели и др.",
  },
];

export default function Services() {
  const items = services.map((service) => (
    <li
      key={service.title}
      className={`w-[16rem] shrink-0 snap-start card-hover p-6 sm:w-[18rem] ${
        service.highlight ? "border-brand-200 bg-brand-50" : ""
      }`}
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700">
        {service.icon}
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink-900">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        {service.description}
      </p>
    </li>
  ));

  return (
    <section id="services" className="section bg-white">
      <div className="container-x">
        <p className="section-eyebrow">Услуги</p>
        <h2 className="section-title">Какую технику мы ремонтируем</h2>
        <p className="section-subtitle">
          Основная специализация — холодильники, стиральные и посудомоечные
          машины. Диагностика на месте, ремонт на дому или в мастерской.
        </p>

        <div className="mt-10">
          <Carousel ariaLabel="Виды ремонтируемой техники" items={items} />
        </div>

        <p className="mt-6 text-sm text-ink-400">
          Не нашли свою технику в списке? Оставьте заявку — подскажем, сможем
          ли помочь.
        </p>
      </div>
    </section>
  );
}
