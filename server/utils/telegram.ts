export function getTelegramBotToken() {
  return String(process.env.TELEGRAM_BOT_TOKEN || '').trim()
}

export function getTelegramChatId() {
  return String(process.env.TELEGRAM_CHAT_ID || '').trim()
}

export async function sendTelegramMessage(text: string) {
  const token = getTelegramBotToken()
  const chatId = getTelegramChatId()

  if (!token || !chatId) {
    return { ok: false as const, skipped: true as const }
  }

  const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true
    })
  })

  if (!resp.ok) {
    const body = await resp.text().catch(() => '')
    throw new Error(`telegram sendMessage failed: ${resp.status} ${body}`)
  }

  return { ok: true as const }
}
