import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'

export const BaseMenuIcon = ({
  className,
  onClick,
  icon,
  text,
  variant = 'default',
}) => {
  const isActive = variant === 'active'

  const handleClick = () => {
    tgVibro('medium')

    if (onClick) onClick()
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        className,
        'snap-center flex flex-col items-center py-2 min-w-22 rounded-full -mx-2 transition-all duration-200 ease-in-out',
        isActive ? 'bg-bot-grey-200' : 'bg-transparent'
      )}
    >
      <div
        className={cn(
          'w-6 h-6 transition-colors duration-100',
          isActive ? 'bg-bot-primary' : 'bg-bot-grey-500'
        )}
        style={{
          maskImage: `url(${icon})`,
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url(${icon})`,
          WebkitMaskSize: 'contain',
        }}
      />

      <div
        className={cn(
          'text-xs transition-colors duration-300',
          isActive ? 'text-bot-primary font-medium' : 'text-bot-grey-500'
        )}
      >
        {text}
      </div>
    </div>
  )
}
