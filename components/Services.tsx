"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { withBasePath } from "@/lib/basePath";
import { selectAppliance, type ApplianceName } from "@/lib/appliance";

// title попадает в заявку как есть — см. lib/appliance.ts.
const services: {
  title: ApplianceName;
  image: string;
  alt: string;
}[] = [
  {
    title: "Холодильник",
    image: "/services/fridge-premium.webp",
    alt: "Современный холодильник на светлой кухне",
  },
  {
    title: "Стиральная машина",
    image: "/services/washer-premium.webp",
    alt: "Современная стиральная машина в светлом интерьере",
  },
  {
    title: "Посудомоечная машина",
    image: "/services/dishwasher-premium.webp",
    alt: "Открытая посудомоечная машина с чистой посудой",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-[#fbfbfc] py-8 sm:py-10 lg:py-9">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-[2rem] font-extrabold leading-tight tracking-[-0.035em] text-ink-900 sm:text-[2.35rem]">
              Что сломалось?
            </h2>
            <p className="mt-1.5 text-[15px] text-ink-500 sm:text-[16px]">
              Выберите технику — передадим мастеру вместе с заявкой
            </p>
          </div>
          <Link
            href="/#prices"
            className="hidden shrink-0 items-center gap-2 rounded-lg text-sm font-semibold text-ink-700 transition-colors hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:inline-flex"
          >
            Все услуги
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="-mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-6 lg:gap-6">
          {services.map((service) => (
            <li
              key={service.title}
              className="w-[84vw] max-w-[390px] shrink-0 snap-start overflow-hidden rounded-[12px] border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:w-auto sm:max-w-none"
            >
              <Link
                href="/#order"
                onClick={() => selectAppliance(service.title)}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
              >
                <div className="relative h-[160px] overflow-hidden bg-mist-50 sm:h-[180px] xl:h-[205px]">
                  <Image
                    src={withBasePath(service.image)}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 639px) 84vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="flex min-h-[72px] items-center justify-between gap-4 px-5 py-3.5">
                  <div>
                    <h3 className="font-display text-[17px] font-bold leading-tight text-ink-900 sm:text-[18px]">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-ink-500">
                      Диагностика от 500 ₽
                    </p>
                  </div>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist-100 text-ink-700 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#prices"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-700 sm:hidden"
        >
          Все услуги
          <ArrowRight weight="bold" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
