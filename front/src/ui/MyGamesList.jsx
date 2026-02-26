import { useMemo, useState } from 'react'
import { Volleyball, History } from 'lucide-react'
import { GamesList } from '@/ui/GamesList'
import { useGames } from '@/hooks/games'
import { useCurrentUser } from '@/hooks/users'
import { getDateStr } from '@/utils/formatters'
import { NoGames } from '@/ui/NoGames'
import { BaseRadio } from '@/ui/BaseRadio'

const GAMES_RADIO_OPTIONS = [
  { id: 'active', label: 'Активные', Icon: Volleyball },
  { id: 'past', label: 'Прошедшие', Icon: History },
]

const getGameDate = (game) => game.start_datetime.split(' ')[0]

export const MyGamesList = ({ lookBackDays = 180 }) => {
  const lookBackMs = lookBackDays * 24 * 60 * 60 * 1000

  const { data, isLoading: isGamesLoading } = useGames()
  const { user, isLoading: isUserLoading } = useCurrentUser()
  const [mode, setMode] = useState('active')

  const isLoading = isGamesLoading || isUserLoading

  const filteredGames = useMemo(() => {
    if (!data?.data || !user?.id) return []

    const today = getDateStr(new Date())
    const minDate = getDateStr(new Date(Date.now() - lookBackMs))
    const myGames = data.data.filter((game) =>
      game.players.some((player) => player.id === user.id)
    )

    if (mode === 'active') {
      return myGames
        .filter((game) => getGameDate(game) >= today)
        .toSorted((a, b) => (a.start_datetime > b.start_datetime ? 1 : -1))
    }

    return myGames
      .filter((game) => {
        const date = getGameDate(game)
        return date >= minDate && date < today
      })
      .toSorted((a, b) => (a.start_datetime < b.start_datetime ? 1 : -1))
  }, [data, user, mode, lookBackDays])

  const emptyMessage =
    mode === 'active'
      ? 'Самое время записаться на тренировку, чемпион! 🏆'
      : 'Ты еще не участвовал в тренировках... 😕'

  return (
    <div className="w-full p-4 h-full flex-1 flex flex-col gap-8">
      <BaseRadio
        value={mode}
        options={GAMES_RADIO_OPTIONS}
        onChange={setMode}
      />

      {filteredGames.length === 0 && !isLoading ? (
        <NoGames>{emptyMessage}</NoGames>
      ) : (
        <GamesList
          games={filteredGames}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
