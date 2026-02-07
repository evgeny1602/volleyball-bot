import { z } from 'zod'

export const registerSchema = z.object({
  fio: z.string().min(3, 'ФИО слишком короткое').max(50),
  gender: z.enum(['male', 'female']),
  birthday: z.string().regex(/^\d{2}.\d{2}.\d{4}$/, 'Неверный формат даты'),
  phone: z.string().regex(/^7\d{10}$/, 'Неверный номер телефона'),
})
