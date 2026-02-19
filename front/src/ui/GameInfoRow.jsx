import { cn } from '@/utils/cn'

export const GameInfoRow = ({ Icon, children, className = '' }) => (
  <div
    className={cn(
      'flex flex-row items-start gap-1 text-xs text-gray-600',
      className
    )}
  >
    <Icon
      strokeWidth={2}
      className="text-bot-primary/75 w-3.5 h-3.5 shrink-0"
    />
    {children}
  </div>
)
