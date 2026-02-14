import { GamesList } from '@/ui/GamesList'
import { useGames } from '@/hooks/games'
import { useCurrentUser } from '@/hooks/users'
import { getDateStr } from '@/utils/formatters'

export const MyGamesList = () => {
  const { data, isLoading: isGamesLoading } = useGames()
  const { user, isLoading: isUserLoading } = useCurrentUser()

  const start = getDateStr(new Date())
  const isLoading = isGamesLoading || isUserLoading

  const games =
    data?.data.filter(
      (game) =>
        game.start_datetime.split(' ')[0] >= start &&
        game.players.map((p) => p.id).includes(user.id)
    ) || []

  return (
    <div className="w-full p-4 h-full">
      {games.length == 0 && (
        <div className="font-semibold flex  flex-col text-center items-center justify-center w-full text-bot-grey-800">
          Самое время записаться на тренировку, чемпион!"
        </div>
      )}

      {games.length > 0 && (
        <GamesList
          games={games}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
