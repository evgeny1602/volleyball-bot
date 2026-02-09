import { ModalButton } from '@/ui/ModalButton'
import { adminMenuItems } from '@/config/adminMenuItems'

export const AdminTab = () => {
  return (
    <div className="flex flex-col h-dvh items-center justify-center w-full p-4 relative">
      {adminMenuItems.map(({ headerText, ContentComponent }) => (
        <ModalButton
          key={headerText}
          className="w-full"
          modalHeader={headerText}
          ModalContent={ContentComponent}
        >
          {headerText}
        </ModalButton>
      ))}
    </div>
  )
}
