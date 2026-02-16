import { Button } from '@/ui/Button'
import { FilePenLine } from 'lucide-react'

export const EditButton = ({ children, ...props }) => {
  return (
    <Button
      className="w-full"
      variant="secondary"
      {...props}
    >
      <FilePenLine className="w-4 h-4" />
      {children}
    </Button>
  )
}
