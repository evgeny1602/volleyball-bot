import { ModalButton } from '@/ui/ModalButton'
import { UsersList } from '@/ui/UsersList'
import { Users } from 'lucide-react'

export const AdminTab = () => {
  return (
    <div className="flex flex-col h-dvh items-center justify-center w-full p-4 relative">
      <ModalButton
        className="w-full"
        modalHeader="Игроки"
        ModalContent={() => <UsersList statuses={['registered', 'approved']} />}
        Icon={() => <Users className="w-4 h-4" />}
      />
    </div>
  )
}
