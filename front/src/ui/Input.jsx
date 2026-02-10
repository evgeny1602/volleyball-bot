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
            'w-full px-4 py-2.5 rounded-full border border-bot-grey-300 text-bot-grey-800 transition-all',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            hasValue && 'pr-12'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              type="button"
              key="clear-button"
              initial={{ opacity: 0, scale: 0.5, x: 0 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              onClick={handleClear}
              className="absolute right-1 p-1 text-bot-grey-400 hover:text-bot-grey-600 outline-none "
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
