import { ModalOverlay } from '@/ui/ModalOverlay'
import { ModalWrapper } from '@/ui/ModalWrapper'
import { ModalHeader } from '@/ui/ModalHeader'
import { UsersList } from '@/ui/UsersList'

export const UsersListModal = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader onClose={onClose}>Игроки</ModalHeader>
        <UsersList />
      </ModalWrapper>
    </ModalOverlay>
  )
}
