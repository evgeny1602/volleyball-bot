import { useState } from 'react'
import { Input } from '@/ui/Input'
import { GenderInput } from '@/ui/GenderInput'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { vibro } from '@/utils/tools'
import { registerSchema } from '@/utils/validations'
import { RegisterButton } from '@/ui/buttons/RegisterButton'
import { RegisterError } from '@/ui/RegisterError'

export const RegisterForm = ({ onSubmit, isLoading }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const [fio, setFio] = useState('')
  const [gender, setGender] = useState('male')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')

  const handleAction = () => {
    const result = registerSchema.safeParse({ fio, gender, birthday, phone })

    if (result.success) {
      vibro('success')
      onSubmit({ fio, gender, birthday, phone })
    } else {
      vibro('error')
      setIsErrorVisible(true)
    }
  }

  return (
    <>
      <div className="text-center w-full flex flex-col gap-4 dark:text-gray-400">
        <p className="font-semibold">Приветствуем! ✌️</p>
        <p>Осталось чуть-чуть, и тебе откроется большой мир волейбола!</p>
        <p>Заполни следующую информацию о себе:</p>
      </div>

      <div className="flex flex-col items-center gap-3">
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
          className="mt-5 mb-5"
          onClick={handleAction}
        >
          Подать заявку
        </RegisterButton>
      </div>

      <RegisterError
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </>
  )
}
