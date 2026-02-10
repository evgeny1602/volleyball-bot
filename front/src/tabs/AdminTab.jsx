import { ModalButton } from '@/ui/ModalButton'
import { UsersList } from '@/ui/UsersList'
import { NewGameForm } from '@/ui/NewGameForm'
import { Users, Volleyball } from 'lucide-react'

const ADMIN_ACTIONS = [
  {
    id: 'create-game',
    label: 'Создать игру',
    Icon: Volleyball,
    Content: NewGameForm,
  },
  {
    id: 'users-list',
    label: 'Игроки',
    Icon: Users,
    Content: () => <UsersList statuses={['registered', 'approved']} />,
  },
]

export const AdminTab = () => {
  return (
    <div className="flex flex-col h-dvh items-center justify-center w-full p-8 gap-4 overflow-hidden">
      {ADMIN_ACTIONS.map(({ id, label, Icon, Content }) => (
        <ModalButton
          key={id}
          className="w-full"
          modalHeader={label}
          ModalContent={Content}
          Icon={Icon}
        />
      ))}
    </div>
  )
}
