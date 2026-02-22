const CHAT_IDS = [450980607]

const tgSendMessage = async (chatId, text) => {
  if (!chatId) return
  if (!text) return
  if (text.length == 0) return
  if (text.length > 4096) return

  const API_BASE_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`
  const endpoint = '/sendMessage'

  const params = new URLSearchParams({
    chat_id: chatId,
    text: text,
    parse_mode: 'HTML',
  })

  const url = `${API_BASE_URL}${endpoint}?${params}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error)
  }
}

export const notifyUsers = async (text) => {
  console.log({ text })
  for (const chatId of CHAT_IDS) {
    await tgSendMessage(chatId, text)
  }
}
