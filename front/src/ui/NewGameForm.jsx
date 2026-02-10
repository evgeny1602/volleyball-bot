import { useState, useMemo } from 'react'
import { motion } from 'framer-motion' // Добавляем motion
import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { TimeInput } from '@/ui/TimeInput'
import { QuantityInput } from '@/ui/QuantityInput'
import { TextInput } from '@/ui/TextInput'
import { MoneyInput } from '@/ui/MoneyInput'
import { CreateButton } from '@/ui/buttons/CreateButton'
import { cn } from '@/utils/cn'
import { tgVibro } from '@/utils/telegram'
import { Button } from '@/ui/Button'
import { Trash2 } from 'lucide-react'

const COMPONENT_MAP = {
  input: Input,
  date: DateInput,
  time: TimeInput,
  quantity: QuantityInput,
  textarea: TextInput,
  money: MoneyInput,
}

const FORM_CONFIG = [
  {
    id: 'name',
    type: 'input',
    label: 'Название игры',
  },
  {
    id: 'location',
    type: 'input',
    label: 'Место',
  },
  {
    id: 'address',
    type: 'input',
    label: 'Адрес',
  },
  { id: 'date', type: 'date', label: 'Дата' },
  { id: 'time', type: 'time', label: 'Время' },
  {
    id: 'duration',
    type: 'quantity',
    label: 'Длительность (мин.)',
    props: { min: 0, max: 3000 },
  },
  {
    id: 'description',
    type: 'textarea',
    label: 'Описание',
    placeholder: 'Введите описание',
  },
  { id: 'price', type: 'money', label: 'Цена' },
  {
    id: 'maxPlayers',
    type: 'quantity',
    label: 'Макс. игроков',
    props: { min: 0, max: 50 },
  },
]

const INITIAL_STATE = {
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

export const NewGameForm = ({ onCancel }) => {
  const [form, setForm] = useState(INITIAL_STATE)
  const [showErrors, setShowErrors] = useState(false)

  const updateField = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const isFieldEmpty = (id) => {
    const value = form[id]
    return !value || value.toString().trim().length === 0
  }

  const isFormValid = useMemo(() => {
    return Object.keys(form).every((id) => !isFieldEmpty(id))
  }, [form])

  const triggerValidationUI = () => {
    setShowErrors(true)
    setTimeout(() => setShowErrors(false), 1000)
  }

  const handleButtonClick = () => {
    if (!isFormValid) {
      tgVibro('error')
      triggerValidationUI()
      return
    }
    console.log('Отправка формы:', form)
  }

  return (
    <div className="flex flex-col gap-4 mt-4">
      {FORM_CONFIG.map(({ id, type, label, placeholder, props }) => {
        const Component = COMPONENT_MAP[type]
        const empty = isFieldEmpty(id)
        const hasError = empty && showErrors

        return (
          <div
            key={id}
            className="relative"
          >
            <Component
              label={
                <span className="flex items-center gap-1">
                  {label}
                  {empty && (
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full transition-all duration-300',
                        hasError
                          ? 'bg-red-500 scale-150 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                          : 'bg-bot-grey-300'
                      )}
                    />
                  )}
                </span>
              }
              placeholder={placeholder}
              value={form[id]}
              onChange={updateField(id)}
              className={cn('transition-colors duration-300')}
              {...props}
            />
          </div>
        )
      })}

      <div className="mt-8 flex flex-col gap-2">
        <motion.div
          animate={
            showErrors && !isFormValid ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }
          }
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <CreateButton
            className={cn(
              'w-full transition-all duration-300 active:scale-[0.98]',
              !isFormValid
                ? 'opacity-80 saturate-50 shadow-none'
                : 'shadow-lg shadow-bot-primary/20'
            )}
            onClick={handleButtonClick}
          >
            {isFormValid ? 'Создать игру' : 'Заполните все поля'}
          </CreateButton>
        </motion.div>

        <Button
          variant="danger"
          className="w-full"
          onClick={onCancel}
        >
          <Trash2 className="w-4 h-4" />
          Отмена
        </Button>
      </div>
    </div>
  )
}
