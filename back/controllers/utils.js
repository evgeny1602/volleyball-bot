export const getDateFromStr = (s, timeOffset) => {
  const [datePart, timePart] = s.split(' ')
  const [d, m, y] = datePart.split('.')
  const [hh, mm] = timePart.split(':')
  const dt = new Date(y, m - 1, d, hh, mm)
  dt.setHours(dt.getHours() + timeOffset)
  const _y = dt.getFullYear()
  const _m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const _d = dt.getDate().toString().padStart(2, '0')
  const _hh = dt.getHours().toString().padStart(2, '0')
  const _mm = dt.getMinutes().toString().padStart(2, '0')
  return `${_y}-${_m}-${_d} ${_hh}:${_mm}`
}

export const notifyUsers = async (text) => {
  const chatIds = [450980607]

  for (const chatId of chatIds) {
    await tgSendMessage(chatId, text)
  }
}

const tgSendMessage = async (chatId, text) => {
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

export const GMT = +7
