import { PRICES } from "@/lib/business";
import { ArrowRightIcon } from "./icons";

function PriceRows({ items }: { items: (typeof PRICES)[number]["items"] }) {
  return (
    <dl className="divide-y divide-line">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-baseline justify-between gap-4 px-5 py-3.5 sm:px-6"
        >
          <dt className="text-sm leading-snug text-ink-700">{item.title}</dt>
          {/*   — неразрывные пробелы, чтобы «от», сумма и
              «₽» никогда не разъезжались по разным строкам */}
          <dd className="shrink-0 whitespace-nowrap font-display text-base font-bold tabular-nums text-ink-900">
            {`от ${item.price.toLocaleString("ru-RU")} ₽`}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function Prices() {
  return (
    <section id="prices" className="section bg-mist-50">
      <div className="container-x">
        <p className="section-eyebrow">Цены</p>
        <h2 className="section-title">Стоимость известна до начала работ</h2>
        <p className="section-subtitle">
          Выезд и диагностика — бесплатно при ремонте. Итоговую цену
          называем до начала работ — никаких доплат «по ходу дела».
        </p>

        {/* На мобильном 19 позиций подряд — это два с лишним экрана
            цифр, по которым непонятно, где кончается одна техника и
            начинается другая. Складываем в аккордеон: первая группа
            открыта, остальные — по клику.
            От lg показываем три колонки целиком, как было: там места
            хватает и сравнивать удобнее глазами, без кликов. */}
        <div className="mt-10 grid gap-4 lg:hidden">
          {PRICES.map((group, index) => (
            <details
              key={group.category}
              open={index === 0}
              className="card group overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-white px-5 py-4 text-base font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                {group.category}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl leading-none text-brand-600 transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-line">
                <PriceRows items={group.items} />
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-3">
          {PRICES.map((group) => (
            <div key={group.category} className="card overflow-hidden">
              <h3 className="border-b border-line bg-white px-6 py-4 text-base font-bold text-ink-900">
                {group.category}
              </h3>
              <PriceRows items={group.items} />
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
