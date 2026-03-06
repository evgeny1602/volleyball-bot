import { UserProfile } from '@/ui/UserProfile'
import { cn } from '@/utils/cn'
import { tgGetUser } from '@/utils/telegram'

export const ProfileTab = () => {
  return (
    <div
      className={cn(
        'scrollable-content overflow-y-auto',
        'w-full',
        'px-4 pt-8 pb-30',
        'flex flex-col items-center gap-14',
        'text-lg text-gray-600 dark:text-white'
      )}
    >
      <UserProfile tgUserId={tgGetUser().id} />
    </div>
  )
}
