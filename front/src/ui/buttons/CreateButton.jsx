import { Button } from '@/ui/Button'
import { Volleyball } from 'lucide-react'

export const CreateButton = ({ children, ...props }) => {
  return (
    <Button
      className="w-full"
      variant="success"
      {...props}
    >
      <Volleyball className="w-4 h-4" />
      {children}
    </Button>
  )
}
