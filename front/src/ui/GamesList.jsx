import { Loader } from '@/ui/Loader'
import { NoGames } from '@/ui/NoGames'
import { GameCardShort } from '@/ui/GameCardShort'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { Modal } from '@/ui/Modal'
import { GameCardExtForm } from '@/ui/GameCardExtForm'
import { BaseForm } from '@/ui/BaseForm'
import { gameToFormData } from '@/utils/formatters'
import { tgVibro } from '@/utils/telegram'
import { useGameActions } from '@/hooks/games'
import { gameSchema } from '@/utils/validations'
import { gameForm } from '@/utils/forms'

export const GamesList = ({ isLoading, games }) => {
  const { updateGame } = useGameActions()
  const [currentGame, setCurrentGame] = useState(null)
  const {
    isOpen: isViewOpen,
    open: openView,
    close: closeView,
  } = useModal(false)
  const {
    isOpen: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useModal(false)

  if (isLoading) return <Loader />

  if (games.length == 0)
    return <NoGames>На выбранную дату тренировок нет</NoGames>

  const handleCardShortClick = (game) => {
    tgVibro('medium')
    setCurrentGame(game)
    openView()
  }

  const handleOnEdit = (gameId) => {
    setCurrentGame(games.find((game) => game.id === gameId))
    openEdit()
  }

  return (
    <div className="h-screen overflow-y-auto scrollable-content pb-70">
      <div className="w-full flex flex-col gap-4">
        {games.map((game, index) => (
          <GameCardShort
            key={index}
            game={game}
            onClick={() => handleCardShortClick(game)}
          />
        ))}
      </div>

      {isViewOpen && (
        <Modal
          onClose={closeView}
          headerText={currentGame.name}
        >
          <GameCardExtForm
            gameId={currentGame.id}
            onCancel={closeView}
            onEdit={() => handleOnEdit(currentGame.id)}
          />
        </Modal>
      )}

      {isEditOpen && (
        <Modal
          onClose={closeEdit}
          headerText={currentGame.name}
        >
          <BaseForm
            formConfig={gameForm}
            schema={gameSchema}
            initialFormData={gameToFormData(currentGame)}
            onCancel={closeEdit}
            onSubmit={async (formData) => {
              await updateGame({ id: currentGame.id, data: formData })
              closeEdit?.()
            }}
          />
        </Modal>
      )}
    </div>
  )
}
