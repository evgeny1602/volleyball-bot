import { useMemo } from 'react'
import {
  Info,
  Clock,
  UserPlus,
  ClipboardCheck,
  ClipboardX,
  FilePenLine,
  Trash2,
  MinusCircle,
  ArrowUpCircle,
} from 'lucide-react'
import { GameInfoRow } from '@/ui/GameInfoRow'
import { StatusBadge } from './StatusBadge'
import { Button } from './Button'
import { GameLocation } from './GameLocation'
import { GameAddress } from './GameAddress'
import { GamePrice } from './GamePrice'
import { GamePlayers } from './GamePlayers'
import {
  dateFormatGameCardExt,
  timeFormatGameCard,
  dateTimeFormatGameCard,
} from '@/utils/formatters'
import { UserAvatar } from './UserAvatar'
import { cn } from '@/utils/cn'
import { useGameActions, useGame } from '@/hooks/games'
import { useCurrentUser, useUserMutations } from '@/hooks/users'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { tgConfirm } from '@/utils/telegram'

const GameCardExtContainer = ({ children }) => (
  <div className={cn('mt-4 flex flex-col gap-6')}>{children}</div>
)

const PlayerCard = ({ player, onPromote, onRemove, canPromote }) => {
  const formattedDate = useMemo(
    () => dateTimeFormatGameCard(new Date(player.login_date)),
    [player.login_date]
  )

  return (
    <div className="flex items-center gap-3 bg-bot-grey-100 p-2 rounded-2xl">
      <UserAvatar
        variant="small"
        url={player.tg_avatar_url}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-black truncate text-sm">{player.fio}</span>
        <span className="text-xs text-bot-grey-500 leading-none mt-0.5">
          {formattedDate}
        </span>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        {player.status === 'reserve' && canPromote && (
          <Button
            variant="success"
            className="h-7 px-2 text-xs gap-1"
            onClick={() => onPromote(player.id)}
          >
            <ArrowUpCircle size={12} />
            <span>В основу</span>
          </Button>
        )}

        <Button
          variant="danger"
          className="h-7 px-2 text-xs gap-1"
          onClick={() => onRemove(player.id)}
        >
          <MinusCircle size={12} />
          <span>Убрать</span>
        </Button>
      </div>
    </div>
  )
}

const PlayersList = ({
  players,
  className,
  onRemove,
  onPromote,
  canPromote,
}) => {
  if (!players.length) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {players.map((player) => (
        <PlayerCard
          key={player.tg_id}
          player={player}
          onRemove={onRemove}
          onPromote={onPromote}
          canPromote={canPromote}
        />
      ))}
    </div>
  )
}

const PlayersSection = ({
  players,
  onRemove,
  onPromote,
  canPromote,
  mainCount,
  reserveCount,
}) => {
  if (!players) return null

  if (players.length === 0) return null

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden">
      <div className="bg-bot-grey-200 border-b-3 border-bot-primary p-2 text-center font-semibold flex items-center justify-center gap-2">
        Участники
        <span className="text-xs font-regular opacity-70">
          <span className="mr-0.5">[</span>
          {mainCount} + {reserveCount}
          <span className="ml-0.5">]</span>
        </span>
      </div>

      <div className="bg-white p-3 border-bot-grey-200 rounded-b-3xl border">
        {players.filter((p) => p.status === 'main').length > 0 && (
          <div className="w-full flex flex-col items-center -mt-2 mb-4">
            <span className="bg-white px-2 text-center text-bot-grey-400 text-xs -mb-1.5 z-1">
              Основа [{mainCount}]
            </span>
            <div className="w-full border-b border-dashed border-bot-grey-300"></div>
          </div>
        )}

        <PlayersList
          players={players.filter((p) => p.status === 'main')}
          onRemove={onRemove}
        />

        {players.filter((p) => p.status === 'reserve').length > 0 && (
          <div className="w-full flex flex-col items-center mt-3 mb-5">
            <span className="bg-white px-2 text-center text-bot-grey-400 text-xs -mb-1.5 z-1">
              Резерв [{reserveCount}]
            </span>
            <div className="w-full border-b border-dashed border-bot-grey-300"></div>
          </div>
        )}

        <PlayersList
          players={players.filter((p) => p.status === 'reserve')}
          onRemove={onRemove}
          onPromote={onPromote}
          canPromote={canPromote}
        />
      </div>
    </div>
  )
}

const getNewGuestFio = (players) => {
  const guestFio = 'Гость'
  const guestNumbers = players
    .map((p) => p.fio)
    .filter((fio) => fio.startsWith(guestFio))
    .map((fio) => parseInt(fio.split(' ')[1]))
  const newGuestNumber = Math.max(...guestNumbers, 0) + 1
  return `${guestFio} ${newGuestNumber}`
}

export const GameCardExtForm = ({ gameId, onCancel, onEdit }) => {
  const { user, isLoading } = useCurrentUser()
  const { data, isLoading: isGameLoading } = useGame(gameId)
  const { join, leave, promote, deleteGame, isPending } = useGameActions(gameId)
  const { createGuest } = useUserMutations()

  if (isLoading || isPending || isGameLoading) return <LoaderFullScreen />

  const isAdmin = user.role == 'admin'
  const game = data.game
  const signInText = game.mode === 'main' ? 'Записаться' : 'Записаться в резерв'
  const isJoined = game.players.some((p) => p.tg_id === user.tg_id)
  const gameDate = new Date(game.start_datetime.replace(/-/g, '/'))
  const mainCount = game.players.filter((p) => p.status === 'main').length
  const reserveCount = game.players.filter((p) => p.status === 'reserve').length
  const canPromote = mainCount < game.max_players

  const handleSignIn = async () =>
    await join({ gameId: game.id, userId: user.id })

  const handleSignOut = async () =>
    await leave({ gameId: game.id, userId: user.id })

  const handleRemovePlayer = async (playerId) => {
    const isConfirmed = await tgConfirm(
      'Вы уверены, что хотите убрать игрока из игры?'
    )
    if (isConfirmed) await leave({ gameId: game.id, userId: playerId })
  }

  const handlePromotePlayer = async (playerId) =>
    await promote({ gameId: game.id, userId: playerId })

  const handleAddGuest = async () => {
    const guestData = await createGuest(getNewGuestFio(game.players))
    await join({ gameId: game.id, userId: guestData.userId })
  }

  const handleEditGame = async () => {
    onEdit?.()
  }

  const handleDeleteGame = async () => {
    const isConfirmed = await tgConfirm('Вы уверены, что хотите удалить игру?')
    if (isConfirmed) {
      await deleteGame(game.id)
      onCancel()
    }
  }

  return (
    <GameCardExtContainer>
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-0.5">
          <GameLocation game={game} />
          <GameAddress game={game} />
        </div>
        <StatusBadge game={game} />
      </div>

      <GameInfoRow Icon={Info}>{game.description}</GameInfoRow>

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
        {!isJoined && (
          <Button
            variant="success"
            onClick={handleSignIn}
          >
            <ClipboardCheck size={18} />
            {signInText}
          </Button>
        )}

        {isJoined && (
          <Button
            variant="danger"
            onClick={handleSignOut}
          >
            <ClipboardX size={18} />
            Отказаться
          </Button>
        )}
      </div>

      <PlayersSection
        players={game.players}
        onRemove={handleRemovePlayer}
        onPromote={handlePromotePlayer}
        canPromote={canPromote}
        mainCount={mainCount}
        reserveCount={reserveCount}
      />

      {isAdmin && (
        <div className="flex flex-col gap-3">
          <Button
            variant="success"
            onClick={handleAddGuest}
          >
            <UserPlus size={18} />
            Добавить гостя
          </Button>

          <Button
            variant="secondary"
            onClick={handleEditGame}
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
    </GameCardExtContainer>
  )
}
