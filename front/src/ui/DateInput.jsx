import { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { Calendar } from 'lucide-react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { IMask } from 'react-imask'

export const DateInput = ({ value, onChange, label }) => {
  const [dateText, setDateText] = useState(value ? value : '')
  const imaskRef = useRef(null)

  const handleChange = (val) => {
    setDateText(val)
    if (onChange) onChange(val)
  }

  const handleClearClick = () => {
    setDateText('')
    imaskRef.current?.focus()
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

  return (
    <div className="flex flex-col gap-1 w-48">
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center gap-2">
        <div className="relative overflow-hidden shrink-0">
          <button
            type="button"
            className="p-2 text-white bg-bot-primary rounded-[50%] active:scale-95 transition-transform"
          >
            <Calendar
              className="w-5 h-5"
              color="currentColor"
            />
          </button>

          <input
            type="date"
            className="absolute inset-0 opacity-0 cursor-pointer s-full"
            style={{ fontSize: '16px' }}
            onChange={handleChangeFromDatepicker}
            onInput={() => tgVibro('light')}
          />
        </div>

        <IMaskInput
          onFocus={() => tgVibro('medium')}
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
          className="border rounded-full border-bot-grey-300 focus:border-bot-primary-medium focus:outline-0 focus:bg-bot-primary-light px-4 py-2 text-bot-grey-800 transition-all w-full"
          placeholder="ДД.ММ.ГГГГ"
        />

        {getDateLength() > 0 && (
          <CloseIcon
            onClick={handleClearClick}
            className="-ml-10"
          />
        )}
      </div>
    </div>
  )
}
