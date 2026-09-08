"use client";

import { useId, useState } from "react";
import { CheckIcon } from "./icons";
import { MASTERS } from "@/lib/business";

type Status = "idle" | "sending" | "sent" | "invalid" | "failed";

const MIN_LENGTH = 5;

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const uid = useId();
  const fieldId = `question-${uid}`;
  const errorId = `question-error-${uid}`;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const trimmed = question.trim();
    if (trimmed.length < MIN_LENGTH) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, website: "" }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setStatus("failed");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <p className="font-semibold text-emerald-900">Вопрос передали мастеру</p>
          <p className="mt-1 text-sm text-emerald-800">
            Если ответ пригодится и другим — опубликуем его на этой странице.
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

      <div>
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-sm font-medium text-ink-700"
        >
          Ваш вопрос
        </label>
        <textarea
          id={fieldId}
          required
          rows={4}
          value={question}
          onChange={(event) => {
            setStatus("idle");
            setQuestion(event.target.value);
          }}
          placeholder="Например: холодильник шумит, но морозит нормально — это опасно?"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" ? errorId : undefined}
          className="w-full rounded-xl border border-line bg-mist-50 px-4 py-3 text-base text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-500/12"
        />
      </div>

      {status === "invalid" && (
        <p id={errorId} role="alert" className="-mt-2 text-xs text-red-600">
          Опишите вопрос чуть подробнее
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary w-full shadow-cta disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Отправляем…" : "Отправить вопрос"}
      </button>

      {status === "failed" && (
        <div role="alert" className="rounded-xl bg-amber-50 p-4 text-sm">
          <p className="font-semibold text-amber-900">Вопрос не отправился</p>
          <p className="mt-1 leading-relaxed text-amber-800">
            Позвоните или напишите нам напрямую — ответим быстрее.
          </p>
          <a
            href={`tel:${MASTERS[0].phoneHref}`}
            className="mt-2 inline-block font-semibold tabular-nums text-amber-900 underline underline-offset-4"
          >
            {MASTERS[0].phoneDisplay}
          </a>
        </div>
      )}
    </form>
  );
}
