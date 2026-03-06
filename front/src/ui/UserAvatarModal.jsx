import { useState } from 'react'
import { Modal } from '@/ui/Modal'
import { UserAvatar } from '@/ui/UserAvatar'
import { UserProfile } from '@/ui/UserProfile'
import { User } from 'lucide-react'

export const UserAvatarModal = ({
  url,
  variant = 'default',
  className,
  tgUserId,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isGuest = tgUserId < 0

  return (
    <>
      <UserAvatar
        onClick={() => setIsOpen(true)}
        url={url}
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
