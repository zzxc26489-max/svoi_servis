"use client";

import { useEffect, useId, useRef, useState } from "react";

// Через сколько мс тишины после ввода считаем номер «брошенным» и тихо
// отправляем его сами — даже если клиент не нажал кнопку.
const AUTO_SEND_DELAY_MS = 1500;

type Status = "idle" | "sending" | "sent" | "error";

function formatRuPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (digits.length > 0 && !digits.startsWith("7")) digits = "7" + digits;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let out = digits.length > 0 ? "+7" : "";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

function digitsOf(phone: string): string {
  return phone.replace(/\D/g, "");
}

const contactTelegram =
  process.env.NEXT_PUBLIC_CONTACT_TELEGRAM ?? "https://t.me/your_username";

export default function QuickLeadForm({
  variant = "card",
}: {
  variant?: "card" | "compact";
}) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [autoCaught, setAutoCaught] = useState(false);
  const sentDigitsRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Компонент рендерится на странице дважды (Hero + секция заявки) —
  // без уникального id вторая пара label/input указывала бы на id
  // первой, ломая связь для скринридера.
  const uid = useId();
  const inputId = `quick-lead-phone-${uid}`;
  const errorId = `quick-lead-phone-error-${uid}`;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function sendLead(digits: string, source: "click" | "auto") {
    if (sentDigitsRef.current === digits) return;

    if (source === "click") setStatus("sending");

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: digits, source, website: "" }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        if (source === "click") setStatus("error");
        return;
      }

      sentDigitsRef.current = digits;
      if (source === "click") {
        setStatus("sent");
      } else {
        setAutoCaught(true);
      }
    } catch {
      if (source === "click") setStatus("error");
    }
  }

  function handleChange(value: string) {
    setStatus("idle");
    setAutoCaught(false);
    const formatted = formatRuPhone(value);
    setPhone(formatted);

    if (timerRef.current) clearTimeout(timerRef.current);

    const digits = digitsOf(formatted);
    if (digits.length === 11) {
      timerRef.current = setTimeout(() => {
        void sendLead(digits, "auto");
      }, AUTO_SEND_DELAY_MS);
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);

    const digits = digitsOf(phone);
    if (digits.length !== 11) {
      setStatus("error");
      return;
    }
    void sendLead(digits, "click");
  }

  const isDark = variant === "compact";

  if (status === "sent") {
    return (
      <div
        className={
          isDark
            ? "rounded-2xl border border-white/20 bg-white/10 p-5 text-white"
            : "rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"
        }
      >
        <p className="font-semibold">✅ Приняли! Перезвоним в ближайшее время.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor={inputId}
          className={
            isDark
              ? "mb-1.5 block text-sm font-medium text-white/80"
              : "mb-1.5 block text-sm font-medium text-slate-700"
          }
        >
          Ваш номер телефона
        </label>
        <input
          id={inputId}
          type="tel"
          inputMode="tel"
          required
          value={phone}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="+7 (___) ___-__-__"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          className={
            isDark
              ? "w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              : "w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          }
        />
        {autoCaught && (
          <p
            aria-live="polite"
            className={
              isDark
                ? "mt-1.5 text-xs text-white/70"
                : "mt-1.5 text-xs text-slate-500"
            }
          >
            ✓ Номер приняли, перезвоним
          </p>
        )}
        {status === "error" && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-500">
            Проверьте номер телефона
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary flex-1 whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          {status === "sending" ? "Отправляем..." : "Жду звонка"}
        </button>
        <a
          href={contactTelegram}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isDark
              ? "btn-secondary flex-1 whitespace-nowrap !bg-white/10 !text-white !ring-white/20 hover:!bg-white/20 sm:flex-none"
              : "btn-secondary flex-1 whitespace-nowrap sm:flex-none"
          }
        >
          ✈️ Telegram
        </a>
      </div>

      <p
        className={
          isDark ? "text-xs text-white/60" : "text-xs text-slate-500"
        }
      >
        Отправляя номер, вы соглашаетесь с обработкой персональных данных.
      </p>
    </form>
  );
}
