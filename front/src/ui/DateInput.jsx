import { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { Calendar } from 'lucide-react'
import { CloseIcon } from '@/ui/CloseIcon'
import { twMerge } from 'tailwind-merge'
import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'

export const DateInput = ({ value, onChange }) => {
  const [dateText, setDateText] = useState(value ? value : '')

  const dateInputRef = useRef(null)
  const imaskRef = useRef(null)

  const openDatePicker = () => {
    tgVibro('medium')

    if (dateInputRef.current) {
      dateInputRef.current.showPicker()
    }
  }

  const handleChange = (val) => {
    setDateText(val)

    if (onChange) {
      onChange(val)
    }
  }

  const handleClearClick = () => {
    setDateText('')

    imaskRef.current?.focus()
  }

  const handleChangeFromDatepicker = (e) => {
    const [y, m, d] = e.target.value.split('-')

    if (y && m && d) {
      handleChange(`${d}.${m}.${y}`)
    }
  }

  const getDateLength = () =>
    dateText.replaceAll('_', '').replaceAll('.', '').length

  const imaskClasses = cn(
    'border rounded-3xl border-bot-grey-500 focus:border-bot-grey-800 focus:outline-0 focus:bg-bot-grey-100 px-4 py-2 text-bot-grey-800 transition-all w-34'
  )

  return (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={openDatePicker}
        className="p-2 text-white bg-bot-primary rounded-[50%] hover:cursor-pointer active:scale-95 transition-transform"
      >
        <Calendar
          className="w-5 h-5"
          color="currentColor"
        />
      </button>

      <IMaskInput
        inputRef={imaskRef}
        inputMode="numeric"
        mask={Date}
        value={dateText}
        lazy={false}
        autofix={true}
        blocks={{
          d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
          m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
          Y: { mask: IMask.MaskedRange, from: 1900, to: 2100, maxLength: 4 },
        }}
        unmask={false}
        onAccept={handleChange}
        className={imaskClasses}
        placeholder="ДД.ММ.ГГГГ"
      />

      <input
        ref={dateInputRef}
        type="date"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        onChange={handleChangeFromDatepicker}
      />

      {getDateLength() > 0 && (
        <CloseIcon
          onClick={handleClearClick}
          className="-ml-10"
        />
      )}
    </div>
  )
}
