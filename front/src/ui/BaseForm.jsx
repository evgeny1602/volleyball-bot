import { useState, useMemo } from 'react'
import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { TimeInput } from '@/ui/TimeInput'
import { QuantityInput } from '@/ui/QuantityInput'
import { TextInput } from '@/ui/TextInput'
import { MoneyInput } from '@/ui/MoneyInput'
import { SubmitButton } from '@/ui/buttons/SubmitButton'
import { ClearButton } from '@/ui/buttons/ClearButton'
import { CancelButton } from '@/ui/buttons/CancelButton'

const emptyFormData = {
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

const fieldsConfig = [
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

export const BaseForm = ({ onCancel, onSubmit, initialFormData, schema }) => {
  const [formData, setFormData] = useState(initialFormData || emptyFormData)

  const validation = useMemo(() => schema.safeParse(formData), [formData])

  const updateField = (id, isNumber) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: isNumber ? (value === '' ? '' : Number(value)) : value,
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      {fieldsConfig.map(({ id, type: Component, isNumber, ...rest }) => (
        <Component
          key={id}
          value={formData[id]}
          onChange={updateField(id, isNumber)}
          {...rest}
        />
      ))}

      <div className="mt-6 flex flex-col gap-3">
        <SubmitButton
          validation={validation}
          onClick={() => onSubmit(formData)}
        />
        <ClearButton onClick={() => setFormData(emptyFormData)} />
        <CancelButton onClick={onCancel} />
      </div>
    </div>
  )
}
