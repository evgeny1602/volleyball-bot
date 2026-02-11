import { useMemo } from 'react'
import { useUser } from '@/hooks/useUser'
import { Loader } from '@/ui/Loader'
import { StatusBadge } from '@/ui/StatusBadge'
import { Users, House, MapPin, CreditCard } from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'
import { GameCardShortLeft } from '@/ui/GameCardShortLeft'
import { GameCardShortContainer } from '@/ui/GameCardShortContainer'
import { tgVibro } from '@/utils/telegram'

export const GameCardShort = ({ game }) => {
  const { user, userIsLoading } = useUser()

  const status = useMemo(() => {
    if (!user || !game?.players) return 'out'
    return game.players.find((p) => p.tg_id === user.tg_id)?.status || 'out'
  }, [user, game.players])

  const handleClick = () => {
    tgVibro('medium')
    console.log(game)
  }

  if (userIsLoading)
    return (
      <GameCardShortContainer>
        <Loader />
      </GameCardShortContainer>
    )

  return (
    <GameCardShortContainer
      onClick={handleClick}
      className="flex flex-row"
    >
      <GameCardShortLeft
        startDatetime={game.start_datetime}
        duration={game.duration}
      />

      <div className="flex flex-col flex-1 pt-2 pl-3 pr-6 pb-2 gap-1">
        <div className="text-black font-bold border-b border-dashed border-bot-grey-500 pb-2.5 mb-0.5 truncate text-sm">
          {game.name}
        </div>

        <div className="flex flex-col justify-between h-full">
          <div>
            <GameInfoRow Icon={House}>{game.location_name}</GameInfoRow>
            <GameInfoRow Icon={MapPin}>{game.location_address}</GameInfoRow>
          </div>

          <div className="flex flex-row flex-wrap justify-between items-center mt-auto">
            <GameInfoRow
              Icon={CreditCard}
              className="text-black"
            >
              {game.price} ₽
            </GameInfoRow>

            <StatusBadge status={status} />

            <GameInfoRow
              Icon={Users}
              className="text-bot-grey-600"
            >
              {game.players?.length || 0} из {game.max_players} чел.
            </GameInfoRow>
          </div>
        </div>
      </div>
    </GameCardShortContainer>
  )
}
