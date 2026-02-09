import { useState } from 'react'
import { Button } from '@/ui/Button'
import { Modal } from '@/ui/Modal'

export const ModalButton = ({
  children,
  className,
  modalHeader,
  ModalContent,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </Button>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          headerText={modalHeader}
        >
          <ModalContent />
        </Modal>
      )}
    </>
  )
}
