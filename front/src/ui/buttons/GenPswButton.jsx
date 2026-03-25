import { Button } from '@/ui/Button'
import { KeyRound } from 'lucide-react'

export const GenPswButton = ({ children, ...props }) => {
  return (
    <Button
      className="w-full"
      variant="primary"
      {...props}
    >
      <KeyRound className="w-4 h-4" />
      {children}
    </Button>
  )
}
