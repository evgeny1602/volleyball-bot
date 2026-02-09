import { ModalOverlay } from '@/ui/ModalOverlay'
import { ModalWrapper } from '@/ui/ModalWrapper'
import { ModalHeader } from '@/ui/ModalHeader'

export const Modal = ({ onClose, children, headerText }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader onClose={onClose}>{headerText}</ModalHeader>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  )
}
