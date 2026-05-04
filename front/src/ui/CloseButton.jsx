import { vibro } from '@/utils/tools'
import { CircleX } from 'lucide-react'
import { cn } from '@/utils/cn'

export const CloseButton = ({ onClick }) => {
  return (
    <CircleX
      className={cn(
        'text-bot-primary  w-5 cursor-pointer',
        ' active:scale-80 transition-all shrink-0',
        'hover:opacity-80 duration-200'
      )}
      onClick={() => {
        vibro('medium')
        if (onClick) onClick()
      }}
    />
  )
}
