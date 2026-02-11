import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod' // Импортируем zod
import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { TimeInput } from '@/ui/TimeInput'
import { QuantityInput } from '@/ui/QuantityInput'
import { TextInput } from '@/ui/TextInput'
import { MoneyInput } from '@/ui/MoneyInput'
import { CreateButton } from '@/ui/buttons/CreateButton'
import { cn } from '@/utils/cn'
import { tgAlert, tgVibro } from '@/utils/telegram'
import { Button } from '@/ui/Button'
import { Trash2, CircleX } from 'lucide-react'
import { useGame } from '@/hooks/useGame'

// 1. Описываем схему валидации
const gameSchema = z.object({
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

const COMPONENT_MAP = {
  input: Input,
  date: DateInput,
  time: TimeInput,
  quantity: QuantityInput,
  textarea: TextInput,
  money: MoneyInput,
}

const FORM_CONFIG = [
  { id: 'name', type: 'input', label: 'Название игры' },
  { id: 'location', type: 'input', label: 'Место' },
  { id: 'address', type: 'input', label: 'Адрес' },
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
  const [errors, setErrors] = useState({}) // Храним ошибки здесь
  const [showErrors, setShowErrors] = useState(false)
  const { createGame } = useGame()

  const updateField = (field) => (value) => {
    // Приводим к числу для zod, если поле числовое
    const numericFields = ['duration', 'price', 'maxPlayers']
    const finalValue = numericFields.includes(field) ? Number(value) : value

    setForm((prev) => ({ ...prev, [field]: finalValue }))
    // Очищаем ошибку поля при вводе
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  // 2. Валидация через useMemo
  const validationResult = useMemo(() => {
    return gameSchema.safeParse(form)
  }, [form])

  const isFormValid = validationResult.success

  const handleCreateButtonClick = async () => {
    if (!validationResult.success) {
      tgVibro('error')

      // Превращаем ошибки zod в удобный объект { field: message }
      const formattedErrors = {}
      validationResult.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message
      })

      setErrors(formattedErrors)
      setShowErrors(true)

      // Скрываем красные точки через секунду, но тексты ошибок оставляем до исправления
      setTimeout(() => setShowErrors(false), 2000)
      return
    }

    const isSuccess = await createGame(form)
    if (isSuccess) {
      tgAlert('Игра успешно создана')
      setForm(INITIAL_STATE)
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-4 mb-10">
      {FORM_CONFIG.map(({ id, type, label, placeholder, props }) => {
        const Component = COMPONENT_MAP[type]
        const fieldError = errors[id]
        const hasError = fieldError && showErrors

        return (
          <div
            key={id}
            className="relative flex flex-col gap-1"
          >
            <Component
              label={
                <span className="flex items-center gap-2">
                  {label}
                  {fieldError && (
                    <span
                      className={cn(
                        'text-[10px] font-medium px-2 py-0.5 rounded-full transition-all duration-300',
                        hasError
                          ? 'bg-red-500 text-white'
                          : 'bg-red-100 text-red-500'
                      )}
                    >
                      {fieldError}
                    </span>
                  )}
                </span>
              }
              placeholder={placeholder}
              value={form[id]}
              onChange={updateField(id)}
              className={cn(fieldError && 'border-red-300')}
              {...props}
            />
          </div>
        )
      })}

      <div className="mt-8 flex flex-col gap-4">
        <motion.div
          animate={
            showErrors && !isFormValid ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          <CreateButton
            className={cn(
              'w-full transition-all duration-300',
              !isFormValid
                ? 'opacity-70 saturate-50'
                : 'shadow-lg shadow-bot-primary/20'
            )}
            onClick={handleCreateButtonClick}
          >
            {isFormValid ? 'Создать игру' : 'Проверьте ошибки'}
          </CreateButton>
        </motion.div>

        <Button
          variant="danger"
          className="w-full"
          onClick={() => setForm(INITIAL_STATE)}
        >
          <Trash2 className="w-4 h-4" /> Очистить
        </Button>

        <Button
          variant="danger"
          className="w-full"
          onClick={onCancel}
        >
          <CircleX className="w-4 h-4" /> Отмена
        </Button>
      </div>
    </div>
  )
}
