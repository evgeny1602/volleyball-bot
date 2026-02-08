import { useState } from 'react'
import { Input } from '@/ui/Input'
import { GenderInput } from '@/ui/GenderInput'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { Button } from '@/ui/Button'
import { tgVibro } from '@/utils/telegram'
import { registerSchema } from '@/utils/validations'

export const RegisterForm = ({ onSubmit, onError }) => {
  const [fio, setFio] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  const handleAction = () => {
    const result = registerSchema.safeParse({ fio, gender, birthday, phone })

    if (!result.success) {
      tgVibro('error')

      if (onError) onError()

      return
    }

    tgVibro('success')
    onSubmit({ fio, gender, birthday, phone })
  }

  return (
    <div className="flex flex-col items-center gap-10">
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
      >
        Подать заявку
      </Button>
    </div>
  )
}
