import { cn } from '@/utils/cn'

export const AdminBadge = ({ className }) => {
  return (
    <span
      className={cn(
        'text-xs border rounded-full px-2 border-bot-primary font-medium',
        'inline-flex text-bot-primary leading-normal',
        className
      )}
    >
      Админ
    </span>
  )
}
