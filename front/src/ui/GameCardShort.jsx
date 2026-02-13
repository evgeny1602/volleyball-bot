import { StatusBadge } from '@/ui/StatusBadge'
import { GameCardShortLeft } from '@/ui/GameCardShortLeft'
import { GameCardShortContainer } from '@/ui/GameCardShortContainer'
import { GameLocation } from '@/ui/GameLocation'
import { GameAddress } from '@/ui/GameAddress'
import { GamePrice } from '@/ui/GamePrice'
import { GamePlayers } from '@/ui/GamePlayers'

export const GameCardShort = ({ game, onClick }) => {
  return (
    <GameCardShortContainer
      onClick={onClick}
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
            <GameLocation game={game} />
            <GameAddress game={game} />
          </div>

          <div className="flex flex-row flex-wrap justify-between items-center mt-auto gap-x-1">
            <GamePrice game={game} />
            <StatusBadge game={game} />
            <GamePlayers game={game} />
          </div>
        </div>
      </div>
    </GameCardShortContainer>
  )
}
