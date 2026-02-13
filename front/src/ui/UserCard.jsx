import { UserAvatar } from '@/ui/UserAvatar'
import { cn } from '@/utils/cn'
import { DeleteButton } from '@/ui/buttons/DeleteButton'
import { RejectButton } from '@/ui/buttons/RejectButton'
import { ApproveButton } from '@/ui/buttons/ApproveButton'
import { useUserMutations } from '@/hooks/users'
import { Loader } from '@/ui/Loader'

const formatDate = (dateString) => {
  if (!dateString) return ''
  return dateString.replace(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}).*$/,
    '$3.$2.$1 $4'
  )
}

const UserCardContainer = ({ children, className }) => (
  <div
    className={cn('text-bot-grey-800 flex flex-col gap-4 w-full', className)}
  >
    {children}
  </div>
)

export const UserCard = ({ user, className }) => {
  const { approveUser, deleteUser, rejectUser, isPending } = useUserMutations()

  const BUTTONS = [
    {
      Component: ApproveButton,
      label: 'Одобрить',
      show: user.status === 'registered',
      onClick: () => approveUser(user.tg_id),
    },
    {
      Component: RejectButton,
      label: 'Отклонить',
      show: user.status === 'registered',
      confirmText: 'Вы уверены, что хотите отклонить заявку?',
      onClick: async () => await rejectUser(user.tg_id),
    },
    {
      Component: DeleteButton,
      label: 'Удалить',
      show: ['rejected', 'approved'].includes(user.status),
      confirmText: 'Вы уверены, что хотите удалить игрока?',
      onClick: () => deleteUser(user.tg_id),
    },
  ]

  if (isPending) {
    return (
      <UserCardContainer className={className}>
        <Loader variant="small" />
      </UserCardContainer>
    )
  }

  return (
    <UserCardContainer className={className}>
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

      {user.role === 'player' && (
        <div className="flex flex-row gap-2">
          {BUTTONS.filter((btn) => btn.show).map(
            ({ Component, label, ...props }, idx) => (
              <Component
                key={idx}
                {...props}
              >
                {label}
              </Component>
            )
          )}
        </div>
      )}
    </UserCardContainer>
  )
}
