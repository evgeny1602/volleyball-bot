import { UserProfile } from '@/ui/UserProfile'
import { tgGetUser } from '@/utils/telegram'

export const ProfileTab = () => {
  return (
    <UserProfile
      className="scrollable-content overflow-y-auto mb-20"
      tgUserId={tgGetUser().id}
    />
  )
}
