export const safariDateFix = (dateStr) => dateStr.replace(/-/g, '/')

export const dateFormatGameCard = (date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')

  return `${day}.${month}`
}

export const dateFormatGameCardExt = (date) => {
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  })
}

export const dayOfWeekFameCard = (dayNumber) =>
  ['', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][dayNumber]

export const timeFormatGameCard = (date) => {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${hours}:${minutes}`
}

export const dateTimeFormatGameCard = (date) => {
  const year = date.getFullYear()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const templateToFormData = (template) => {
  return {
    ...template,
    location: template.location_name,
    address: template.location_address,
    maxPlayers: template.max_players,
  }
}

export const gameToFormData = (game) => {
  const dateParts = game.start_datetime.split(' ')
  const [y, m, d] = dateParts[0].split('-')

  return {
    ...game,
    location: game.location_name,
    address: game.location_address,
    maxPlayers: game.max_players,
    date: `${d}.${m}.${y}`,
    time: dateParts[1],
  }
}

export const getWeekDays = (baseDate) => {
  const days = []
  const date = new Date(baseDate)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  date.setDate(diff)

  for (let i = 0; i < 7; i++) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export const getMonthYear = (weekStart) =>
  weekStart
    .toLocaleString('ru-RU', {
      month: 'long',
      year: 'numeric',
    })
    .replace(' г.', '')

export const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString()

export const getDateStr = (date) => {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')

  return `${y}-${m}-${d}`
}

export const getWeekDates = () => {
  const d1 = new Date()
  const d2 = new Date()
  d2.setDate(d2.getDate() + 7)
  const start = getDateStr(d1)
  const end = getDateStr(d2)
  return { start, end }
}
