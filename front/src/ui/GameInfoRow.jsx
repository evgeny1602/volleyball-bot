import { cn } from '@/utils/cn'

export const GameInfoRow = ({ Icon, children, className = '' }) => (
  <div
    className={cn(
      'flex items-center gap-1 text-sm text-bot-grey-800',
      className
    )}
  >
    <Icon
      strokeWidth={1.5}
      className="text-bot-primary/75 w-4 h-4"
    />
    {children}
  </div>
)
