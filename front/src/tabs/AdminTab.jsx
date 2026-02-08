import { useState } from 'react'
import { Button } from '@/ui/Button'
import { UsersListModal } from '@/ui/UsersListModal'

export const AdminTab = () => {
  const [isUsersListModalOpen, setIsUsersListModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-dvh items-center justify-center w-full p-4 relative">
      <Button
        className="w-full"
        onClick={() => setIsUsersListModalOpen(true)}
      >
        Игроки
      </Button>

      {isUsersListModalOpen && (
        <UsersListModal onClose={() => setIsUsersListModalOpen(false)} />
      )}
    </div>
  )
}
