import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'
import { X } from 'lucide-react'
import { useState, useRef } from 'react'

const CloseIcon = ({ onClick }) => {
  return (
    <div className="text-white bg-bot-grey-500 rounded-[50%] p-1 cursor-pointer active:scale-95 transition-transform -ml-9">
      <X
        onClick={() => {
          tgVibro('medium')

          onClick()
        }}
        size={16}
        color="currentColor"
        strokeWidth={2}
      />
    </div>
  )
}

export const Input = ({ label, onChange }) => {
  const [text, setText] = useState('')

  const inputRef = useRef(null)

  const handleClearClick = () => {
    setText('')

    inputRef.current?.focus()
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      <div class="text-bot-primary font-medium text-center">{label}</div>

      <div className="flex flex-row items-center">
        <input
          ref={inputRef}
          onChange={handleChange}
          value={text}
          type="text"
          className="border rounded-3xl border-bot-grey-500 focus:border-bot-grey-800 focus:outline-0 focus:bg-bot-grey-100 w-full px-4 py-2 text-bot-grey-800 transition-all"
        />

        {text.length > 0 && <CloseIcon onClick={handleClearClick} />}
      </div>
    </div>
  )
}
