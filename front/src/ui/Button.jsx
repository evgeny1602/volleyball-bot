import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'

export const Button = ({ variant = 'primary', onClick, children }) => {
  const baseClasses =
    'text-white px-4 py-2 rounded-3xl font-medium w-full hover:cursor-pointer active:scale-95 transition-transform'

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
