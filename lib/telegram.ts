export type OrderPayload = {
  name: string;
  phone: string;
  deviceType: string;
  brand?: string;
  problem: string;
  address: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildOrderMessage(order: OrderPayload): string {
  const lines = [
    "🛠 <b>Новая заявка с сайта</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(order.name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(order.phone)}`,
    `🔧 <b>Техника:</b> ${escapeHtml(order.deviceType)}`,
  ];

  if (order.brand) {
    lines.push(`🏷 <b>Марка/модель:</b> ${escapeHtml(order.brand)}`);
  }

  lines.push(
    `📝 <b>Проблема:</b> ${escapeHtml(order.problem)}`,
    `📍 <b>Адрес/город:</b> ${escapeHtml(order.address)}`,
  );

  return lines.join("\n");
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
