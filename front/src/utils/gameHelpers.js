import { safariDateFix, getDateStr } from '@/utils/formatters'

const MS_PER_DAY = 86_400_000

export const getGameProps = (game, thanksPeriodHours = 24) => {
  const now = new Date()
  const fixedDate = safariDateFix(game.start_datetime)
  const gameDate = new Date(fixedDate)
  const gameDurationMs = game.duration * 60 * 1000
  const gameEnd = new Date(gameDate.getTime() + gameDurationMs)
  const thanksPeriodMs = thanksPeriodHours * 60 * 60 * 1000
  const thanksEnd = new Date(gameEnd.getTime() + thanksPeriodMs)
  const isPastGame = now >= gameDate
  const isThankTime = now > gameEnd && now <= thanksEnd
  const isGameEnded = now > gameEnd
  // console.log({ game, isGameEnded })

  return { gameDate, gameEnd, isPastGame, isThankTime, isGameEnded }
}

export const getNewGuestFio = (players) => {
  const guestFio = 'Гость'
  const guestNumbers = players
    .map((p) => p.fio)
    .filter((fio) => fio.startsWith(guestFio))
    .map((fio) => parseInt(fio.split(' ')[1]))
  const newGuestNumber = Math.max(...guestNumbers, 0) + 1
  return `${guestFio} ${newGuestNumber}`
}

export const getGameDate = (game) => game.start_datetime.split(' ')[0]

export const getFilteredGames = ({
  games = [],
  userId,
  mode,
  lookBackDays,
}) => {
  if (!userId) return []

  const minGameDate = getDateStr(
    new Date(Date.now() - lookBackDays * MS_PER_DAY)
  )

  return games
    .filter((game) => {
      const isRecent = getGameDate(game) >= minGameDate
      const isParticipant = game.players.some((p) => p.id === userId)

      if (!isRecent || !isParticipant) return false

      const { isGameEnded } = getGameProps(game)
      return mode === 'past' ? isGameEnded : !isGameEnded
    })
    .toSorted((a, b) => {
      const comparison = a.start_datetime.localeCompare(b.start_datetime)
      return mode === 'past' ? -comparison : comparison
    })
}
