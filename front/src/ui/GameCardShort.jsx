import { useState } from 'react'
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
import { gameToFormData } from '@/utils/formatters'

export const GameCardShort = ({ user, game, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mode, setMode] = useState('view')

  const handleCardClick = () => {
    tgVibro('medium')
    setMode('view')
    setIsModalOpen(true)
  }

  const handleFormSubmit = (formData) => {
    onChange(formData)
    setMode('view')
  }

  const handleModalClosed = () => {
    setIsModalOpen(false)
    onChange?.()
  }

  // console.log(game)

  return (
    <>
      <GameCardShortContainer
        onClick={handleCardClick}
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
              <StatusBadge
                user={user}
                game={game}
              />
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
          {mode == 'view' && (
            <GameCardExtForm
              user={user}
              gameId={game.id}
              onCancel={handleModalClosed}
              onEdit={() => setMode('edit')}
            />
          )}

          {mode == 'edit' && (
            <GameForm
              initialFormData={gameToFormData(game)}
              onCancel={() => setMode('view')}
              onSubmit={handleFormSubmit}
            />
          )}
        </Modal>
      )}
    </>
  )
}
