import { useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { motion, AnimatePresence } from 'framer-motion'
import { InputLabel } from '@/ui/InputLabel'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { cn } from '@/utils/cn'

export const MoneyInput = ({ label, value, onChange, className, ...props }) => {
  const imaskRef = useRef(null)

  const handleClear = () => {
    tgVibro('light')
    onChange?.('')
    // В IMaskInput работаем напрямую с DOM-элементом через ref
    imaskRef.current?.focus()
  }

  const hasValue =
    value !== undefined && value !== null && value.toString().length > 0

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center">
        <IMaskInput
          {...props}
          inputRef={(el) => (imaskRef.current = el)}
          inputMode="decimal"
          onFocus={() => tgVibro('medium')}
          mask={Number}
          value={value?.toString() ?? ''}
          unmask={true}
          scale={2}
          thousandsSeparator=" "
          radix="."
          normalizeZeros={true}
          padFractionalZeros={false}
          min={0}
          max={1000000}
          placeholder="0.00"
          onAccept={(val) => onChange?.(val)}
          className={cn(
            'w-full px-4 py-2.5 rounded-full border border-bot-grey-300 text-bot-grey-800 transition-all',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            hasValue && 'pr-12'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              key="clear-money"
              type="button"
              initial={{ opacity: 0, scale: 0.5, x: 0 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              onClick={handleClear}
              className="absolute right-1 p-1 text-bot-grey-400 hover:text-bot-grey-600 outline-none active:scale-90"
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
