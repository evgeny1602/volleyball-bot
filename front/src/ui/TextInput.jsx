import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'

export const TextInput = ({
  label,
  onChange,
  className,
  value,
  rows = 4,
  ...props
}) => {
  const textareaRef = useRef(null)

  const handleClear = () => {
    tgVibro('light')
    onChange?.('')
    textareaRef.current?.focus()
  }

  const handleChange = (e) => {
    onChange?.(e.target.value)
  }

  const hasValue = value?.length > 0

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex flex-col">
        <textarea
          {...props}
          ref={textareaRef}
          value={value ?? ''}
          onChange={handleChange}
          onFocus={() => tgVibro('medium')}
          rows={rows}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border border-bot-grey-300 text-bot-grey-800 transition-all resize-none',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            'scrollbar-none',
            hasValue && 'pr-10'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              type="button"
              key="clear-textarea"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              onClick={handleClear}
              className="absolute right-1.5 top-1.5 p-1 text-bot-grey-400 hover:text-bot-grey-600 outline-none"
            >
              <CloseIcon className="w-7 h-7" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
