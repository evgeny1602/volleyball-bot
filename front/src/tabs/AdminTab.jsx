import { ModalButton } from '@/ui/ModalButton'
import { NewsList } from '@/ui/NewsList'
import { TemplatesList } from '@/ui/TemplatesList'
import { BaseForm } from '@/ui/BaseForm'
import { Users, Volleyball, ClipboardList, Megaphone } from 'lucide-react'
import { AdminTabContainer } from '@/ui/AdminTabContainer'
import { useGameActions } from '@/hooks/games'
import { gameSchema } from '@/utils/validations'
import { gameForm } from '@/utils/forms'
import { UsersList } from '@/ui/UsersList'

export const AdminTab = () => {
  const { createGame } = useGameActions()

  const ADMIN_ACTIONS = [
    {
      label: 'Создать игру',
      Icon: Volleyball,
      ModalContent: ({ onCancel }) => (
        <BaseForm
          formConfig={gameForm}
          schema={gameSchema}
          onCancel={onCancel}
          onSubmit={async (formData) => {
            await createGame(formData)
            onCancel?.()
          }}
        />
      ),
    },
    {
      label: 'Шаблоны игр',
      Icon: ClipboardList,
      ModalContent: () => <TemplatesList />,
    },
    {
      label: 'Игроки',
      Icon: Users,
      ModalContent: () => <UsersList statuses={['registered', 'approved']} />,
    },
    {
      label: 'Новости',
      Icon: Megaphone,
      ModalContent: () => <NewsList />,
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
