import { useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { motion, AnimatePresence } from 'framer-motion'
import { InputLabel } from '@/ui/InputLabel'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { cn } from '@/utils/cn'

export const PhoneInput = ({ label, value, onChange, className, ...props }) => {
  const imaskRef = useRef(null)

  const handleClear = () => {
    tgVibro('light')
    onChange?.('')
    imaskRef.current?.focus()
  }

  const hasValue = value?.length > 0

  return (
    <div className={cn('flex flex-col gap-1.5 w-full max-w-53', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center">
        <IMaskInput
          {...props}
          inputRef={(el) => (imaskRef.current = el)}
          inputMode="tel"
          mask="+{7} (000) 000-00-00"
          value={value ?? ''}
          unmask={true}
          onAccept={(val) => onChange?.(val)}
          onFocus={() => tgVibro('medium')}
          placeholder="+7 (___) ___-__-__"
          className={cn(
            'w-full px-4 py-2.5 rounded-full border border-bot-grey-300 text-bot-grey-800 transition-all',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            hasValue && 'pr-12'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              key="clear-phone"
              type="button"
              initial={{ opacity: 0, scale: 0.5, x: 0 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={handleClear}
              className="absolute right-1 p-1 text-bot-grey-400 hover:text-bot-grey-600 outline-none"
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
