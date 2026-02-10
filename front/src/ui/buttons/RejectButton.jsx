import { Button } from '@/ui/Button'
import { UserX } from 'lucide-react'
import { tgConfirm } from '@/utils/telegram'

const UserXIcon = () => {
  return <UserX className="w-4 h-4" />
}

export const RejectButton = ({ onClick, children, disabled, confirmText }) => {
  const handleClick = async () => {
    const isConfirmed = await tgConfirm(confirmText)
    if (isConfirmed && onClick) onClick
  }

  return (
    <Button
      className="w-full"
      variant="danger"
      onClick={handleClick}
      disabled={disabled}
    >
      <UserXIcon />
      {children}
    </Button>
  )
}
