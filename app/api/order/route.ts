import { NextRequest, NextResponse } from "next/server";
import { buildOrderMessage, sendTelegramMessage } from "@/lib/telegram";

const MAX_FIELD_LENGTH = 1000;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Очень простая защита от спама на один инстанс сервера: не более
// одной заявки с одного IP раз в 20 секунд.
const lastRequestByIp = new Map<string, number>();
const RATE_LIMIT_MS = 20_000;

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

  const { name, phone, deviceType, brand, problem, address } = body;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(deviceType) ||
    !isNonEmptyString(problem) ||
    !isNonEmptyString(address)
  ) {
    return NextResponse.json(
      { ok: false, error: "Заполните, пожалуйста, все обязательные поля" },
      { status: 400 },
    );
  }

  const fields = [name, phone, deviceType, brand, problem, address];
  if (
    fields.some(
      (field) => typeof field === "string" && field.length > MAX_FIELD_LENGTH,
    )
  ) {
    return NextResponse.json(
      { ok: false, error: "Слишком длинное значение в одном из полей" },
      { status: 400 },
    );
  }

  const phonePattern = /^[+()\d\s-]{6,20}$/;
  if (!phonePattern.test(phone.trim())) {
    return NextResponse.json(
      { ok: false, error: "Проверьте, пожалуйста, номер телефона" },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const lastRequest = lastRequestByIp.get(ip);
  if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок. Попробуйте чуть позже." },
      { status: 429 },
    );
  }
  lastRequestByIp.set(ip, now);

  const message = buildOrderMessage({
    name: name.trim(),
    phone: phone.trim(),
    deviceType: deviceType.trim(),
    brand: typeof brand === "string" ? brand.trim() : undefined,
    problem: problem.trim(),
    address: address.trim(),
  });

  try {
    await sendTelegramMessage(message);
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
