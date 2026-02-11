import { cn } from '@/utils/cn'

export const GameCardShortContainer = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full h-31 rounded-4xl shadow-sm bg-white overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  )
}
