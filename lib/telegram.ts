export type LeadSource = "click" | "auto";

export type OrderPayload = {
  phone: string;
  // "click" — клиент явно нажал кнопку «Жду звонка».
  // "auto" — клиент ввёл номер полностью, но кнопку не нажал (тихий
  // захват «брошенного» ввода — см. QuickLeadForm).
  source: LeadSource;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildOrderMessage(order: OrderPayload): string {
  const sourceLine =
    order.source === "click"
      ? "✅ Нажал(а) кнопку «Жду звонка»"
      : "🟡 Ввёл(а) номер и не нажал(а) кнопку — возможно, отвлёкся(лась). Перезвоните мягко, человек мог не успеть подтвердить";

  return [
    "🛠 <b>Новая заявка с сайта</b>",
    "",
    `📞 <b>Телефон:</b> ${escapeHtml(order.phone)}`,
    sourceLine,
  ].join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены на сервере",
    );
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(
      `Не удалось отправить сообщение в Telegram: ${response.status} ${errorBody}`,
    );
  }
}
