import { APPLIANCES, getMastersByPerson } from "@/lib/business";
import {
  AirConditionerIcon,
  PhoneIcon,
  CoffeeMachineIcon,
  DishwasherIcon,
  DryerIcon,
  FridgeIcon,
  WasherIcon,
} from "./icons";

const icons = {
  fridge: FridgeIcon,
  washer: WasherIcon,
  dishwasher: DishwasherIcon,
  dryer: DryerIcon,
  coffee: CoffeeMachineIcon,
  air: AirConditionerIcon,
} as const;

// Витрина, а не выбор: карточки ничего не открывают и никуда не ведут.
// Человеку нужно за секунду увидеть, что его технику и его марку
// берут, — а что именно сломалось, спросит мастер по телефону. Анкета
// на незнакомом сайте на этом месте только отпугивает.
export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-[#fbfbfc] py-10 sm:py-12">
      <div className="container-x">
        <h2 className="font-display text-[2rem] font-extrabold leading-tight tracking-[-0.035em] text-ink-900 sm:text-[2.35rem]">
          Какую технику ремонтируем
        </h2>
        <p className="mt-1.5 text-[15px] text-ink-500 sm:text-[16px]">
          Работаем с ходовыми марками — если вашей нет в списке, всё равно
          звоните, обычно беремся.
        </p>

        {/* До lg — лента с прокруткой: шесть карточек в столбик заняли бы
            пол-экрана. От lg встают сеткой, листать нечего. */}
        <ul className="-mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0">
          {APPLIANCES.map((group) => {
            const Icon = icons[group.icon];
            return (
              <li
                key={group.title}
                className="flex w-[78vw] max-w-[340px] shrink-0 snap-start flex-col rounded-[12px] border border-line bg-white p-5 lg:w-auto lg:max-w-none"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-brand-50 text-brand-500">
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-3.5 font-display text-[17px] font-bold leading-tight text-ink-900 sm:text-[18px]">
                  {group.title}
                </h3>

                {group.note && (
                  <p className="mt-1 text-[12px] font-medium text-ink-400">
                    {group.note}
                  </p>
                )}

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.brands.map((brand) => (
                    <li
                      key={brand}
                      className="rounded-full bg-mist-100 px-2.5 py-1 text-[12px] font-medium text-ink-700"
                    >
                      {brand}
                    </li>
                  ))}
                  <li className="px-1 py-1 text-[12px] text-ink-400">
                    и другие
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>

        {/* Телефоны прямо здесь, а не только в контактах семью экранами
            ниже: человек только что убедился, что его технику берут —
            это и есть момент, когда он готов звонить. Двое мастеров,
            у Андрея два номера по направлениям. */}
        <div className="mt-6 rounded-[12px] border border-line bg-white p-5 sm:mt-7">
          <p className="text-[15px] font-semibold text-ink-900">
            Звоните мастеру напрямую — без колл-центра
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
            {getMastersByPerson().flatMap((person) =>
              person.lines.map((line) => (
                <li key={line.phoneHref}>
                  <a
                    href={`tel:${line.phoneHref}`}
                    className="group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <span className="block text-[12px] text-ink-500">
                      {person.name} · {line.specialty.toLowerCase()}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[15px] font-bold tabular-nums text-ink-900 transition-colors group-hover:text-brand-600">
                      <PhoneIcon className="h-4 w-4 shrink-0 text-brand-500" />
                      {line.phoneDisplay}
                    </span>
                  </a>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
