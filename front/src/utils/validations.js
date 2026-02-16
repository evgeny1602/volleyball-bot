import { z } from 'zod'

export const registerSchema = z.object({
  fio: z.string().min(3, 'ФИО слишком короткое').max(50),
  gender: z.enum(['male', 'female']),
  birthday: z.string().regex(/^\d{2}.\d{2}.\d{4}$/, 'Неверный формат даты'),
  phone: z.string().regex(/^7\d{10}$/, 'Неверный номер телефона'),
})

export const gameSchema = z.object({
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

export const templateSchema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
})
