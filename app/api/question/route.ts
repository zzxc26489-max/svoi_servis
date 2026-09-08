import { NextRequest, NextResponse } from "next/server";
import { buildQuestionMessage, sendTelegramMessage } from "@/lib/telegram";

// Тот же принцип, что и в app/api/order/route.ts, но окно шире —
// вопрос не такой срочный, как заявка на выезд, торопиться отвечать
// себе самим повторной отправкой незачем.
const RATE_LIMIT_MS = 60_000;
const lastSentByIp = new Map<string, number>();

const MIN_LENGTH = 5;
const MAX_LENGTH = 1000;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Некорректный формат запроса" },
      { status: 400 },
    );
  }

  // honeypot-поле: обычные пользователи его не видят и не заполняют
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const question =
    typeof body.question === "string" ? body.question.trim() : "";

  if (question.length < MIN_LENGTH || question.length > MAX_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "Опишите вопрос чуть подробнее" },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const lastSent = lastSentByIp.get(ip);
  if (lastSent && now - lastSent < RATE_LIMIT_MS) {
    return NextResponse.json({ ok: true });
  }
  lastSentByIp.set(ip, now);

  try {
    await sendTelegramMessage(buildQuestionMessage(question));
  } catch (error) {
    console.error("Ошибка отправки вопроса в Telegram:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Не удалось отправить вопрос. Попробуйте ещё раз.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
