import { useState } from 'react'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'

export const ModalButton = ({
  className,
  modalHeader,
  ModalContent,
  Icon,
  variant = 'primary',
  fullHeight = false,
  modalProps,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        onClick={() => setIsOpen(true)}
        variant={variant}
      >
        <Icon className="w-4 h-4 text-current" />
        {modalHeader}
      </Button>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          headerText={modalHeader}
          Icon={Icon}
          fullHeight={fullHeight}
        >
          <ModalContent
            onCancel={() => setIsOpen(false)}
            {...modalProps}
          />
        </Modal>
      )}
    </>
  )
}
