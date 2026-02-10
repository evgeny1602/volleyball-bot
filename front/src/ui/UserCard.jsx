import { UserAvatar } from '@/ui/UserAvatar'
import { useUser } from '@/hooks/useUser'
import { cn } from '@/utils/cn'
import { DeleteButton } from '@/ui/buttons/DeleteButton'
import { RejectButton } from '@/ui/buttons/RejectButton'
import { ApproveButton } from '@/ui/buttons/ApproveButton'

const formatDate = (dateString) => {
  if (!dateString) return ''
  return dateString.replace(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}).*$/,
    '$3.$2.$1 $4'
  )
}

export const UserCard = ({ user, onUserChange, className }) => {
  const { rejectUser, approveUser, deleteUser, userIsLoading } = useUser()

  const handleAction = async (actionFn) => {
    const res = await actionFn(user.tg_id)
    if (res?.success && onUserChange) {
      onUserChange()
    }
  }

  const isPlayer = user.role === 'player'

  const BUTTONS = [
    {
      Component: ApproveButton,
      label: 'Одобрить',
      show: user.status === 'registered',
      onClick: () => handleAction(approveUser),
    },
    {
      Component: RejectButton,
      label: 'Отклонить',
      show: user.status === 'registered',
      confirmText: 'Вы уверены, что хотите отклонить заявку?',
      onClick: () => handleAction(rejectUser),
    },
    {
      Component: DeleteButton,
      label: 'Удалить',
      show: ['rejected', 'approved'].includes(user.status),
      confirmText: 'Вы уверены, что хотите удалить пользователя?',
      onClick: () => handleAction(deleteUser),
    },
  ]

  return (
    <div
      className={cn('text-bot-grey-800 flex flex-col gap-4 w-full', className)}
    >
      <div className="flex flex-row items-center gap-2">
        <UserAvatar url={user.tg_avatar_url} />
        <div>
          <p className="font-medium">
            {user.tg_username || `ID: ${user.tg_id}`}
          </p>
          <p className="text-sm text-bot-grey-500">
            {formatDate(user.created_at)}
          </p>
        </div>
      </div>

      {isPlayer && (
        <div className="flex flex-row gap-2">
          {BUTTONS.filter((btn) => btn.show).map(
            ({ Component, label, show, ...props }, idx) => (
              <Component
                key={idx}
                disabled={userIsLoading}
                {...props}
              >
                {label}
              </Component>
            )
          )}
        </div>
      )}
    </div>
  )
}
