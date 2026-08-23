"use client";

import { useSyncExternalStore } from "react";
import {
  describeWorkPhase,
  getWorkPhase,
  subscribeToWorkPhase,
  type WorkPhase,
} from "@/lib/workingHours";
import { ClockIcon } from "./icons";

// Страница отдаётся статикой, и время сборки не имеет отношения к
// моменту, когда её открыли, — статус считаем только в браузере. На
// сервере возвращаем null и ничего не рисуем, иначе клиент на долю
// секунды увидел бы неверный статус.
const getServerPhase = (): WorkPhase | null => null;

export default function WorkStatus({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  const phase = useSyncExternalStore(
    subscribeToWorkPhase,
    () => getWorkPhase(),
    getServerPhase,
  );

  if (!phase) return null;

  const status = describeWorkPhase(phase);
  const isDark = tone === "dark";

  return (
    <p
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm ${
        isDark
          ? "bg-white/10 text-white"
          : "border border-line bg-white text-ink-700"
      }`}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {status.isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
        )}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            status.isOpen ? "bg-emerald-400" : "bg-ink-400"
          }`}
        />
      </span>
      <ClockIcon
        className={`h-4 w-4 shrink-0 ${isDark ? "opacity-60" : "text-ink-400"}`}
      />
      <span>
        <span className="font-semibold">{status.label}.</span>{" "}
        <span className={isDark ? "text-brand-100/75" : "text-ink-500"}>
          {status.detail}
        </span>
      </span>
    </p>
  );
}
