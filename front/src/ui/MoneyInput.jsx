import { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { InputLabel } from '@/ui/InputLabel'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { twMerge } from 'tailwind-merge'

export const MoneyInput = ({ label, value, className }) => {
  const imaskRef = useRef(null)

  const [money, setMoney] = useState(value ? value : '')

  const handleClearClick = () => {
    setMoney('')

    imaskRef.current?.focus()
  }

  const getMoneyLength = () => money.toString().length

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center gap-2">
        <IMaskInput
          inputMode="decimal"
          inputRef={imaskRef}
          onFocus={() => tgVibro('medium')}
          mask={Number}
          value={money}
          unmask={true}
          scale={2}
          thousandsSeparator=" "
          radix="."
          normalizeZeros={true}
          padFractionalZeros={false}
          min={0}
          max={1000000}
          placeholder="0.00"
          onAccept={(value, mask) => setMoney(value)}
          className="border rounded-3xl border-bot-grey-500 focus:border-bot-primary-medium focus:outline-0 focus:bg-bot-primary-light px-4 py-2 text-bot-grey-800 transition-all w-full font-mono"
        />

        {getMoneyLength() > 0 && (
          <CloseIcon
            onClick={handleClearClick}
            className="-ml-10"
          />
        )}
      </div>
    </div>
  )
}
