import { useEffect, useMemo } from 'react'
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

import { useUser } from '@/hooks/useUser'
import { GameInfoRow } from '@/ui/GameInfoRow'
import { StatusBadge } from './StatusBadge'
import { Loader } from '@/ui/Loader'
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
import { useGame } from '@/hooks/useGame'
import { tgAlert } from '@/utils/telegram'

const GameCardExtContainer = ({ children }) => (
  <div className="mt-4 flex flex-col gap-6">{children}</div>
)

const PlayerCard = ({ player, onPromote, onRemove }) => {
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
        {player.status === 'reserve' && (
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

const PlayersList = ({ players, className, onRemove, onPromote }) => {
  if (!players.length) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {players.map((player) => (
        <PlayerCard
          key={player.tg_id}
          player={player}
          onRemove={onRemove}
          onPromote={onPromote}
        />
      ))}
    </div>
  )
}

const PlayersSection = ({ players, onRemove, onPromote }) => {
  if (!players) return null

  if (players.length === 0) return null

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden">
      <div className="bg-bot-grey-200 border-b-3 border-bot-primary p-2 text-center font-semibold">
        Участники
      </div>

      <div className="bg-white p-3 border-bot-grey-200 rounded-b-3xl border">
        <PlayersList
          players={players.filter((p) => p.status === 'main')}
          onRemove={onRemove}
        />

        {players.filter((p) => p.status === 'reserve').length > 0 && (
          <div className="w-full flex flex-col items-center mt-3 mb-5">
            <span className="bg-white px-2 text-center text-bot-grey-400 text-xs -mb-1.5 z-1">
              Резерв
            </span>
            <div className="w-full border-b border-dashed border-bot-grey-300"></div>
          </div>
        )}

        <PlayersList
          players={players.filter((p) => p.status === 'reserve')}
          onRemove={onRemove}
          onPromote={onPromote}
        />
      </div>
    </div>
  )
}

export const GameCardExtForm = ({ gameId, onCancel, onChange, onEdit }) => {
  const { user, userIsLoading, createGuestUser } = useUser()
  const {
    currentGame: game,
    getGame,
    joinGame,
    leaveGame,
    promotePlayer,
    deleteGame,
    gameIsLoading,
  } = useGame()

  const isLoading = userIsLoading || gameIsLoading

  useEffect(() => {
    getGame(gameId)
  }, [gameId])

  const { isAdmin, status, gameDate, isRegistered } = useMemo(() => {
    const playerStatus =
      game?.players?.find((p) => p.tg_id === user?.tg_id)?.status || 'out'
    return {
      isAdmin: user?.role === 'admin',
      status: playerStatus,
      isRegistered: ['main', 'reserve'].includes(playerStatus),
      gameDate: game ? new Date(game.start_datetime) : null,
    }
  }, [user, game])

  if (isLoading)
    return (
      <GameCardExtContainer>
        <Loader variant="small" />
      </GameCardExtContainer>
    )

  const actions = {
    signIn: async () => {
      try {
        await joinGame(game.id, user.id)
        onChange?.()
      } catch (err) {
        tgAlert(err.message)
      }
    },
    signOut: async () => {
      try {
        await leaveGame(game.id, user.id)
        onChange?.()
      } catch (err) {
        tgAlert(err.message)
      }
    },
    addGuest: async () => {
      const guestFio = 'Гость'
      const guestNumbers = game.players
        .map((p) => p.fio)
        .filter((fio) => fio.startsWith(guestFio))
        .map((fio) => parseInt(fio.split(' ')[1]))
      const newGuestNumber = Math.max(...guestNumbers, 0) + 1
      const newGuestFio = `${guestFio} ${newGuestNumber}`

      const guestData = await createGuestUser(newGuestFio)

      if (!guestData) {
        console.log('Ошибка при создании гостя')
        return
      }

      try {
        await joinGame(game.id, guestData.userId)
        onChange?.()
      } catch (err) {
        tgAlert(err.message)
      }
    },
    editGame: onEdit,
    deleteGame: async () => {
      try {
        await deleteGame(game.id)
        onChange?.()
        onCancel?.()
      } catch (err) {
        tgAlert(err.message)
      }
    },
    deletePlayer: async (playerId) => {
      try {
        await leaveGame(game.id, playerId)
        onChange?.()
      } catch (err) {
        alert(err.message)
      }
    },
    promotePlayer: async (playerId) => {
      try {
        await promotePlayer(game.id, playerId)
        onChange?.()
      } catch (err) {
        alert(err.message)
      }
    },
  }

  return (
    <GameCardExtContainer>
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-0.5">
          <GameLocation game={game} />
          <GameAddress game={game} />
        </div>
        <StatusBadge status={status} />
      </div>

      {game.description && (
        <GameInfoRow Icon={Info}>{game.description}</GameInfoRow>
      )}

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
        {!isRegistered ? (
          <Button
            variant="success"
            onClick={actions.signIn}
          >
            <ClipboardCheck size={18} />
            {game.mode === 'main' ? 'Записаться' : 'Записаться в резерв'}
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={actions.signOut}
          >
            <ClipboardX size={18} />
            Отказаться
          </Button>
        )}
      </div>

      <PlayersSection
        players={game.players}
        onRemove={actions.deletePlayer}
        onPromote={actions.promotePlayer}
      />

      {isAdmin && (
        <div className="flex flex-col gap-3">
          <Button
            variant="success"
            onClick={actions.addGuest}
          >
            <UserPlus size={18} />
            Добавить гостя
          </Button>
          <Button
            variant="secondary"
            onClick={actions.editGame}
          >
            <FilePenLine size={18} />
            Изменить игру
          </Button>
          <Button
            variant="danger"
            onClick={actions.deleteGame}
          >
            <Trash2 size={18} />
            Удалить игру
          </Button>
        </div>
      )}
    </GameCardExtContainer>
  )
}
