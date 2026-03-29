import { MinusCircle, ArrowUpCircle, Star } from 'lucide-react'
import { dateTimeFormatGameCard } from '@/utils/formatters'
import { UserAvatarModal } from '@/ui/UserAvatarModal'
import { safariDateFix } from '@/utils/formatters'
import { AdminBadge } from '@/ui/AdminBadge'
import { ModalButton } from '@/ui/ModalButton'
import { ThanksModal } from '@/ui/ThanksModal'
import { RespectBadge } from '@/ui/RespectBadge'
import { useCurrentUser } from '@/hooks/users'
import { useRestThanks } from '@/hooks/thanks'
import { Button } from '@/ui/Button'
import { IS_WEB } from '@/utils/telegram'

export const PlayerCard = ({
  player,
  onPromote,
  onRemove,
  canPromote,
  isAdmin,
  isPastGame,
  isThankTime,
  gameId,
  onRespect,
  isJoined,
}) => {
  const { user } = useCurrentUser()
  const { data, isLoading: isThanksLoading } = useRestThanks(
    gameId,
    user?.id,
    player.id
  )
  const restThanks = data?.thanks || []
  const haveThanks = restThanks.length > 0
  const isMain = player.status === 'main'
  const isReserve = player.status === 'reserve'
  const isMe = player.id == user.id
  const myRespect = player.thanks.find(
    ({ from_user_id }) => from_user_id == user.id
  )
  const hasMyRespect = myRespect || false
  const isGuest = player.tg_id < 0
  const canSendRespect =
    haveThanks &&
    isPastGame &&
    isThankTime &&
    !isMe &&
    isMain &&
    !hasMyRespect &&
    !isGuest &&
    isJoined
  const canSwapPlayers = !isPastGame && isAdmin

  return (
    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-2 rounded-2xl">
      <UserAvatarModal
        variant="small"
        url={IS_WEB ? `avatars/${player.avatar_url}` : player.tg_avatar_url}
        tgUserId={player.tg_id}
      />

      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <span className="text-black dark:text-white truncate text-sm">
          {player.fio}
        </span>

        <span className="text-xs text-gray-400 leading-none mt-0.5">
          {dateTimeFormatGameCard(new Date(safariDateFix(player.login_date)))}
        </span>

        <AdminBadge
          player={player}
          className="self-start mt-1"
        />

        <RespectBadge respect={myRespect} />
      </div>

      {canSwapPlayers && (
        <div className="flex flex-col gap-2 shrink-0">
          {isReserve && canPromote && (
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
      )}

      {canSendRespect && (
        <ModalButton
          className="h-7 text-xs pl-2 pr-3 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500"
          Icon={Star}
          modalHeader="Респект"
          ModalContent={({ onCancel }) => (
            <ThanksModal
              onCancel={onCancel}
              toUserId={player.id}
              toFio={player.fio}
              gameId={gameId}
              onSubmit={onRespect}
            />
          )}
        />
      )}
    </div>
  )
}
