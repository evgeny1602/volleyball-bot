import { Button } from '@/ui/Button'
import { UserX } from 'lucide-react'
import { tgConfirm } from '@/utils/telegram'

export const RejectButton = ({ onClick, children, confirmText, ...props }) => {
  const handleClick = async () => {
    const isConfirmed = await tgConfirm(confirmText)
    if (isConfirmed && onClick) onClick
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
