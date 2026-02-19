import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'

export const Input = ({ label, onChange, className, value, ...props }) => {
  const inputRef = useRef(null)

  const handleClear = () => {
    tgVibro('light')
    onChange?.('')
    inputRef.current?.focus()
  }

  const handleChange = (e) => {
    onChange?.(e.target.value)
  }

  const hasValue = value?.length > 0

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center">
        <input
          {...props}
          ref={inputRef}
          value={value ?? ''}
          onChange={handleChange}
          onFocus={() => tgVibro('medium')}
          type="text"
          className={cn(
            'w-full py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 transition-all text-center',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            // Стандартный горизонтальный паддинг px-4 заменяем на динамический:
            // Если текст есть, добавляем по 48px (12 ед.) с каждой стороны для симметрии
            hasValue ? 'px-12' : 'px-4'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              type="button"
              key="clear-button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              onClick={handleClear}
              className="absolute right-1 p-1 text-gray-400 hover:text-gray-600 outline-none active:scale-90"
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
