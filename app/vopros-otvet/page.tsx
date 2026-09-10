import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaStrip from "@/components/CtaStrip";
import StickyCallBar from "@/components/StickyCallBar";
import QuestionForm from "@/components/QuestionForm";
import QuickLeadForm from "@/components/QuickLeadForm";
import WorkStatus from "@/components/WorkStatus";
import { RatingPill } from "@/components/RatingBadge";
import { QA } from "@/lib/business";
import { ArrowRightIcon } from "@/components/icons";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/structuredData";

const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "true";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const metadata: Metadata = {
  title: "Вопрос мастеру — ремонт холодильников и стиральных машин",
  description:
    "Реальные вопросы посетителей и ответы мастеров: холодильники, стиральные и посудомоечные машины. Задайте свой вопрос — ответим или подскажем, что делать.",
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export default function QuestionsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Главная", url: `${siteUrl}/` },
    { name: "Вопрос мастеру", url: `${siteUrl}/vopros-otvet` },
  ]);
  const faqSchema =
    QA.length > 0
      ? buildFaqSchema(QA.map((item) => ({ question: item.question, answer: item.answer })))
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header />
      <main>
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
              <span className="text-white">Вопрос мастеру</span>
            </nav>

            <h1 className="mt-5 text-[2rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              Вопрос мастеру
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-100/85">
              Реальные вопросы и честные ответы наших мастеров — без
              выдуманного стажа и регалий. Не нашли ответ на свой вопрос —
              спросите ниже.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <RatingPill />
              <WorkStatus />
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-x max-w-2xl">
            <p className="section-eyebrow">Свой вопрос</p>
            <h2 className="section-title">Спросите мастера</h2>
            <p className="section-subtitle">
              Ответим лично. Если вопрос частый — с вашего согласия ответ
              опубликуем здесь, а имя при желании можно сократить или скрыть.
            </p>
            <div className="mt-8">
              <QuestionForm />
            </div>
          </div>
        </section>

        <section className="section bg-mist-50">
          <div className="container-x">
            <p className="section-eyebrow">Уже спрашивали</p>
            <h2 className="section-title">Вопросы и ответы</h2>

            {QA.length === 0 ? (
              <p className="mt-6 max-w-xl text-ink-500">
                Пока вопросов нет — станьте первым, форма выше.
              </p>
            ) : (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {QA.map((item) => (
                  <div key={item.question} className="card p-5 sm:p-6">
                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                      {item.category}
                    </span>
                    <p className="mt-2 font-semibold text-ink-900">
                      {item.question}
                    </p>
                    {item.askedBy && (
                      <p className="mt-1 text-xs text-ink-400">
                        Вопрос от {item.askedBy}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {item.answer}
                    </p>
                    <p className="mt-3 text-xs font-medium text-ink-400">
                      Отвечает {item.answeredBy}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="order" className="section bg-white">
          <div className="container-x">
            <div className="grid items-start gap-8 lg:grid-cols-[1fr_26rem] lg:gap-14">
              <div>
                <p className="section-eyebrow">Заявка</p>
                <h2 className="section-title">Нужен мастер сейчас?</h2>
                <p className="section-subtitle">
                  Оставьте номер — перезвоним, расспросим о поломке и назовём
                  стоимость до выезда. Диагностика от 500&nbsp;₽.
                </p>
                <Link
                  href="/#prices"
                  className="mt-5 inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
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
