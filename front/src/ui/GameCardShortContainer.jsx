import { cn } from '@/utils/cn'

export const GameCardShortContainer = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full h-31 rounded-4xl shadow-sm bg-white overflow-hidden active:scale-90 transition-all duration-200 border border-gray-300',
        className
      )}
    >
      {children}
    </div>
  )
}
