import { useState, useRef } from 'react'
import { IMaskInput, IMask } from 'react-imask'
import { motion, AnimatePresence } from 'framer-motion' // Добавляем Framer Motion
import { Calendar } from 'lucide-react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'

export const DateInput = ({ value, onChange, label }) => {
  const [dateText, setDateText] = useState(value ? value : '')
  const imaskRef = useRef(null)

  const handleChange = (val) => {
    setDateText(val)
    if (onChange) onChange(val)
  }

  const handleClearClick = () => {
    tgVibro('light')
    setDateText('')
    imaskRef.current?.focus()
    if (onChange) onChange('')
  }

  const handleChangeFromDatepicker = (e) => {
    const val = e.target.value
    if (!val) return

    const [y, m, d] = val.split('-')
    if (y && m && d) {
      handleChange(`${d}.${m}.${y}`)
    }
  }

  const getDateLength = () =>
    dateText.replaceAll('_', '').replaceAll('.', '').length

  const hasValue = getDateLength() > 0

  return (
    <div className="flex flex-col gap-1.5 w-full max-w-53">
      {label && <InputLabel>{label}</InputLabel>}

      <div className="flex items-center gap-2">
        {/* Кнопка календаря */}
        <div className="relative overflow-hidden shrink-0">
          <button
            type="button"
            className="p-2 text-white bg-bot-primary rounded-full active:scale-95 transition-transform flex items-center justify-center"
          >
            <Calendar className="w-7 h-7" />
          </button>

          <input
            type="date"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={handleChangeFromDatepicker}
            onInput={() => tgVibro('light')}
          />
        </div>

        {/* Контейнер инпута */}
        <div className="relative flex-1 flex items-center">
          <IMaskInput
            onFocus={() => tgVibro('medium')}
            inputRef={(el) => (imaskRef.current = el)}
            inputMode="numeric"
            mask={Date}
            value={dateText}
            lazy={false}
            autofix={true}
            blocks={{
              d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
              m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
              Y: {
                mask: IMask.MaskedRange,
                from: 1900,
                to: 2100,
                maxLength: 4,
              },
            }}
            unmask={false}
            onAccept={handleChange}
            placeholder="ДД.ММ.ГГГГ"
            className={cn(
              'border rounded-full border-bot-grey-300 transition-all w-full px-4 py-2.5 text-bot-grey-800',
              'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
              hasValue && 'pr-12'
            )}
          />

          <AnimatePresence>
            {hasValue && (
              <motion.button
                key="clear-date"
                type="button"
                initial={{ opacity: 0, scale: 0.5, x: 0 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 0 }}
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
