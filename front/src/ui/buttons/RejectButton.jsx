import { Button } from '@/ui/Button'
import { UserX } from 'lucide-react'
import { appConfirm } from '@/utils/tools'

export const RejectButton = ({ onClick, children, confirmText, ...props }) => {
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
      <UserX className="w-4 h-4" />
      {children}
    </Button>
  )
}
