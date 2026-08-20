import { BUSINESS } from "@/lib/business";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #3181ff 0%, transparent 45%), radial-gradient(circle at 80% 0%, #ff7a30 0%, transparent 40%)",
        }}
      />
      <div className="container-x relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100">
            Выезд мастера в день обращения · {BUSINESS.address.locality}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Ремонт бытовой техники{" "}
            <span className="text-accent">на дому</span> — быстро, честно, с
            гарантией
          </h1>

          <p className="mt-5 text-lg text-brand-100/90">
            Чиним холодильники, стиральные и посудомоечные машины в
            Андреевке, Зеленограде и рядом. Также принимаем в ремонт любую
            другую бытовую технику — работаем с проверенными
            мастерскими-партнёрами, чтобы вы не искали мастера сами.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#order" className="btn-primary">
              Оставить заявку
            </a>
            <a href="#services" className="btn-secondary !bg-white/10 !text-white !ring-white/20 hover:!bg-white/20">
              Какую технику чиним
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-white">
            <div>
              <dt className="text-2xl font-bold sm:text-3xl">1 день</dt>
              <dd className="mt-1 text-sm text-brand-100/80">до выезда мастера</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold sm:text-3xl">до 12 мес</dt>
              <dd className="mt-1 text-sm text-brand-100/80">гарантия на работы</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold sm:text-3xl">любая техника</dt>
              <dd className="mt-1 text-sm text-brand-100/80">примем в ремонт</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
