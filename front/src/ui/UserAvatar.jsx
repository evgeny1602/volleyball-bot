import { cn } from '@/utils/cn'
import { CircleUser } from 'lucide-react'

const getUserAvatarUrl = (user) => {
  if (user.avatar_url != '') {
    return `avatars/${user.avatar_url}`
  }

  return user.tg_avatar_url
}

const SIZES = {
  default: 'w-16 h-16',
  small: 'w-10 h-10',
  big: 'w-34 h-34',
}

export const UserAvatar = ({
  user,
  variant = 'default',
  className,
  onClick,
}) => {
  const sizeClass = SIZES[variant] || SIZES.default
  const isGuest = user.tg_username == 'Guest'
  const url = getUserAvatarUrl(user)

  return (
    <>
      {isGuest && (
        <div
          onClick={onClick}
          className={cn(
            'bg-gray-200 dark:bg-gray-600 rounded-full flex',
            'items-center justify-center shrink-0',
            sizeClass,
            className
          )}
        >
          <CircleUser className="text-gray-400 w-2/3 h-2/3" />
        </div>
      )}

      {!isGuest && (
        <img
          onClick={onClick}
          src={url}
          className={cn(
            'rounded-full object-cover shrink-0',
            sizeClass,
            className
          )}
        />
      )}
    </>
  )
}
