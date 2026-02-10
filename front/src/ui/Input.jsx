import { useState, useRef } from 'react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'
import { InputLabel } from '@/ui/InputLabel'
import { twMerge } from 'tailwind-merge'

export const Input = ({ label, onChange, className }) => {
  const [text, setText] = useState('')

  const inputRef = useRef(null)

  const handleClearClick = () => {
    setText('')

    inputRef.current?.focus()

    if (onChange) {
      onChange('')
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)

    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      {label && <InputLabel>{label}</InputLabel>}

      <div className="flex flex-row items-center">
        <input
          onFocus={() => tgVibro('medium')}
          ref={inputRef}
          onChange={handleChange}
          value={text}
          type="text"
          className="border rounded-full border-bot-grey-300 focus:border-bot-primary-medium focus:outline-0 focus:bg-bot-primary-light w-full px-4 py-2 text-bot-grey-800 transition-all"
        />

        {text.length > 0 && (
          <CloseIcon
            onClick={handleClearClick}
            className="-ml-8"
          />
        )}
      </div>
    </div>
  )
}
