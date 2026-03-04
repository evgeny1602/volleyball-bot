import {
  Info,
  Clock,
  UserPlus,
  ClipboardCheck,
  ClipboardX,
  FilePenLine,
  Trash2,
} from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'
import { StatusBadge } from './StatusBadge'
import { Button } from '@/ui/Button'
import { GameLocation } from '@/ui/GameLocation'
import { GameAddress } from '@/ui/GameAddress'
import { GamePrice } from '@/ui/GamePrice'
import { GamePlayers } from '@/ui/GamePlayers'
import { dateFormatGameCardExt, timeFormatGameCard } from '@/utils/formatters'
import { useGameActions, useGame } from '@/hooks/games'
import { useCurrentUser, useUserMutations } from '@/hooks/users'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { tgConfirm } from '@/utils/telegram'
import { ParagraphedText } from '@/ui/ParagraphedText'
import { getGameProps, getNewGuestFio } from '@/utils/gameHelpers'
import { PlayersSection } from '@/ui/PlayersSection'

export const GameCardExtForm = ({ gameId, onCancel, onEdit }) => {
  const { user, isLoading } = useCurrentUser()
  const { data, isLoading: isGameLoading } = useGame(gameId)
  const { join, leave, promote, deleteGame, invalidateGame, isPending } =
    useGameActions(gameId)
  const { createGuest } = useUserMutations()

  if (isLoading || isPending || isGameLoading) {
    return <LoaderFullScreen />
  }

  const isAdmin = user.role == 'admin'
  const game = data.game
  const isJoined = game.players.some((p) => p.tg_id === user.tg_id)
  const { gameDate, isPastGame, isThankTime } = getGameProps(game)
  const mainCount = game.players.filter((p) => p.status === 'main').length
  const reserveCount = game.players.filter((p) => p.status === 'reserve').length
  const canPromote = mainCount < game.max_players

  const handleRemovePlayer = async (playerId) => {
    const isConfirmed = await tgConfirm(
      'Вы уверены, что хотите убрать игрока из игры?'
    )
    if (isConfirmed) {
      await leave({ gameId: game.id, userId: playerId })
    }
  }

  const handleAddGuest = async () => {
    const guestData = await createGuest(getNewGuestFio(game.players))
    await join({ gameId: game.id, userId: guestData.userId })
  }

  const handleDeleteGame = async () => {
    const isConfirmed = await tgConfirm('Вы уверены, что хотите удалить игру?')

    if (isConfirmed) {
      await deleteGame(game.id)
      onCancel()
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-6 scrollable-content">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-0.5">
          <GameLocation game={game} />
          <GameAddress game={game} />
        </div>
        <StatusBadge game={game} />
      </div>

      <GameInfoRow Icon={Info}>
        <ParagraphedText
          text={game.description}
          className="flex flex-col gap-1 text-xs"
        />
      </GameInfoRow>

      <div className="flex justify-between items-start">
        <GameInfoRow Icon={Clock}>
          <div className="flex flex-col">
            <span>{dateFormatGameCardExt(gameDate)}</span>
            <span>
              {timeFormatGameCard(gameDate)} • {game.duration} мин.
            </span>
          </div>
        </GameInfoRow>
        <GamePrice game={game} />
        <GamePlayers game={game} />
      </div>

      <div className="flex flex-col gap-3">
        {!isPastGame && !isJoined && (
          <Button
            variant={game.mode == 'main' ? 'success' : 'secondary'}
            onClick={async () =>
              await join({ gameId: game.id, userId: user.id })
            }
          >
            <ClipboardCheck size={18} />
            {game.mode === 'main' ? 'Записаться' : 'Записаться в резерв'}
          </Button>
        )}

        {!isPastGame && isJoined && (
          <Button
            variant="danger"
            onClick={async () =>
              await leave({ gameId: game.id, userId: user.id })
            }
          >
            <ClipboardX size={18} />
            Отказаться
          </Button>
        )}
      </div>

      <PlayersSection
        players={game.players}
        onRemove={handleRemovePlayer}
        onPromote={async (playerId) =>
          await promote({ gameId: game.id, userId: playerId })
        }
        canPromote={canPromote}
        mainCount={mainCount}
        reserveCount={reserveCount}
        isAdmin={isAdmin}
        isPastGame={isPastGame}
        isThankTime={isThankTime}
        gameId={game.id}
        onRespect={invalidateGame}
        isJoined={isJoined}
      />

      {isAdmin && (
        <div className="flex flex-col gap-3">
          {!isPastGame && (
            <Button
              variant="success"
              onClick={handleAddGuest}
            >
              <UserPlus size={18} />
              Добавить гостя
            </Button>
          )}

          <Button
            variant="secondary"
            onClick={async () => onEdit?.()}
          >
            <FilePenLine size={18} />
            Изменить игру
          </Button>

          <Button
            variant="danger"
            onClick={handleDeleteGame}
          >
            <Trash2 size={18} />
            Удалить игру
          </Button>
        </div>
      )}
    </div>
  )
}
