import { GamesList } from '@/ui/GamesList'
import { useGames } from '@/hooks/games'
import { getWeekDates } from '@/utils/formatters'

export const MainGamesList = () => {
  const { data, isLoading } = useGames()
  const { start, end } = getWeekDates()

  // console.log({ start, end })

  const games =
    data?.data.filter(
      (game) =>
        game.start_datetime.split(' ')[0] >= start &&
        game.start_datetime.split(' ')[0] < end
    ) || []

  return (
    <div className="w-full p-4">
      {games.length == 0 && (
        <div className="font-semibold flex flex-col text-center items-center justify-center w-full text-bot-grey-800">
          На ближайшие 7 дней тренировок пока не запланировано
        </div>
      )}

      {games.length > 0 && (
        <>
          <div className="text-md font-semibold text-bot-grey-800 mb-2">
            Ближайшие игры:
          </div>

          <GamesList
            games={games}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  )
}
