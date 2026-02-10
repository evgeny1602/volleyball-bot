import { Button } from '@/ui/Button'
import { CircleMinus } from 'lucide-react'
import { tgConfirm } from '@/utils/telegram'

const CircleMinusIcon = () => {
  return <CircleMinus className="w-4 h-4" />
}

export const DeleteButton = ({ onClick, children, disabled, confirmText }) => {
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
      <CircleMinusIcon />
      {children}
    </Button>
  )
}
