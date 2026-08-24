import { PRICES } from "@/lib/business";
import { ArrowRightIcon } from "./icons";

export default function Prices() {
  return (
    <section id="prices" className="section bg-mist-50">
      <div className="container-x">
        <p className="section-eyebrow">Цены</p>
        <h2 className="section-title">Стоимость известна до начала работ</h2>
        <p className="section-subtitle">
          Мастер называет итоговую цену после диагностики — и только потом
          берётся за ремонт. Никаких доплат «по ходу дела».
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PRICES.map((group) => (
            <div key={group.category} className="card overflow-hidden">
              <h3 className="border-b border-line bg-white px-6 py-4 text-base font-bold text-ink-900">
                {group.category}
              </h3>
              <dl className="divide-y divide-line">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-baseline justify-between gap-4 px-6 py-3.5"
                  >
                    <dt className="text-sm leading-snug text-ink-700">
                      {item.title}
                    </dt>
                    {/*   — неразрывные пробелы, чтобы «от», сумма и
                        «₽» никогда не разъезжались по разным строкам */}
                    <dd className="shrink-0 whitespace-nowrap font-display text-base font-bold tabular-nums text-ink-900">
                      {`от ${item.price.toLocaleString("ru-RU")} ₽`}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink-700">
            <span className="font-semibold text-ink-900">
              Другая техника — кондиционеры, кофемашины?
            </span>{" "}
            Примем в ремонт и подберём мастера. Цену назовём после диагностики.
          </p>
          <a href="#order" className="btn-primary shrink-0">
            Узнать стоимость
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
