import { UserAvatar } from '@/ui/UserAvatar'
import { cn } from '@/utils/cn'
import { GenPswButton } from '@/ui/buttons/GenPswButton'
import { CopyPswButton } from '@/ui/buttons/CopyPswButton'
import { DeleteButton } from '@/ui/buttons/DeleteButton'
import { RejectButton } from '@/ui/buttons/RejectButton'
import { ApproveButton } from '@/ui/buttons/ApproveButton'
import { useUserMutations } from '@/hooks/users'
import { Loader } from '@/ui/Loader'
import { TelegramIcon } from '@/icons/TelegramIcon'
import { CalendarDays, Phone, Cake, KeyRound } from 'lucide-react'
import { formatPhone } from '@/utils/formatters'
import { AdminBadge } from '@/ui/AdminBadge'
import { tgAlert } from '@/utils/telegram'

const formatDate = (dateString) => {
  if (!dateString) return ''
  return dateString.replace(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}).*$/,
    '$3.$2.$1 $4'
  )
}

const UserCardContainer = ({ children, className }) => (
  <div
    className={cn(
      'text-gray-600 dark:text-gray-200 flex flex-col gap-4 w-full',
      className
    )}
  >
    {children}
  </div>
)

export const UserCard = ({ user, className }) => {
  const { approveUser, deleteUser, rejectUser, generatePassword, isPending } =
    useUserMutations()

  const copyPassword = (psw) => {
    navigator.clipboard.writeText(psw)
    tgAlert('Пароль скопирован')
  }

  const FOR_PLAYERS_ONLY_BUTTONS = [
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

  const FOR_ALL_BUTTONS = [
    {
      Component: GenPswButton,
      label: 'Сгенерировать пароль',
      show: user.status === 'approved',
      onClick: () => generatePassword(user.tg_id),
    },
    {
      Component: CopyPswButton,
      label: 'Скопировать пароль',
      show: user.status === 'approved',
      onClick: () => copyPassword(user.psw),
    },
  ]

  const BUTTONS =
    user.role == 'admin'
      ? FOR_ALL_BUTTONS
      : [...FOR_PLAYERS_ONLY_BUTTONS, ...FOR_ALL_BUTTONS]

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

        <div className="w-full flex flex-col gap-1">
          <div
            className={cn(
              'font-medium flex justify-start gap-2 flex-wrap items-center'
            )}
          >
            <span>{user.fio}</span>

            {user.role == 'admin' && <AdminBadge className="self-center" />}
          </div>

          <div
            className={cn(
              'text-xs text-gray-400 flex flex-wrap gap-2',
              'justify-between w-full'
            )}
          >
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <TelegramIcon
                  className="mt-0.5"
                  size={14}
                />
                {user.tg_username || `ID: ${user.tg_id}`}
              </span>

              <span className="text-xs text-gray-400 flex items-center gap-1">
                <CalendarDays size={14} />
                {formatDate(user.created_at)}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 flex gap-1">
                <Phone size={14} />
                {formatPhone(user.phone)}
              </span>

              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Cake size={14} />
                {formatDate(user.birthday)}
              </span>

              <span className="text-xs text-gray-400 flex gap-1">
                <KeyRound size={14} />
                {user.psw}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
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
    </UserCardContainer>
  )
}
