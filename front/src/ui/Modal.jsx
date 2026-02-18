import { ModalOverlay } from '@/ui/ModalOverlay'
import { ModalWrapper } from '@/ui/ModalWrapper'
import { ModalHeader } from '@/ui/ModalHeader'

export const Modal = ({ onClose, children, headerText, Icon }) => {
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader onClose={onClose}>
          <div className="flex flex-row items-start gap-2 justify-start">
            {Icon && <Icon className="w-4 h-4 text-current shrink-0 mt-0.5" />}
            <div className="leading-tight">{headerText}</div>
          </div>
        </ModalHeader>

        <div className="scrollable-content max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:display-none pt-4">
          {children}
        </div>
      </ModalWrapper>
    </ModalOverlay>
  )
}
