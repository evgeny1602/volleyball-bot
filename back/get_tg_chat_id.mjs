import axios from 'axios'
import 'dotenv/config'

const API_BASE_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

const getChatIds = async () => {
  const endpoint = '/getUpdates'
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.ok) {
      throw new Error('Failed to fetch updates from Telegram API')
    }

    return new Map(
      data.result
        .filter((update) => update.message)
        .map((update) => [
          update.message.from.username
            ? update.message.from.username
            : `ID: ${update.message.from.id}`,
          update.message.chat.id,
        ])
    )
  } catch (error) {
    console.error('Ошибка при получении обновлений:', error.message)
    throw error
  }
}

const sendMessage = async (chatId, text) => {
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

const main = async () => {
  const chatId = 450980607
  //   const chatIds = await getChatIds()
  await sendMessage(chatId, 'Тест2')
}

main()
