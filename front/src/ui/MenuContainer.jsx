import { cn } from '@/utils/cn'

export const MenuContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        className,
        'flex flex-row flex-nowrap overflow-x-auto scroll-smooth snap-x gap-2 py-1 px-3 bg-white rounded-full shadow-sm max-w-full'
      )}
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {children}
    </div>
  )
}
