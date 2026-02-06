import { useState, useRef } from 'react'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { twMerge } from 'tailwind-merge'
import { cn } from '@/utils/cn'

export const GenderInput = ({ label, onChange, className, value }) => {
  const [gender, setGender] = useState(value ? value : 'male')

  const handleChange = (optionId) => {
    setGender(optionId)

    tgVibro('medium')

    if (onChange) {
      onChange(optionId)
    }
  }

  const options = [
    { id: 'male', label: 'Чемпион' },
    { id: 'female', label: 'Чемпионка' },
  ]

  return (
    <div className={twMerge('flex flex-col gap-1 ', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="flex w-full bg-bot-grey-100 rounded-3xl gap-1 p-1">
        {options.map((option) => (
          <label
            key={option.id}
            className={cn(
              'flex-1 py-2 px-4 text-center font-mono transition-all cursor-pointer rounded-3xl',
              gender === option.id
                ? 'bg-bot-primary text-white shadow-sm'
                : 'text-bot-grey-500'
            )}
          >
            <input
              type="radio"
              className="sr-only"
              name="custom-radio"
              value={option.id}
              checked={value === option.id}
              onChange={() => handleChange(option.id)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
