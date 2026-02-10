import { Button } from '@/ui/Button'
import { SendHorizontal } from 'lucide-react'

export const RegisterButton = ({ children, ...props }) => {
  return (
    <Button
      className="w-full"
      variant="success"
      {...props}
    >
      <SendHorizontal className="w-4 h-4" />
      {children}
    </Button>
  )
}
