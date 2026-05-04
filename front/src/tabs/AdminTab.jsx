import { ModalButton } from '@/ui/ModalButton'
import { NewsList } from '@/ui/NewsList'
import { TemplatesList } from '@/ui/TemplatesList'
import { BaseForm } from '@/ui/BaseForm'
import { Users, Volleyball, ClipboardList, Megaphone, Star } from 'lucide-react'
import { useGameActions } from '@/hooks/games'
import { gameSchema } from '@/utils/validations'
import { gameForm } from '@/utils/forms'
import { UsersListFiltered } from '@/ui/UsersListFiltered'
import { RespectsList } from '@/ui/RespectsList'
import { cn } from '@/utils/cn'
import { Button } from '@/ui/Button'
import { usersApi } from '@/api/users'

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
      ModalContent: () => (
        <UsersListFiltered statuses={['registered', 'approved']} />
      ),
      fullHeight: true,
    },
    {
      label: 'Новости',
      Icon: Megaphone,
      ModalContent: () => <NewsList />,
    },
    {
      label: 'Респекты',
      Icon: Star,
      ModalContent: () => <RespectsList />,
    },
  ]

  return (
    <div
      className={cn(
        'w-full flex flex-col items-center justify-center gap-4',
        'h-dvh',
        'p-8',
        'overflow-hidden'
      )}
    >
      {ADMIN_ACTIONS.map(({ label, Icon, ModalContent, fullHeight }) => (
        <ModalButton
          className="w-full"
          key={label}
          modalHeader={label}
          Icon={Icon}
          ModalContent={ModalContent}
          fullHeight={fullHeight ?? false}
        />
      ))}

      {/* <Button
        onClick={async () => {
          await usersApi.generatePasswords()
        }}
      >
        Создать пароли
      </Button> */}
    </div>
  )
}
