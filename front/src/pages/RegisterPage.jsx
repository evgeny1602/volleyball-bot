import { Input } from '@/ui/Input'
import { GenderInput } from '@/ui/GenderInput'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { Button } from '@/ui/Button'
import { ErrorBubble } from '@/ui/ErrorBubble'
import { useState } from 'react'
import { tgVibro } from '@/utils/telegram'
import {
  isBirthdayValid,
  isFioValid,
  isPhoneValid,
} from '@/utils/form_checkers'

export const RegisterPage = () => {
  const [fio, setFio] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleSubmit = () => {
    const isFormValid =
      isFioValid(fio) && isBirthdayValid(birthday) && isPhoneValid(phone)

    if (!isFormValid) {
      tgVibro('error')

      setIsErrorVisible(true)
    }

    if (isFormValid) {
      console.log('Send data:')
      console.log({ fio, gender, birthday, phone })
    }
  }

  return (
    <div className="flex flex-col items-center gap-20 mt-5 relative">
      <div className="text-center w-[70%] flex flex-col gap-4">
        <p>Приветствуем!</p>
        <p>Осталось чуть-чуть, и тебе откроется большой мир волейбола!</p>
        <p>Заполни следующую информацию о себе:</p>
      </div>

      <div className="flex flex-col items-center gap-10 mb-40">
        <Input
          label="Фамилия, имя"
          onChange={(val) => setFio(val)}
        />

        <GenderInput
          label="Пол"
          onChange={(val) => setGender(val)}
        />

        <DateInput
          label="Дата рождения"
          onChange={(val) => setBirthday(val)}
        />

        <PhoneInput
          label="Номер телефона"
          onChange={(val) => setPhone(val)}
        />

        <Button
          className="mt-10"
          onClick={handleSubmit}
        >
          Подать заявку
        </Button>
      </div>

      {isErrorVisible && (
        <ErrorBubble
          onClose={() => setIsErrorVisible(false)}
          durationMs={3000}
        >
          Все поля формы должны
          <br />
          быть заполнены!
        </ErrorBubble>
      )}
    </div>
  )
}
