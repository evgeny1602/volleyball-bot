import { UserProfile } from '@/ui/UserProfile'
import { tgGetUser } from '@/utils/tools'

export const ProfileTab = () => {
  return (
    <UserProfile
      className="scrollable-content overflow-y-auto mb-20"
      tgUserId={tgGetUser().id}
      displayExitBtn={true}
      isChangable={true}
    />
  )
}
