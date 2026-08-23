import { BUSINESS } from "@/lib/business";
import QuickLeadForm from "./QuickLeadForm";
import WorkStatus from "./WorkStatus";
import { RatingPill } from "./RatingBadge";
import { BoltIcon, ShieldCheckIcon, WalletIcon } from "./icons";

const trustPoints = [
  {
    icon: BoltIcon,
    title: "Выезд в день обращения",
    text: "Ежедневно 9:00–22:00",
  },
  {
    icon: WalletIcon,
    //   — неразрывный пробел: иначе «₽» отрывается на новую строку
    title: "Диагностика от 500 ₽",
    text: "Цена ремонта — до начала работ",
  },
  {
    icon: ShieldCheckIcon,
    title: "Гарантия на работы",
    text: "И на установленные запчасти",
  },
];

export default function Hero() {
  return (
    <section id="top" className="dark-texture relative overflow-hidden bg-ink-950">
      {/* Мягкая подсветка фона — задаёт глубину, не отвлекая от текста */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70rem 40rem at 15% -10%, rgba(52,102,246,0.45) 0%, transparent 60%), radial-gradient(50rem 30rem at 90% 0%, rgba(234,88,12,0.22) 0%, transparent 55%)",
        }}
      />

      <div className="container-x relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Левая колонка — оффер и доверие */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <RatingPill />
              <WorkStatus />
            </div>

            <h1 className="mt-6 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Ремонт холодильников и стиральных машин{" "}
              <span className="text-accent-500">на дому</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100/85">
              {BUSINESS.primaryAreas.join(", ")} и соседние районы. Свой
              мастер по каждому направлению — звоните напрямую, без
              колл-центра и ожидания на линии.
            </p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-6">
              {trustPoints.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3 sm:block">
                  <Icon className="h-6 w-6 shrink-0 text-accent-500 sm:mb-2.5" />
                  <div className="min-w-0">
                    <dt className="text-[0.95rem] font-semibold leading-snug text-white">
                      {title}
                    </dt>
                    <dd className="mt-1 text-sm leading-snug text-brand-100/60">
                      {text}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Правая колонка — форма заявки, главное действие страницы */}
          <div className="rounded-2xl bg-white p-6 shadow-lift sm:p-7">
            <h2 className="text-xl font-bold text-ink-900">
              Вызвать мастера
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              Оставьте номер — перезвоним, уточним поломку и назовём
              стоимость до выезда.
            </p>
            <div className="mt-5">
              <QuickLeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
