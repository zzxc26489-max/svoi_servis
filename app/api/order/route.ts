import { NextRequest, NextResponse } from "next/server";
import { buildOrderMessage, sendTelegramMessage } from "@/lib/telegram";

// Простая защита от спама на один инстанс сервера: одна и та же пара
// IP+номер не отправляется чаще, чем раз в это время. Короткое окно —
// специально: при автозахвате пользователь может поправить последнюю
// цифру и мы не хотим наказывать его слишком строгим лимитом.
const RATE_LIMIT_MS = 15_000;
const lastSentByKey = new Map<string, number>();

function normalizePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }
  if (digits.length === 10) {
    digits = "7" + digits;
  }
  if (digits.length !== 11 || !digits.startsWith("7")) {
    return null;
  }
  return `+${digits}`;
}

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

  const rawPhone = body.phone;
  const source = body.source === "auto" ? "auto" : "click";

  if (typeof rawPhone !== "string") {
    return NextResponse.json(
      { ok: false, error: "Не указан номер телефона" },
      { status: 400 },
    );
  }

  const phone = normalizePhone(rawPhone);
  if (!phone) {
    return NextResponse.json(
      { ok: false, error: "Проверьте, пожалуйста, номер телефона" },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const key = `${ip}:${phone}`;
  const now = Date.now();
  const lastSent = lastSentByKey.get(key);
  if (lastSent && now - lastSent < RATE_LIMIT_MS) {
    // Уже приняли этот номер только что — отвечаем успехом молча,
    // чтобы не пугать пользователя ошибкой при повторном автозахвате.
    return NextResponse.json({ ok: true });
  }
  lastSentByKey.set(key, now);

  try {
    await sendTelegramMessage(buildOrderMessage({ phone, source }));
  } catch (error) {
    console.error("Ошибка отправки заявки в Telegram:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Не удалось отправить заявку. Пожалуйста, позвоните нам напрямую.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
