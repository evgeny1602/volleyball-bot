import { useState, useRef } from 'react'
import { IMaskInput } from 'react-imask'
import { InputLabel } from '@/ui/InputLabel'
import { CloseIcon } from '@/ui/CloseIcon'
import { tgVibro } from '@/utils/telegram'

export const PhoneInput = ({ label, value }) => {
  const imaskRef = useRef(null)

  const [phone, setPhone] = useState(value ? value : '')

  const handleClearClick = () => {
    setPhone('')

    imaskRef.current?.focus()
  }

  const getPhoneLength = () =>
    phone.replaceAll('_', '').replaceAll('.', '').length

  return (
    <div className="flex flex-col gap-1 w-58">
      {label && <InputLabel>{label}</InputLabel>}
      <div className="relative flex items-center gap-2">
        <IMaskInput
          inputMode="numeric"
          inputRef={imaskRef}
          onFocus={() => tgVibro('medium')}
          mask="+{7} (000) 000-00-00"
          value={phone}
          unmask={true}
          onAccept={(value, mask) => setPhone(value)}
          placeholder="+7 (___) ___-__-__"
          className="border rounded-full border-bot-grey-300 focus:border-bot-primary-medium focus:outline-0 focus:bg-bot-primary-light px-4 py-2 text-bot-grey-800 transition-all w-full font-mono"
        />

        {getPhoneLength() > 0 && (
          <CloseIcon
            onClick={handleClearClick}
            className="-ml-10"
          />
        )}
      </div>
    </div>
  )
}
