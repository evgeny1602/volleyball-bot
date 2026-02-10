import { ModalButton } from '@/ui/ModalButton'
import { UsersList } from '@/ui/UsersList'
import { Users } from 'lucide-react'

const UsersIcon = () => {
  return <Users className="w-4 h-4" />
}

export const AdminTab = () => {
  return (
    <div className="flex flex-col h-dvh items-center justify-center w-full p-4 relative">
      <ModalButton
        className="w-full"
        modalHeader="Игроки"
        ModalContent={UsersList}
        Icon={UsersIcon}
      />
    </div>
  )
}
