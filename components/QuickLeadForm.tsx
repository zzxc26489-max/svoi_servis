"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { TelegramIcon, WhatsAppIcon, CheckIcon } from "./icons";
import { BUSINESS, MASTERS } from "@/lib/business";
import {
  clearSelectedAppliance,
  getSelectedAppliance,
  getSelectedApplianceOnServer,
  subscribeToAppliance,
} from "@/lib/appliance";

// Через сколько мс тишины после ввода считаем номер «брошенным» и тихо
// отправляем его сами — даже если клиент не нажал кнопку.
const AUTO_SEND_DELAY_MS = 1500;

// "invalid" — номер введён не полностью, виноват ввод.
// "failed"  — номер в порядке, но заявка не ушла (нет сети, сервер
//             недоступен, превью без бэкенда). Винить клиента нельзя —
//             показываем прямой телефон, чтобы заявка не потерялась.
type Status =
  | "idle"
  | "sending"
  | "sent"
  | "invalid"
  | "failed"
  // Номер введён, но галочка согласия не отмечена.
  | "consent";

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

export default function QuickLeadForm({
  compact = false,
}: {
  // Сжатая версия для первого экрана: телефон и кнопка в один ряд,
  // подпись поля и блок Telegram/WhatsApp скрыты — мессенджеры есть
  // ниже, в секции заявки. Галочка согласия остаётся (без неё нельзя
  // принять номер) и по-прежнему выше поля, просто мельче.
  compact?: boolean;
} = {}) {
  const [phone, setPhone] = useState("");
  // Согласие на обработку номера. Отмечено по умолчанию — решение
  // владельца, принято осознанно повторно: формально предзаполненную
  // галочку Роскомнадзор надлежащим согласием не считает (нужно
  // активное действие человека), но владелец предпочёл не терять
  // заявки от тех, кто набрал номер и передумал жать кнопку. Галочку
  // можно снять — тогда ни тихая, ни ручная отправка не пройдут.
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [autoCaught, setAutoCaught] = useState(false);
  // Техника из блока «Что сломалось?». Полем формы её не делаем —
  // форма сознательно однополевая (см. PROJECT.md): приходит сама,
  // если человек кликнул карточку, и её видно, чтобы он понимал, что
  // уйдёт мастеру. Убрать можно крестиком.
  const appliance = useSyncExternalStore(
    subscribeToAppliance,
    getSelectedAppliance,
    getSelectedApplianceOnServer,
  );
  const sentDigitsRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Компонент используется на нескольких страницах (секция заявки,
  // архив работ) — без уникального id несколько экземпляров на одной
  // странице указывали бы на один и тот же id, ломая связь label/input
  // для скринридера.
  const uid = useId();
  const inputId = `lead-phone-${uid}`;
  const errorId = `lead-phone-error-${uid}`;
  const consentId = `lead-consent-${uid}`;
  const consentErrorId = `lead-consent-error-${uid}`;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function sendLead(digits: string, source: "click" | "auto") {
    if (sentDigitsRef.current === digits) {
      // Уже ушло тихим автозахватом — клик тем же номером просто
      // подтверждает клиенту, что заявку приняли, а не молчит.
      if (source === "click") setStatus("sent");
      return;
    }

    if (source === "click") setStatus("sending");

    const selected = getSelectedAppliance();

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: digits,
          source,
          website: "",
          // Читаем из стора, а не из замыкания: тихий автозахват
          // стреляет из таймера и держал бы значение на момент ввода.
          ...(selected ? { appliance: selected } : {}),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        if (source === "click") setStatus("failed");
        return;
      }

      sentDigitsRef.current = digits;
      clearSelectedAppliance();
      if (source === "click") {
        setStatus("sent");
      } else {
        setAutoCaught(true);
      }
    } catch {
      if (source === "click") setStatus("failed");
    }
  }

  // Тихая отправка «брошенного» номера — тоже отправка персональных
  // данных, поэтому планируем её только пока согласие отмечено.
  function scheduleAutoSend(formatted: string, allowed: boolean) {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!allowed) return;
    const digits = digitsOf(formatted);
    if (digits.length !== 11) return;
    timerRef.current = setTimeout(() => {
      void sendLead(digits, "auto");
    }, AUTO_SEND_DELAY_MS);
  }

  function handleConsentChange(checked: boolean) {
    setConsent(checked);
    if (status === "consent") setStatus("idle");
    scheduleAutoSend(phone, checked);
  }

  function handleChange(value: string) {
    setStatus("idle");
    setAutoCaught(false);
    const formatted = formatRuPhone(value);
    setPhone(formatted);
    scheduleAutoSend(formatted, consent);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);

    const digits = digitsOf(phone);
    if (digits.length !== 11) {
      setStatus("invalid");
      return;
    }
    if (!consent) {
      setStatus("consent");
      return;
    }
    void sendLead(digits, "click");
  }

  if (status === "sent") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-emerald-900">Заявка принята</p>
          <p className="mt-1 text-sm text-emerald-800">
            {appliance
              ? `Передали мастеру: ${appliance.toLowerCase()}. Перезвоним в ближайшее время.`
              : "Перезвоним в ближайшее время и уточним детали."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {appliance && (
        <div
          className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm ${
            compact
              ? "border border-line bg-mist-50 text-ink-700"
              : "border border-brand-200 bg-brand-50 text-ink-700"
          }`}
        >
          <span>
            Техника: <span className="font-semibold text-ink-900">{appliance}</span>
          </span>
          <button
            type="button"
            onClick={clearSelectedAppliance}
            aria-label="Убрать технику из заявки"
            className="-my-2 -mr-1 inline-flex min-h-[2.75rem] shrink-0 items-center px-2 text-lg leading-none text-ink-400 transition-colors hover:text-ink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            ×
          </button>
        </div>
      )}

      <div>
        <label
          htmlFor={consentId}
          className={
            compact
              ? "flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-ink-500"
              : "flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-ink-500"
          }
        >
          <input
            id={consentId}
            type="checkbox"
            checked={consent}
            onChange={(event) => handleConsentChange(event.target.checked)}
            aria-describedby={status === "consent" ? consentErrorId : undefined}
            className={
              compact
                ? "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line text-brand-600 accent-brand-600 focus:ring-2 focus:ring-brand-500/40"
                : "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line text-brand-600 accent-brand-600 focus:ring-2 focus:ring-brand-500/40"
            }
          />
          <span>
            Согласен, чтобы мне перезвонили по этому номеру —{" "}
            <Link
              href="/privacy"
              className={
                compact
                  ? "font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
                  : "font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
              }
            >
              как мы храним данные
            </Link>
          </span>
        </label>
        {status === "consent" && (
          <p
            id={consentErrorId}
            role="alert"
            className="mt-2 text-xs text-red-600"
          >
            Отметьте согласие — без него мы не имеем права принять номер
          </p>
        )}
      </div>

      <div className={compact ? "flex flex-col gap-3 sm:flex-row" : undefined}>
        <div className={compact ? "flex-1" : undefined}>
          {!compact && (
            <label
              htmlFor={inputId}
              className="mb-1.5 block text-sm font-medium text-ink-700"
            >
              Ваш номер телефона
            </label>
          )}
          <input
            id={inputId}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-label={compact ? "Ваш номер телефона" : undefined}
            value={phone}
            onChange={(event) => handleChange(event.target.value)}
            placeholder="+7 (___) ___-__-__"
            aria-invalid={status === "invalid"}
            aria-describedby={status === "invalid" ? errorId : undefined}
            className={
              compact
                ? "h-[52px] w-full rounded-[10px] border border-line bg-mist-50 px-4 text-base text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/12"
                : "h-12 w-full rounded-xl border border-line bg-mist-50 px-4 text-base text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/12"
            }
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className={
            compact
              ? "btn-primary !min-h-[52px] !rounded-[10px] shrink-0 shadow-cta disabled:cursor-not-allowed disabled:opacity-60"
              : "btn-primary w-full shadow-cta disabled:cursor-not-allowed disabled:opacity-60"
          }
        >
          {status === "sending" ? "Отправляем…" : "Жду звонка"}
        </button>
      </div>

      {status === "invalid" && (
        <p
          id={errorId}
          role="alert"
          className={"-mt-2 text-xs text-red-600"}
        >
          Введите номер полностью — 10 цифр после +7
        </p>
      )}
      {autoCaught && status !== "invalid" && (
        <p
          className={
            "-mt-2 text-xs text-emerald-700"
          }
        >
          ✓ Номер приняли, перезвоним
        </p>
      )}

      {status === "failed" && (
        <div role="alert" className="rounded-xl bg-amber-50 p-4 text-sm">
          <p className="font-semibold text-amber-900">
            Заявка не отправилась
          </p>
          <p className="mt-1 leading-relaxed text-amber-800">
            С номером всё в порядке — не сработала отправка. Позвоните или
            напишите нам напрямую, примем заявку сразу.
          </p>
          <a
            href={`tel:${MASTERS[0].phoneHref}`}
            className="mt-2 inline-block font-semibold tabular-nums text-amber-900 underline underline-offset-4"
          >
            {MASTERS[0].phoneDisplay}
          </a>
        </div>
      )}

      {!compact && (
        <>
          <div className="flex items-center gap-3 text-xs text-ink-400">
            <span className="h-px flex-1 bg-line" />
            или
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <a
              href={BUSINESS.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full !px-4"
            >
              <TelegramIcon className="h-5 w-5 shrink-0 text-[#2AABEE]" />
              Telegram
            </a>
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full !px-4"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </>
      )}
    </form>
  );
}
