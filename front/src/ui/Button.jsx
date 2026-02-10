import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'
import { twMerge } from 'tailwind-merge'

export const Button = ({
  variant = 'primary',
  onClick,
  children,
  className,
}) => {
  const variantClasses = {
    'bg-bot-primary': variant === 'primary',
    'bg-bot-secondary': variant === 'secondary',
    'bg-bot-success': variant === 'success',
    'bg-bot-danger': variant === 'danger',
  }

  return (
    <button
      className={cn(
        'text-white px-4 py-2 rounded-full font-medium hover:cursor-pointer active:scale-95 transition-transform flex flex-row gap-1 items-center justify-center',
        className,
        variantClasses
      )}
      onClick={() => {
        tgVibro('medium')

        onClick()
      }}
    >
      {children}
    </button>
  )
}
