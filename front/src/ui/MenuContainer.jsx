import { cn } from '@/utils/cn'

export const MenuContainer = ({ children }) => {
  return (
    <div
      className={cn(
        // Позиционирование
        'fixed bottom-5 flex flex-row flex-nowrap overflow-x-auto scroll-smooth snap-x',
        'w-auto max-w-[95%] py-1 px-1 rounded-full shadow-sm',

        // ЭФФЕКТ iOS (Glassmorphism)
        // 1. Полупрозрачный фон (белый в светлой, темный в темной теме)
        'bg-white/70 dark:bg-black/40',
        // 2. Размытие того, что ПОД меню
        'backdrop-blur-md backdrop-saturate-150',
        // 3. Тонкая граница для четкости (адаптивная)
        'border border-white/20 dark:border-white/10',

        // Скрытие скроллбара
        'scrollbar-none [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]',
        '[&::-webkit-scrollbar]:hidden'
      )}
    >
      {children}
    </div>
  )
}
