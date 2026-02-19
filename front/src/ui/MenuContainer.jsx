import { cn } from '@/utils/cn'

export const MenuContainer = ({ children }) => {
  return (
    <div
      className={cn(
        'fixed bottom-5 flex flex-row flex-nowrap overflow-x-auto scroll-smooth snap-x',
        'w-auto max-w-[95%] py-1 px-1 rounded-full shadow-sm dark:shadow-sm-dark',
        'bg-white/70 dark:bg-black/70',
        'backdrop-blur-md backdrop-saturate-150',
        'border border-white/20 dark:border-white/20',
        'scrollbar-none [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]',
        '[&::-webkit-scrollbar]:hidden'
      )}
    >
      {children}
    </div>
  )
}
