import { tgVibro } from '@/utils/telegram'
import { CircleX } from 'lucide-react'

export const CloseButton = ({ onClick }) => {
  return (
    <CircleX
      className="text-bot-primary  w-5 cursor-pointer active:scale-80 transition-transform shrink-0"
      onClick={() => {
        tgVibro('medium')
        if (onClick) onClick()
      }}
    />
  )
}
