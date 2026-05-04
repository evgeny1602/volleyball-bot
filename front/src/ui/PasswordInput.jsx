import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { InputLabel } from '@/ui/InputLabel'
import { CloseIcon } from '@/ui/CloseIcon'
import { vibro } from '@/utils/tools'
import { cn } from '@/utils/cn'

export const PasswordInput = ({
  label,
  value,
  onChange,
  className,
  ...props
}) => {
  const inputRef = useRef(null)

  const handleClear = () => {
    vibro('light')
    onChange?.('')
    inputRef.current?.focus()
  }

  const hasValue = value?.length > 0

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center">
        <input
          type="password"
          ref={inputRef}
          value={value ?? ''}
          onFocus={() => vibro('medium')}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'w-full py-2.5 rounded-full border border-gray-300',
            'dark:border-gray-600 text-gray-600 dark:text-gray-300',
            'transition-all text-center',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            hasValue ? 'px-12' : 'px-4'
          )}
          {...props}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              key="clear-phone"
              type="button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={handleClear}
              className={cn(
                'absolute right-1 p-1 text-bot-grey-400',
                ' hover:text-bot-grey-600 outline-none active:scale-90'
              )}
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
