import { useState, useRef } from 'react'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'

export const Input = ({ label, onChange }) => {
  const [text, setText] = useState('')

  const inputRef = useRef(null)

  const handleClearClick = () => {
    setText('')

    inputRef.current?.focus()
  }

  const handleChange = (e) => {
    setText(e.target.value)

    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div>
      {label && (
        <div className="text-bot-primary font-medium text-center">{label}</div>
      )}

      <div className="flex flex-row items-center">
        <input
          onFocus={() => tgVibro('medium')}
          ref={inputRef}
          onChange={handleChange}
          value={text}
          type="text"
          className="border rounded-3xl border-bot-grey-500 focus:border-bot-primary-medium focus:outline-0 focus:bg-bot-primary-light w-full px-4 py-2 text-bot-grey-800 transition-all font-mono"
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
