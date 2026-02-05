import { X } from 'lucide-react'
import { tgVibro } from '@/utils/telegram'
import { twMerge } from 'tailwind-merge'

export const CloseIcon = ({ onClick, className }) => {
  const baseClasses =
    'text-white bg-bot-primary rounded-[50%] p-1 cursor-pointer active:scale-95 transition-transform'
  return (
    <div className={twMerge(baseClasses, className)}>
      <X
        onClick={() => {
          tgVibro('medium')

          onClick()
        }}
        size={16}
        color="currentColor"
        strokeWidth={2}
      />
    </div>
  )
}
