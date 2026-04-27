import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, phone, message } = await request.json();

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lines = [
    "🔔 <b>Нова заявка з сайту</b>",
    "",
    `👤 <b>Ім'я:</b> ${name.trim()}`,
    `📞 <b>Телефон:</b> ${phone.trim()}`,
  ];
  if (message?.trim()) lines.push(`💬 <b>Запит:</b> ${message.trim()}`);
  lines.push("", `🌐 irinapolygraph.com.ua`);

  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: lines.join("\n"),
        parse_mode: "HTML",
      }),
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Telegram error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
