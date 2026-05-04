import { Button } from '@/ui/Button'
import { CircleMinus } from 'lucide-react'
import { appConfirm } from '@/utils/tools'

export const DeleteButton = ({ onClick, children, confirmText, ...props }) => {
  const handleClick = async () => {
    const isConfirmed = await appConfirm(confirmText)
    if (isConfirmed) onClick?.()
  }

  return (
    <Button
      className="w-full"
      variant="danger"
      onClick={handleClick}
      {...props}
    >
      <CircleMinus className="w-4 h-4" />
      {children}
    </Button>
  )
}
