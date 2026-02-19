import { useRef } from 'react'
import { IMaskInput, IMask } from 'react-imask'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'

export const TimeInput = ({ value = '', onChange, label, className }) => {
  const imaskRef = useRef(null)

  const handleChange = (val) => {
    if (onChange) onChange(val)
  }

  const handleClearClick = () => {
    tgVibro('light')
    imaskRef.current?.focus()
    handleChange('')
  }

  const handleChangeFromTimepicker = (e) => {
    const val = e.target.value
    if (!val) return
    handleChange(val)
  }

  const hasValue = value && value.replace(/[^0-9]/g, '').length > 0

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center">
        <div className="absolute left-2 z-10 flex items-center justify-center">
          <div className="p-1.5 bg-bot-primary text-white rounded-full flex items-center justify-center transition-transform active:scale-95">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <input
          type="time"
          className="absolute left-1 z-20 opacity-0 cursor-pointer w-10 h-10"
          onChange={handleChangeFromTimepicker}
          onInput={() => tgVibro('light')}
        />

        <IMaskInput
          onFocus={() => tgVibro('medium')}
          inputRef={(el) => (imaskRef.current = el)}
          inputMode="numeric"
          mask="HH:mm"
          blocks={{
            HH: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 23,
              maxLength: 2,
            },
            mm: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 59,
              maxLength: 2,
            },
          }}
          value={value}
          lazy={false}
          unmask={false}
          onAccept={(val) => handleChange(val)}
          className={cn(
            'border rounded-full border-gray-300 dark:border-gray-600 transition-all w-full py-2.5 text-gray-600 dark:text-gray-300 text-center',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            'px-12'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              key="clear-time"
              type="button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={handleClearClick}
              className="absolute right-1 p-1 text-gray-400 hover:text-gray-600 outline-none active:scale-90 z-10"
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
