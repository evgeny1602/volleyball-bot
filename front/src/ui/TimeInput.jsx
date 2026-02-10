import { useState, useRef } from 'react'
import { IMaskInput, IMask } from 'react-imask'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'

export const TimeInput = ({ value, onChange, label }) => {
  const [timeText, setTimeText] = useState(value ? value : '')
  const imaskRef = useRef(null)

  const handleChange = (val) => {
    setTimeText(val)
    if (onChange) onChange(val)
  }

  const handleClearClick = () => {
    tgVibro('light')
    setTimeText('')
    imaskRef.current?.focus()
    if (onChange) onChange('')
  }

  const handleChangeFromTimepicker = (e) => {
    const val = e.target.value
    if (!val) return
    handleChange(val)
  }

  const getTimeLength = () => timeText.replace(/[^0-9]/g, '').length
  const hasValue = getTimeLength() > 0

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-53">
      {label && <InputLabel>{label}</InputLabel>}

      <div className="flex items-center gap-2">
        <div className="relative overflow-hidden shrink-0">
          <button
            type="button"
            className="p-2 text-white bg-bot-primary rounded-full active:scale-95 transition-transform flex items-center justify-center"
          >
            <Clock className="w-7 h-7" />
          </button>

          <input
            type="time"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={handleChangeFromTimepicker}
            onInput={() => tgVibro('light')}
          />
        </div>

        <div className="relative flex-1 flex items-center">
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
            value={timeText}
            lazy={false}
            placeholder="00:00"
            unmask={false}
            onAccept={handleChange}
            className={cn(
              'border rounded-full border-bot-grey-300 transition-all w-full px-4 py-2.5 text-bot-grey-800',
              'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
              hasValue && 'pr-12'
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
                className="absolute right-1 p-1 text-bot-grey-400 hover:text-bot-grey-600 outline-none"
              >
                <CloseIcon className="w-8 h-8" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
