import { Input } from '@/ui/Input'
import { DateInput } from '@/ui/DateInput'
import { TimeInput } from '@/ui/TimeInput'
import { QuantityInput } from '@/ui/QuantityInput'
import { TextInput } from '@/ui/TextInput'
import { MoneyInput } from '@/ui/MoneyInput'
import { ImageUploader } from '@/ui/ImageUploader'

export const newForm = {
  emptyFormData: {
    title: '',
    content: '',
    image_url: '',
  },

  fieldsConfig: [
    { id: 'title', type: Input, label: 'Заголовок' },
    { id: 'content', type: TextInput, label: 'Содержание' },
    { id: 'image_url', type: ImageUploader, label: 'Изображение' },
  ],
}

export const gameForm = {
  emptyFormData: {
    name: '',
    location: '',
    address: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    price: '',
    maxPlayers: '',
  },

  fieldsConfig: [
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
  ],
}
