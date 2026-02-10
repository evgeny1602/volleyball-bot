import { X } from 'lucide-react'
import { tgVibro } from '@/utils/telegram'
import { twMerge } from 'tailwind-merge'

export const CloseIcon = ({ onClick, className }) => {
  return (
    <div
      className={twMerge(
        'text-white bg-bot-primary rounded-[50%] p-1 cursor-pointer active:scale-80 transition-transform flex items-center justify-center',
        className
      )}
    >
      <X
        onClick={() => {
          tgVibro('medium')

          onClick?.()
        }}
        size={16}
        color="currentColor"
        strokeWidth={2}
      />
    </div>
  )
}
