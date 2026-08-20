"use client";

import { FormEvent, useState } from "react";

const deviceTypes = [
  "Холодильник",
  "Стиральная машина",
  "Посудомоечная машина",
  "Плита / духовой шкаф",
  "Кондиционер",
  "Другая техника",
];

type Status = "idle" | "loading" | "success" | "error";

export default function OrderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      deviceType: String(formData.get("deviceType") ?? ""),
      brand: String(formData.get("brand") ?? ""),
      problem: String(formData.get("problem") ?? ""),
      address: String(formData.get("address") ?? ""),
      website: String(formData.get("website") ?? ""), // honeypot
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Не удалось отправить заявку. Попробуйте ещё раз.",
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="text-4xl">✅</span>
        <h3 className="mt-4 text-xl font-bold text-emerald-900">
          Заявка отправлена!
        </h3>
        <p className="mt-2 text-emerald-800">
          Мы свяжемся с вами в ближайшее время, чтобы уточнить детали.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-6"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/* honeypot: скрыто от людей, боты часто заполняют все поля */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Сайт</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Имя *
        </label>
        <input
          required
          id="name"
          name="name"
          type="text"
          maxLength={200}
          placeholder="Как к вам обращаться"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Телефон *
        </label>
        <input
          required
          id="phone"
          name="phone"
          type="tel"
          maxLength={20}
          placeholder="+7 (___) ___-__-__"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="deviceType"
          className="block text-sm font-medium text-slate-700"
        >
          Тип техники *
        </label>
        <select
          required
          id="deviceType"
          name="deviceType"
          defaultValue=""
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        >
          <option value="" disabled>
            Выберите технику
          </option>
          {deviceTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-1">
        <label htmlFor="brand" className="block text-sm font-medium text-slate-700">
          Марка / модель
        </label>
        <input
          id="brand"
          name="brand"
          type="text"
          maxLength={200}
          placeholder="Например, Bosch WLG24261"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="problem" className="block text-sm font-medium text-slate-700">
          Опишите проблему *
        </label>
        <textarea
          required
          id="problem"
          name="problem"
          rows={4}
          maxLength={1000}
          placeholder="Что случилось с техникой?"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-slate-700">
          Город / адрес *
        </label>
        <input
          required
          id="address"
          name="address"
          type="text"
          maxLength={300}
          placeholder="Город, улица, дом"
          className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </p>
      )}

      <div className="sm:col-span-2">
        <label className="flex items-start gap-2 text-sm text-slate-500">
          <input
            required
            type="checkbox"
            name="consent"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          Согласен(на) на обработку персональных данных
        </label>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}
