import { Button } from '@/ui/Button'
import { Copy } from 'lucide-react'

export const CopyPswButton = ({ children, ...props }) => {
  return (
    <Button
      className="w-full"
      variant="primary"
      {...props}
    >
      <Copy className="w-4 h-4" />
      {children}
    </Button>
  )
}
