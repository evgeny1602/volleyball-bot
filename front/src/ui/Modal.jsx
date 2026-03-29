import { ModalOverlay } from '@/ui/ModalOverlay'
import { ModalHeader } from '@/ui/ModalHeader'
import { cn } from '@/utils/cn'

export const Modal = ({ onClose, children, headerText, Icon }) => {
  return (
    <ModalOverlay>
      <div
        className={cn(
          'w-full p-4 flex flex-col bg-white dark:bg-gray-800 rounded-3xl',
          'border border-gray-300 dark:border-gray-900 shadow-sm',
          'dark:shadow-sm-dark max-h-[95dvh]'
        )}
      >
        <ModalHeader onClose={onClose}>
          <div className="flex flex-row items-start gap-2 justify-start">
            {Icon && <Icon className="w-4 h-4 text-current shrink-0 mt-0.5" />}
            <div className="leading-tight">{headerText}</div>
          </div>
        </ModalHeader>

        <div
          className={cn(
            'scrollable-content max-h-[90vh] overflow-y-auto no-scrollbar pt-4'
          )}
        >
          {children}
        </div>
      </div>
    </ModalOverlay>
  )
}
