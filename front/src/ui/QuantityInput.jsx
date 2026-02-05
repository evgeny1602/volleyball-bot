import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { InputLabel } from '@/ui/InputLabel'
import { tgVibro } from '@/utils/telegram'
import { twMerge } from 'tailwind-merge'
import { StepButton } from '@/ui/StepButton'

export const QuantityInput = ({ label, value, className }) => {
  const [qty, setQty] = useState(value ? value : 0)

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="relative flex items-center gap-2">
        <StepButton
          onClick={() => setQty((qty) => Math.max(0, (qty ? qty : 0) - 1))}
        >
          -
        </StepButton>

        <IMaskInput
          inputMode="numeric"
          onFocus={() => tgVibro('medium')}
          mask={Number}
          value={String(qty)}
          unmask={true}
          scale={0}
          thousandsSeparator=" "
          min={0}
          max={100}
          placeholder="0"
          onAccept={(value, mask) => setQty(parseInt(value))}
          className="text-center border rounded-3xl border-bot-grey-500 focus:border-bot-primary-medium focus:outline-0 focus:bg-bot-primary-light px-4 py-2 text-bot-grey-800 transition-all w-full font-mono"
        />

        <StepButton onClick={() => setQty((qty) => (qty ? qty : 0) + 1)}>
          +
        </StepButton>
      </div>
    </div>
  )
}
