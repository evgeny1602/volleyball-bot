import { Button } from '@/ui/Button'
import { Check } from 'lucide-react'

const CheckIcon = () => {
  return <Check className="w-4 h-4" />
}

export const ApproveButton = ({ onClick, children, disabled, confirmText }) => {
  return (
    <Button
      className="w-full"
      variant="success"
      onClick={onClick}
      disabled={disabled}
    >
      <CheckIcon />
      {children}
    </Button>
  )
}
