import { Input } from '@/ui/Input'
import { GenderInput } from '@/ui/GenderInput'
import { DateInput } from '@/ui/DateInput'
import { PhoneInput } from '@/ui/PhoneInput'
import { Button } from '@/ui/Button'

export const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center gap-20 mt-5 mb-15">
      <div className="text-center w-[70%] flex flex-col gap-4">
        <p>Приветствуем!</p>
        <p>Осталось чуть-чуть, и тебе откроется большой мир волейбола!</p>
        <p>Заполни следующую информацию о себе:</p>
      </div>

      <div className="flex flex-col items-center gap-10">
        <Input label="Фамилия, имя" />

        <GenderInput label="Пол" />

        <DateInput label="Дата рождения" />

        <PhoneInput label="Номер телефона" />

        <Button className="mt-10">Подать заявку</Button>
      </div>
    </div>
  )
}
