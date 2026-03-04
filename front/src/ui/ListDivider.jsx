import { cn } from '@/utils/cn'

export const ListDivider = ({ children, className }) => {
  return (
    <div className={cn('w-full flex flex-col items-center', className)}>
      <span className="bg-white dark:bg-gray-800 px-2 text-center text-gray-600 dark:text-gray-400 text-xs -mb-2 z-1">
        {children}
      </span>
      <div className="w-full border-b border-dashed border-gray-300 dark:border-gray-500"></div>
    </div>
  )
}
