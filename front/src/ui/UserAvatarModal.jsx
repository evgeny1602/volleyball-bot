import { useState } from 'react'
import { Modal } from '@/ui/Modal'
import { UserAvatar } from '@/ui/UserAvatar'
import { UserProfile } from '@/ui/UserProfile'
import { User } from 'lucide-react'

export const UserAvatarModal = ({ user, variant = 'default', className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const isGuest = user.tg_username == 'Guest'
  const tgUserId = user.tg_id

  return (
    <>
      <UserAvatar
        onClick={() => setIsOpen(true)}
        user={user}
        variant={variant}
        className={className}
      />

      {!isGuest && isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          headerText="Профиль игрока"
          Icon={User}
        >
          <UserProfile
            tgUserId={tgUserId}
            variant="short"
          />
        </Modal>
      )}
    </>
  )
}
