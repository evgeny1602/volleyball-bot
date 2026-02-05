import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'
import { twMerge } from 'tailwind-merge'

export const Button = ({
  variant = 'primary',
  onClick,
  children,
  className,
}) => {
  const baseClasses = twMerge(
    'text-white px-4 py-2 rounded-3xl font-medium hover:cursor-pointer active:scale-95 transition-transform',
    className
  )

  const variantClasses = {
    'bg-bot-primary': variant === 'primary',
    'bg-bot-secondary': variant === 'secondary',
    'bg-bot-success': variant === 'success',
    'bg-bot-danger': variant === 'danger',
  }

  return (
    <button
      className={cn(baseClasses, variantClasses)}
      onClick={() => {
        tgVibro('medium')

        onClick()
      }}
    >
      {children}
    </button>
  )
}
