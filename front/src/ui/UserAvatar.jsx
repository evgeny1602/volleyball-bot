import { cn } from '@/utils/cn'
import { CircleUser } from 'lucide-react'

const SIZES = {
  default: 'w-16 h-16',
  small: 'w-10 h-10',
}

export const UserAvatar = ({ url, variant = 'default', className }) => {
  const sizeClass = SIZES[variant] || SIZES.default

  if (!url) {
    return (
      <div
        className={cn(
          'bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center shrink-0',
          sizeClass,
          className
        )}
      >
        <CircleUser className="text-gray-400 w-2/3 h-2/3" />
      </div>
    )
  }

  return (
    <img
      src={url}
      className={cn('rounded-full object-cover shrink-0', sizeClass, className)}
    />
  )
}
