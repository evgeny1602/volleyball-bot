import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-bot-primary',
  secondary: 'bg-bot-secondary',
  success: 'bg-bot-success',
  danger: 'bg-bot-danger',
}

export const Button = ({
  variant = 'primary',
  onClick,
  children,
  className,
  disabled,
  isLoading,
  ...props
}) => {
  const isInactive = disabled || isLoading

  const handleClick = (e) => {
    if (isInactive) return
    tgVibro('medium')
    onClick?.(e)
  }

  return (
    <button
      {...props}
      disabled={isInactive}
      className={cn(
        'text-white px-4 py-2 rounded-full font-medium transition-all duration-200',
        'flex flex-row gap-2 items-center justify-center relative overflow-hidden min-h-[40px]',
        !isInactive &&
          'active:scale-95 hover:brightness-110 hover:cursor-pointer',
        isInactive && 'opacity-60 pointer-events-none select-none',
        VARIANTS[variant],
        className
      )}
      onClick={handleClick}
    >
      <span
        className={cn(
          'flex items-center gap-2 transition-opacity duration-200',
          isLoading ? 'opacity-70' : 'opacity-100'
        )}
      >
        {children}
      </span>
    </button>
  )
}
