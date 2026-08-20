const contactPhone =
  process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+7 (900) 000-00-00";
const contactTelegram =
  process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/your_username";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-brand-950 py-12 text-brand-100/80">
      <div className="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-lg font-bold text-white">Свой Сервис</span>
          <p className="mt-2 max-w-sm text-sm">
            Ремонт бытовой техники на дому: холодильники, стиральные и
            посудомоечные машины, а также другая техника.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <a href={`tel:${contactPhone.replace(/[^+\d]/g, "")}`} className="hover:text-white">
            {contactPhone}
          </a>
          <a
            href={contactTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Telegram
          </a>
          <span>© {year} Свой Сервис. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
