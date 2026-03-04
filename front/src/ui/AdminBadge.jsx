import { cn } from '@/utils/cn'

const ADMINS_EXCLUDE_TG_IDS = [450980607]

export const AdminBadge = ({ player, className }) => {
  if (player.role != 'admin' || ADMINS_EXCLUDE_TG_IDS.includes(player.tg_id)) {
    return null
  }

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
