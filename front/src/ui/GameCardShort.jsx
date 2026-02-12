import { useMemo, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { Loader } from '@/ui/Loader'
import { StatusBadge } from '@/ui/StatusBadge'
import { GameCardShortLeft } from '@/ui/GameCardShortLeft'
import { GameCardShortContainer } from '@/ui/GameCardShortContainer'
import { tgVibro } from '@/utils/telegram'
import { GameCardExtForm } from '@/ui/GameCardExtForm'
import { Modal } from '@/ui/Modal'
import { GameLocation } from '@/ui/GameLocation'
import { GameAddress } from '@/ui/GameAddress'
import { GamePrice } from '@/ui/GamePrice'
import { GamePlayers } from '@/ui/GamePlayers'

export const GameCardShort = ({ game }) => {
  const { user, userIsLoading } = useUser()
  const [isExtOpen, setIsExtOpen] = useState(false)

  const status = useMemo(() => {
    if (!user || !game?.players) return 'out'
    return game.players.find((p) => p.tg_id === user.tg_id)?.status || 'out'
  }, [user, game.players])

  const handleClick = () => {
    tgVibro('medium')
    setIsExtOpen(true)
  }

  if (userIsLoading)
    return (
      <GameCardShortContainer>
        <Loader variant="small" />
      </GameCardShortContainer>
    )

  return (
    <>
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
              <GameLocation game={game} />
              <GameAddress game={game} />
            </div>

            <div className="flex flex-row flex-wrap justify-between items-center mt-auto gap-x-1">
              <GamePrice game={game} />
              <StatusBadge status={status} />
              <GamePlayers game={game} />
            </div>
          </div>
        </div>
      </GameCardShortContainer>

      {isExtOpen && (
        <Modal
          onClose={() => setIsExtOpen(false)}
          headerText={game.name}
        >
          <GameCardExtForm
            gameId={game.id}
            onCancel={() => setIsExtOpen(false)}
          />
        </Modal>
      )}
    </>
  )
}
