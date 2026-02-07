import { useState } from 'react'
import { Input } from '@/ui/Input'
import { GenderInput } from '@/ui/GenderInput'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { Button } from '@/ui/Button'
import { tgVibro } from '@/utils/telegram'
import {
  isBirthdayValid,
  isFioValid,
  isPhoneValid,
} from '@/utils/form_checkers'

export const RegisterForm = ({ onSubmit, isLoading }) => {
  const [fio, setFio] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  const handleAction = () => {
    const isFormValid =
      isFioValid(fio) && isBirthdayValid(birthday) && isPhoneValid(phone)

    if (!isFormValid) {
      tgVibro('error')
      onSubmit(null) // Сигнализируем об ошибке валидации
      return
    }

    tgVibro('success')
    onSubmit({ fio, gender, birthday, phone })
  }

  return (
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
        onClick={handleAction}
        disabled={isLoading}
      >
        {isLoading ? 'Загрузка...' : 'Подать заявку'}
      </Button>
    </div>
  )
}
