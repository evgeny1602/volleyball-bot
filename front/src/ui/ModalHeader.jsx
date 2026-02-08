import { CloseButton } from '@/ui/CloseButton'

export const ModalHeader = ({ children, onClose }) => {
  return (
    <div className="border-b border-dashed border-bot-grey-500 flex flex-row items-center justify-between pb-2">
      <div className="text-black font-bold text-lg">{children}</div>
      <CloseButton onClick={onClose} />
    </div>
  )
}
