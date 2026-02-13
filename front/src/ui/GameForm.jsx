import { useState, useMemo } from 'react'
import { z } from 'zod'
import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { TimeInput } from '@/ui/TimeInput'
import { QuantityInput } from '@/ui/QuantityInput'
import { TextInput } from '@/ui/TextInput'
import { MoneyInput } from '@/ui/MoneyInput'
import { SubmitButton } from '@/ui/buttons/SubmitButton'
import { ClearButton } from '@/ui/buttons/ClearButton'
import { CancelButton } from '@/ui/buttons/CancelButton'
import { BaseForm } from '@/ui/BaseForm'

const EMPTY_FORM_DATA = {
  name: '',
  location: '',
  address: '',
  date: '',
  time: '',
  duration: '',
  description: '',
  price: '',
  maxPlayers: '',
}

const GAME_SCHEMA = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  location: z.string().min(2, 'Укажите место'),
  address: z.string().min(5, 'Слишком короткий адрес'),
  date: z.string().regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат: ДД.ММ.ГГГГ'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Формат: ЧЧ:ММ'),
  duration: z.number().min(10, 'Минимум 10 мин').max(3000),
  description: z.string().min(3, 'Опишите игру подробнее'),
  price: z.number().min(0, 'Цена не может быть отрицательной'),
  maxPlayers: z.number().min(2, 'Минимум 2 игрока').max(50),
})

const FIELDS_CONFIG = [
  { id: 'name', type: Input, label: 'Название игры' },
  { id: 'location', type: Input, label: 'Место' },
  { id: 'address', type: Input, label: 'Адрес' },
  { id: 'date', type: DateInput, label: 'Дата' },
  { id: 'time', type: TimeInput, label: 'Время' },
  {
    id: 'duration',
    type: QuantityInput,
    label: 'Длительность (мин.)',
    isNumber: true,
    props: { min: 0, max: 3000 },
  },
  {
    id: 'description',
    type: TextInput,
    label: 'Описание',
    placeholder: 'Введите описание',
  },
  { id: 'price', type: MoneyInput, label: 'Цена', isNumber: true },
  {
    id: 'maxPlayers',
    type: QuantityInput,
    label: 'Макс. игроков',
    isNumber: true,
    props: { min: 0, max: 50 },
  },
]

export const GameForm = ({ onSubmit, onCancel, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData || EMPTY_FORM_DATA)
  const validation = useMemo(() => GAME_SCHEMA.safeParse(formData), [formData])

  const updateField = (id, isNumber) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: isNumber ? (value === '' ? '' : Number(value)) : value,
    }))
  }

  return (
    <BaseForm
      config={FIELDS_CONFIG}
      data={formData}
      onChange={updateField}
      actions={
        <>
          <SubmitButton
            validation={validation}
            onClick={() => onSubmit(formData)}
          />
          <ClearButton onClick={() => setFormData(EMPTY_FORM_DATA)} />
          <CancelButton onClick={onCancel} />
        </>
      }
    />
  )
}
