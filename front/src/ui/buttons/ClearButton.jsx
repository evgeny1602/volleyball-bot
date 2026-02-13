import { Button } from '@/ui/Button'
import { Trash2 } from 'lucide-react'

export const ClearButton = ({ onClick }) => {
  return (
    <Button
      variant="danger"
      onClick={onClick}
      className="w-full"
    >
      <Trash2 className="w-4 h-4" /> Очистить
    </Button>
  )
}
