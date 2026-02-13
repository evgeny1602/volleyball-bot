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
