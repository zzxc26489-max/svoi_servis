import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaStrip from "@/components/CtaStrip";
import StickyCallBar from "@/components/StickyCallBar";
import WorksGallery from "@/components/WorksGallery";
import QuickLeadForm from "@/components/QuickLeadForm";
import WorkStatus from "@/components/WorkStatus";
import { RatingPill } from "@/components/RatingBadge";
import { BUSINESS } from "@/lib/business";
import { ArrowRightIcon } from "@/components/icons";

const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";

export const metadata: Metadata = {
  title: "Наши работы — ремонт холодильников, стиральных и посудомоечных машин",
  description:
    "Фотоархив выполненных ремонтов: холодильники, стиральные и посудомоечные машины. Диагностика от 500 ₽, выезд в Зеленоград, Андреевку и соседние города.",
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export default function WorksPage() {
  return (
    <>
      <Header />
      <main>
        {/* Шапка страницы — тёмная, как первый экран главной, чтобы
            архив читался как часть сайта, а не отдельной вкладкой. */}
        <section id="top" className="dark-texture bg-ink-950">
          <div className="container-x py-12 sm:py-16">
            <nav aria-label="Хлебные крошки" className="text-sm">
              <Link
                href="/"
                className="text-brand-100/60 transition-colors hover:text-white"
              >
                Главная
              </Link>
              <span aria-hidden="true" className="mx-2 text-brand-100/30">
                /
              </span>
              <span className="text-white">Работы</span>
            </nav>

            <h1 className="mt-5 text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Наши работы
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-100/85">
              Как проходит диагностика и ремонт: холодильники, стиральные и
              посудомоечные машины. Работаем на дому и в мастерской в{" "}
              {BUSINESS.primaryAreas.join(", ")} и соседних городах.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <RatingPill />
              <WorkStatus />
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-x">
            <WorksGallery />
          </div>
        </section>

        {/* Архив не должен быть тупиком: со страницы всегда виден путь
            обратно в воронку — форма заявки и возврат к прайсу. */}
        <section id="order" className="section bg-mist-50">
          <div className="container-x">
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_26rem] lg:gap-14">
              <div>
                <p className="section-eyebrow">Заявка</p>
                <h2 className="section-title">
                  Похожая поломка? Починим и вашу
                </h2>
                <p className="section-subtitle">
                  Оставьте номер — перезвоним, расспросим о поломке и назовём
                  стоимость до выезда. Диагностика от 500&nbsp;₽.
                </p>
                <Link
                  href="/#prices"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Посмотреть цены на ремонт
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="card p-6 shadow-lift sm:p-7">
                <h3 className="font-display text-xl font-bold text-ink-900">
                  Вызвать мастера
                </h3>
                <div className="mt-5">
                  <QuickLeadForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <CtaStrip />
      <Footer />
      <StickyCallBar />
    </>
  );
}
