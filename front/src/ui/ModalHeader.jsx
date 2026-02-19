import { CloseButton } from '@/ui/CloseButton'

export const ModalHeader = ({ children, onClose }) => {
  return (
    <div className="border-b border-dashed border-gray-400 flex flex-row items-start justify-between pb-2">
      <div className="text-black font-bold text-lg">{children}</div>
      <CloseButton onClick={onClose} />
    </div>
  )
}
