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
            'w-full py-2.5 rounded-full border border-gray-300 text-gray-600 transition-all text-center',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            // Используем симметричный padding px-12, когда есть значение,
            // чтобы скомпенсировать кнопку очистки справа
            hasValue ? 'px-12' : 'px-4'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              key="clear-money"
              type="button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
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
