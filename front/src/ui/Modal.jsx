import { ModalOverlay } from '@/ui/ModalOverlay'
import { ModalWrapper } from '@/ui/ModalWrapper'
import { ModalHeader } from '@/ui/ModalHeader'

export const Modal = ({ onClose, children, headerText, Icon }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader onClose={onClose}>
          <div className="flex flex-row items-center gap-2 justify-start">
            <Icon />
            {headerText}
          </div>
        </ModalHeader>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  )
}
