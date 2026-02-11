import { useRef } from 'react'
import { IMaskInput, IMask } from 'react-imask'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { cn } from '@/utils/cn'

export const DateInput = ({ value = '', onChange, label }) => {
  const imaskRef = useRef(null)

  const handleChange = (val) => {
    if (onChange) onChange(val)
  }

  const handleClearClick = () => {
    tgVibro('light')
    imaskRef.current?.focus()
    handleChange('')
  }

  const handleChangeFromDatepicker = (e) => {
    const val = e.target.value
    if (!val) return

    const [y, m, d] = val.split('-')
    if (y && m && d) {
      handleChange(`${d}.${m}.${y}`)
    }
  }

  const hasValue =
    value && value.replaceAll('_', '').replaceAll('.', '').length > 0

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center">
        <div className="absolute left-2 z-10 flex items-center justify-center">
          <div className="p-2 bg-bot-primary text-white rounded-full flex items-center justify-center transition-transform active:scale-95">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <input
          type="date"
          className="absolute left-1 z-20 opacity-0 cursor-pointer w-10 h-10"
          onChange={handleChangeFromDatepicker}
          onInput={() => tgVibro('light')}
        />

        <IMaskInput
          onFocus={() => tgVibro('medium')}
          inputRef={(el) => (imaskRef.current = el)}
          inputMode="numeric"
          mask={Date}
          value={value}
          lazy={true}
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
          onAccept={(val) => handleChange(val)}
          className={cn(
            'border rounded-full border-bot-grey-300 transition-all w-full py-2.5 text-bot-grey-800 text-center',
            'focus:border-bot-primary focus:outline-0 focus:bg-bot-primary/5',
            'px-12'
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              key="clear-date"
              type="button"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={handleClearClick}
              className="absolute right-1 p-1 text-bot-grey-400 hover:text-bot-grey-600 outline-none active:scale-90 z-10"
            >
              <CloseIcon className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
