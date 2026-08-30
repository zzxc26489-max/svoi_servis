import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS, MASTERS } from "@/lib/business";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных — Свой Сервис",
  description:
    "Кто и зачем обрабатывает номер телефона, оставленный через форму на сайте, и как отозвать согласие.",
  // Страница нужна людям и проверяющим, а не поиску: в выдаче она только
  // отнимает показы у страниц, которые приводят заявки.
  robots: { index: false, follow: true },
};

const primaryMaster = MASTERS[0];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="section bg-white">
        <div className="container-x max-w-3xl">
          <p className="section-eyebrow">Документы</p>
          <h1 className="section-title">
            Политика обработки персональных данных
          </h1>
          <p className="section-subtitle">
            Коротко и без юридического тумана: какие данные мы получаем,
            зачем они нужны и как их удалить.
          </p>

          <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-ink-700">
            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Кто обрабатывает данные
              </h2>
              <p className="mt-2">
                {BUSINESS.operator.fullName} ({BUSINESS.operator.status}),
                мастерская «{BUSINESS.name}», {BUSINESS.address.full}.
              </p>
              <p className="mt-2">
                Связаться по любому вопросу об этих данных:{" "}
                <a
                  href={`tel:${primaryMaster.phoneHref}`}
                  className="font-semibold text-brand-600 hover:text-brand-700"
                >
                  {primaryMaster.phoneDisplay}
                </a>{" "}
                или{" "}
                <a
                  href={BUSINESS.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 hover:text-brand-700"
                >
                  Telegram
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Какие данные мы получаем
              </h2>
              <p className="mt-2">
                Только <strong>номер телефона</strong>. Других полей в форме
                нет: ни имени, ни адреса, ни почты. Адрес и суть поломки
                выясняем голосом, когда перезваниваем, и на сайте не храним.
              </p>
              <p className="mt-2">
                Заявка уходит нам сразу, как только номер введён полностью и
                отмечено согласие, — кнопку можно и не нажимать. Так сделано,
                чтобы заявка не потерялась, если вы отвлеклись.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Зачем
              </h2>
              <p className="mt-2">
                Чтобы перезвонить вам по заявке на ремонт: уточнить технику и
                поломку, назвать цену и согласовать время визита мастера.
                Рассылок мы не делаем и номера никому не продаём.
              </p>
              <p className="mt-2">
                Основание — ваше согласие. Вы даёте его сами, отметив галочку
                в форме; без неё заявка не отправляется.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Кому передаём
              </h2>
              <p className="mt-2">
                Заявка приходит нам в Telegram — это значит, что номер
                проходит через сервис Telegram и попадает на телефон мастера.
              </p>
              <p className="mt-2">
                Если ремонт по вашей заявке выполняет привлечённый
                независимый специалист, номер получает он — иначе он не
                сможет с вами связаться и приехать.
              </p>
              <p className="mt-2">
                Больше никому: ни рекламным сетям, ни колл-центрам, ни
                каким-либо базам.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Сколько храним
              </h2>
              <p className="mt-2">
                Пока это нужно для работы по заявке и гарантии на выполненный
                ремонт — или до тех пор, пока вы не попросите удалить номер.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Как отозвать согласие и удалить номер
              </h2>
              <p className="mt-2">
                Позвоните на{" "}
                <a
                  href={`tel:${primaryMaster.phoneHref}`}
                  className="font-semibold text-brand-600 hover:text-brand-700"
                >
                  {primaryMaster.phoneDisplay}
                </a>{" "}
                или напишите в{" "}
                <a
                  href={BUSINESS.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-600 hover:text-brand-700"
                >
                  Telegram
                </a>{" "}
                и скажите, что хотите отозвать согласие. Причину объяснять не
                нужно. Удалим номер и перестанем звонить.
              </p>
              <p className="mt-2">
                Вы также вправе узнать, какие ваши данные у нас есть, и
                потребовать исправить неточные.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Cookie и аналитика
              </h2>
              <p className="mt-2">
                Сайт не использует аналитические и рекламные cookie: здесь нет
                ни счётчиков посещаемости, ни рекламных пикселей, ни кнопок
                соцсетей, которые следят за посетителями.
              </p>
              <p className="mt-2">
                Если это изменится, мы напишем об этом здесь и спросим
                согласие отдельно — до того, как что-то включим.
              </p>
            </section>

            <section>
              <h2 className="font-display text-lg font-bold text-ink-900">
                Дети
              </h2>
              <p className="mt-2">
                Заявки принимаем от совершеннолетних. Если номер оставил
                ребёнок — сообщите нам, удалим.
              </p>
            </section>
          </div>

          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <p className="font-semibold text-ink-900">
              Остались вопросы по вашим данным?
            </p>
            <p className="mt-1 text-sm text-ink-700">
              Позвоните мастеру — ответим сразу, без заявлений и бумаг.
            </p>
            <a
              href={`tel:${primaryMaster.phoneHref}`}
              className="btn-primary mt-4 inline-flex"
            >
              {primaryMaster.phoneDisplay}
            </a>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            Вернуться на главную
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
