import { ModalButton } from '@/ui/ModalButton'
import { UsersList } from '@/ui/UsersList'
import { GameForm } from '@/ui/GameForm'
import { Users, Volleyball } from 'lucide-react'
import { AdminTabContainer } from '@/ui/AdminTabContainer'
import { useGame } from '@/hooks/useGame'

const NEW_GAME_DATA = {
  name: '',
  location: '',
  address: '',
  date: '',
  time: '',
  duration: '',
  description: '',
  price: '',
  maxPlayers: '',
}

export const AdminTab = () => {
  const { createGame } = useGame()

  const ADMIN_ACTIONS = [
    {
      label: 'Создать игру',
      Icon: Volleyball,
      ModalContent: ({ onCancel }) => (
        <GameForm
          initialState={NEW_GAME_DATA}
          onSubmit={createGame}
          onCancel={onCancel}
        />
      ),
    },
    {
      label: 'Игроки',
      Icon: Users,
      ModalContent: () => <UsersList statuses={['registered', 'approved']} />,
    },
  ]

  return (
    <AdminTabContainer>
      {ADMIN_ACTIONS.map(({ label, Icon, ModalContent }) => (
        <ModalButton
          className="w-full"
          key={label}
          modalHeader={label}
          Icon={Icon}
          ModalContent={ModalContent}
        />
      ))}
    </AdminTabContainer>
  )
}
