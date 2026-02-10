import { tgVibro } from '@/utils/telegram'
import { cn } from '@/utils/cn'

export const StepButton = ({ children, onClick, className }) => {
  const handleClick = () => {
    tgVibro('medium')
    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'h-8 w-8 shrink-0 flex items-center justify-center',
        'bg-bot-primary text-white rounded-full',
        'font-semibold font-mono hover:cursor-pointer active:scale-90 transition-all',
        className
      )}
    >
      {children}
    </button>
  )
}
