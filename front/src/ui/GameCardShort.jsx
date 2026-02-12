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
import { GameForm } from './GameForm'

const gameToFormData = (game) => {
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

export const GameCardShort = ({ game, onChange }) => {
  const { user, userIsLoading } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState('view')

  const status = useMemo(() => {
    if (!user || !game?.players) return 'out'
    return game.players.find((p) => p.tg_id === user.tg_id)?.status || 'out'
  }, [user, game.players])

  const handleClick = () => {
    tgVibro('medium')
    setMode('view')
    setIsModalOpen(true)
  }

  const handleModalClosed = () => {
    setIsModalOpen(false)
    onChange?.()
  }

  if (userIsLoading)
    return (
      <GameCardShortContainer>
        <Loader variant="small" />
      </GameCardShortContainer>
    )

  console.log(game)

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

      {isModalOpen && (
        <Modal
          onClose={handleModalClosed}
          headerText={game.name}
        >
          {mode == 'view' ? (
            <GameCardExtForm
              gameId={game.id}
              onCancel={handleModalClosed}
              onEdit={() => setMode('edit')}
            />
          ) : (
            <GameForm
              initialState={gameToFormData(game)}
              onCancel={() => setMode('view')}
            />
          )}
        </Modal>
      )}
    </>
  )
}
