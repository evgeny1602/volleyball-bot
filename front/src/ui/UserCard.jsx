import { UserAvatar } from '@/ui/UserAvatar'
import { Button } from '@/ui/Button'
import { useUser } from '@/hooks/useUser'
import { tgConfirm } from '@/utils/telegram'
import { cn } from '@/utils/cn'
import { CircleMinus, Check, UserX } from 'lucide-react'

const CircleMinusIcon = () => {
  return <CircleMinus className="w-4 h-4" />
}

const CheckIcon = () => {
  return <Check className="w-4 h-4" />
}

const UserXIcon = () => {
  return <UserX className="w-4 h-4" />
}

export const UserCard = ({ user, onUserChange, className }) => {
  const { rejectUser, approveUser, deleteUser, userIsLoading } = useUser()

  const handleApproveUser = async () => {
    const res = await approveUser(user.tg_id)
    if (res?.success && onUserChange) onUserChange()
  }

  const handleRejectUser = async () => {
    const isConfirmed = await tgConfirm(
      'Вы уверены, что хотите отклонить заявку пользователя?'
    )
    if (!isConfirmed) return
    const res = await rejectUser(user.tg_id)
    if (res?.success && onUserChange) onUserChange()
  }

  const handleDeleteUser = async () => {
    const isConfirmed = await tgConfirm(
      'Вы уверены, что хотите удалить пользователя?'
    )
    if (!isConfirmed) return
    const res = await deleteUser(user.tg_id)
    if (res?.success && onUserChange) onUserChange()
  }

  return (
    <div
      className={cn(className, 'text-bot-grey-800 flex flex-col gap-4 w-full')}
    >
      <div className="flex flex-row items-center gap-2">
        <UserAvatar url={user.tg_avatar_url} />

        <div>
          <p>{user.tg_username || 'ID: ' + user.tg_id}</p>
          <p className="text-sm text-bot-grey-500">
            {user.created_at.replace(
              /^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}):\d{2}$/,
              '$3.$2.$1 $4'
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        {user.role === 'player' && user.status === 'registered' && (
          <>
            <Button
              variant="success"
              className="w-full"
              onClick={handleApproveUser}
              disabled={userIsLoading}
            >
              <CheckIcon />
              Одобрить
            </Button>
            <Button
              className="w-full"
              variant="danger"
              onClick={handleRejectUser}
              disabled={userIsLoading}
            >
              <UserXIcon />
              Отклонить
            </Button>
          </>
        )}

        {user.role === 'player' &&
          ['rejected', 'approved'].includes(user.status) && (
            <Button
              className="w-full"
              variant="danger"
              onClick={handleDeleteUser}
              disabled={userIsLoading}
            >
              <CircleMinusIcon />
              Удалить
            </Button>
          )}
      </div>
    </div>
  )
}
