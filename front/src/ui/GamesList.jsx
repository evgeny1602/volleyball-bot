import { Loader } from '@/ui/Loader'
import { NoGames } from '@/ui/NoGames'
import { GameCardShort } from '@/ui/GameCardShort'
import { useGames } from '@/hooks/games'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { Modal } from '@/ui/Modal'
import { GameCardExtForm } from '@/ui/GameCardExtForm'
import { GameForm } from '@/ui/GameForm'
import { gameToFormData, getDateStr } from '@/utils/formatters'
import { tgVibro } from '@/utils/telegram'

export const GamesList = ({ filterDate }) => {
  const { data, isLoading } = useGames()
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

  const filterDateStr = getDateStr(filterDate)

  const games =
    data?.data.filter(
      (game) => game.start_datetime.split(' ')[0] == filterDateStr
    ) || []

  if (games.length == 0) return <NoGames />

  const handleCardShortClick = (game) => {
    tgVibro('medium')
    setCurrentGame(game)
    openView()
    // console.log('Game clicked:', game)
  }

  const handleOnEdit = (gameId) => {
    setCurrentGame(games.find((game) => game.id === gameId))
    openEdit()
  }

  return (
    <>
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
          <GameForm
            initialFormData={gameToFormData(currentGame)}
            onCancel={closeEdit}
          />
        </Modal>
      )}
    </>
  )
}
