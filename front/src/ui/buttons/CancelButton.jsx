import { Button } from '@/ui/Button'
import { CircleX } from 'lucide-react'

export const CancelButton = ({ onClick }) => {
  return (
    <Button
      variant="danger"
      onClick={onClick}
      className="w-full"
    >
      <CircleX className="w-4 h-4" /> Отмена
    </Button>
  )
}
