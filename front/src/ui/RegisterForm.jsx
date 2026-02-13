import { useState } from 'react'
import { Input } from '@/ui/Input'
import { GenderInput } from '@/ui/GenderInput'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { tgVibro } from '@/utils/telegram'
import { registerSchema } from '@/utils/validations'
import { RegisterButton } from '@/ui/buttons/RegisterButton'

export const RegisterForm = ({ onSubmit, onError, isLoading }) => {
  const [fio, setFio] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  const handleAction = () => {
    const result = registerSchema.safeParse({ fio, gender, birthday, phone })

    console.log({ fio, gender, birthday, phone })

    if (result.success) {
      tgVibro('success')
      onSubmit({ fio, gender, birthday, phone })
    } else {
      tgVibro('error')
      onError?.()
    }
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <Input
        label="Фамилия, имя"
        onChange={(val) => setFio(val)}
        value={fio}
      />

      <GenderInput
        label="Пол"
        onChange={(val) => setGender(val)}
        value={gender}
      />

      <DateInput
        label="Дата рождения"
        onChange={(val) => setBirthday(val)}
        value={birthday}
      />

      <PhoneInput
        label="Номер телефона"
        onChange={(val) => setPhone(val)}
        value={phone}
      />

      <RegisterButton
        isLoading={isLoading}
        className="mt-10 mb-10"
        onClick={handleAction}
      >
        Подать заявку
      </RegisterButton>
    </div>
  )
}
