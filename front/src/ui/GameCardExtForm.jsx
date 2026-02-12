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
            onClick={() => onPromote(player.tg_id)}
          >
            <ArrowUpCircle size={12} />
            <span>В основу</span>
          </Button>
        )}

        <Button
          variant="danger"
          className="h-7 px-2 text-xs gap-1"
          onClick={() => onRemove(player.tg_id)}
        >
          <MinusCircle size={12} />
          <span>Убрать</span>
        </Button>
      </div>
    </div>
  )
}

const PlayersList = ({ players, className }) => {
  if (!players.length) return null

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {players.map((player) => (
        <PlayerCard
          key={player.tg_id}
          player={player}
        />
      ))}
    </div>
  )
}

const PlayersSection = ({ players }) => {
  if (!players) return null

  if (players.length === 0) return null

  return (
    <div className="flex flex-col rounded-3xl overflow-hidden">
      <div className="bg-bot-grey-200 border-b-3 border-bot-primary p-2 text-center font-semibold">
        Участники
      </div>

      <div className="bg-white p-3 border-bot-grey-200 rounded-b-3xl border">
        <PlayersList players={players.filter((p) => p.status === 'main')} />

        {players.filter((p) => p.status === 'reserve').length > 0 && (
          <div className="w-full flex flex-col items-center mt-3 mb-5">
            <span className="bg-white px-2 text-center text-bot-grey-400 text-xs -mb-1.5 z-1">
              Резерв
            </span>
            <div className="w-full border-b border-dashed border-bot-grey-300"></div>
          </div>
        )}

        <PlayersList players={players.filter((p) => p.status === 'reserve')} />
      </div>
    </div>
  )
}

export const GameCardExtForm = ({ gameId, onCancel }) => {
  const { user, userIsLoading } = useUser()
  const { currentGame: game, getGame } = useGame()

  useEffect(() => {
    getGame(gameId)
  }, [gameId])

  console.log(game)

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

  if (userIsLoading)
    return (
      <GameCardExtContainer>
        <Loader variant="small" />
      </GameCardExtContainer>
    )

  const actions = {
    signIn: () => console.log('Записаться'),
    signOut: () => console.log('Отказаться'),
    addGuest: () => console.log('Добавить гостя'),
    edit: () => console.log('Редактировать'),
    delete: () => console.log('Удалить'),
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

      <PlayersSection players={game.players} />

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
            onClick={actions.edit}
          >
            <FilePenLine size={18} />
            Изменить игру
          </Button>
          <Button
            variant="danger"
            onClick={actions.delete}
          >
            <Trash2 size={18} />
            Удалить игру
          </Button>
        </div>
      )}
    </GameCardExtContainer>
  )
}
