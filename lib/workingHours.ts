import { BUSINESS } from "./business";

/** Стадия дня. Примитив, а не объект — чтобы React мог сравнить его
    между рендерами (см. useSyncExternalStore в WorkStatus.tsx). */
export type WorkPhase = "open" | "before" | "after";

export type WorkStatusText = {
  isOpen: boolean;
  /** Короткая строка для бейджа: «Сейчас работаем» / «Уже закрыто». */
  label: string;
  /** Пояснение — что будет с заявкой, если оставить её сейчас. */
  detail: string;
};

/** Час в часовом поясе мастерской (0–23), а не в поясе посетителя. */
function hourAtBusiness(now: Date): number {
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    timeZone: BUSINESS.timeZone,
    hour: "numeric",
    hour12: false,
  }).format(now);
  // ru-RU с hour12: false может вернуть «24» вместо «00» — приводим к 0..23.
  return Number.parseInt(formatted, 10) % 24;
}

export function getWorkPhase(now: Date = new Date()): WorkPhase {
  const { opens, closes } = BUSINESS.hoursRange;
  const hour = hourAtBusiness(now);
  if (hour < opens) return "before";
  if (hour < closes) return "open";
  return "after";
}

// Честный статус без выдуманной срочности: до закрытия — говорим, до
// скольких принимаем, после — прямо пишем, что перезвоним утром, а не
// делаем вид, что мастер на линии круглосуточно.
export function describeWorkPhase(phase: WorkPhase): WorkStatusText {
  const { opens, closes } = BUSINESS.hoursRange;

  if (phase === "open") {
    return {
      isOpen: true,
      label: "Сейчас работаем",
      detail: `Принимаем заявки сегодня до ${closes}:00`,
    };
  }

  return {
    isOpen: false,
    label: "Сейчас нерабочее время",
    // До открытия — выйдем на связь сегодня же, после закрытия — утром.
    detail:
      phase === "before"
        ? `Оставьте номер — перезвоним после ${opens}:00`
        : `Оставьте номер — перезвоним завтра с ${opens}:00`,
  };
}

/** Подписка на смену стадии дня. Страницу могут держать открытой как
    раз на границе 22:00 — проверяем раз в минуту. */
export function subscribeToWorkPhase(onChange: () => void): () => void {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}
