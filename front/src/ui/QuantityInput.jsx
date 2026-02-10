import { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { motion } from 'framer-motion'
import { InputLabel } from '@/ui/InputLabel'
import { tgVibro } from '@/utils/telegram'
import { StepButton } from '@/ui/StepButton'
import { cn } from '@/utils/cn'

export const QuantityInput = ({
  label,
  value,
  onChange,
  className,
  min = 0,
  max = 1000,
}) => {
  const [isError, setIsError] = useState(false)
  const currentVal = parseInt(value) || 0

  const triggerError = () => {
    setIsError(true)
    tgVibro('warning')
    setTimeout(() => setIsError(false), 500)
  }

  const handleStep = (step) => {
    const newVal = Math.min(max, Math.max(min, currentVal + step))
    if (newVal !== currentVal) {
      tgVibro('light')
      onChange?.(String(newVal))
    }
  }

  const handleBlur = () => {
    if (currentVal < min) {
      onChange?.(String(min))
      triggerError()
    } else if (currentVal > max) {
      onChange?.(String(max))
      triggerError()
    }
  }

  const isMin = currentVal <= min
  const isMax = currentVal >= max

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <motion.div
        className="relative flex items-center"
        animate={
          isError
            ? {
                x: [-2, 2, -2, 2, 0],
                transition: { duration: 0.2 },
              }
            : {}
        }
      >
        <div className="absolute left-2 z-10">
          <StepButton
            onClick={() => handleStep(-1)}
            disabled={isMin}
            className={cn(
              'transition-opacity duration-200',
              isMin && 'opacity-30 pointer-events-none'
            )}
          >
            <span className="text-xl leading-none">-</span>
          </StepButton>
        </div>

        <IMaskInput
          inputMode="numeric"
          onFocus={() => tgVibro('medium')}
          onBlur={handleBlur}
          mask={Number}
          value={String(value ?? '')}
          unmask={true}
          scale={0}
          min={-999999}
          max={999999}
          placeholder="0"
          onAccept={(val) => onChange?.(val)}
          className={cn(
            'text-center w-full rounded-full border transition-all px-12 py-2.5 outline-0',
            'border-bot-grey-300 text-bot-grey-800 focus:border-bot-primary focus:bg-bot-primary/5',
            isError &&
              'border-red-500 bg-red-50 text-red-600 focus:border-red-500'
          )}
        />

        <div className="absolute right-2 z-10">
          <StepButton
            onClick={() => handleStep(1)}
            disabled={isMax}
            className={cn(
              'transition-opacity duration-200',
              isMax && 'opacity-30 pointer-events-none'
            )}
          >
            <span className="text-xl leading-none">+</span>
          </StepButton>
        </div>
      </motion.div>
    </div>
  )
}
