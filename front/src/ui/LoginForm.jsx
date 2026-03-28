import { useState } from 'react'
import { PhoneInput } from '@/ui/PhoneInput'
import { PasswordInput } from '@/ui/PasswordInput'
import { CheckInput } from '@/ui/CheckInput'
import { RegisterButton } from '@/ui/buttons/RegisterButton'
import { loginSchema } from '@/utils/validations'
import { tgVibro } from '@/utils/telegram'
import { ErrorBubble } from '@/ui/ErrorBubble'

export const LoginForm = ({ onSubmit, isLoading }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleAction = () => {
    const result = loginSchema.safeParse({ phone, password })

    if (result.success) {
      tgVibro('success')
      onSubmit({ phone, password, rememberMe })
    } else {
      tgVibro('error')
      setIsErrorVisible(true)
    }
  }

  return (
    <>
      <div className="text-center w-full flex flex-col gap-4 dark:text-gray-400">
        <p className="font-semibold">Приветствуем! ✌️</p>
        <p>Введи свои номер телефона и пароль — и полетели! 🚀</p>
        <p>Не помнишь свой пароль? Пиши админам. 😎</p>
        <p>Не помнишь свой номер телефона? Тебе вообще не к нам... 🤪</p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <PhoneInput
          label="Номер телефона"
          onChange={(val) => setPhone(val)}
          value={phone}
        />

        <PasswordInput
          label="Пароль"
          onChange={(val) => setPassword(val)}
          value={password}
        />

        <CheckInput
          label="Запомнить меня на неделю"
          checked={rememberMe}
          onChange={(newVal) => setRememberMe(newVal)}
        />

        <RegisterButton
          isLoading={isLoading}
          className="mt-5 mb-5"
          onClick={handleAction}
        >
          Войти
        </RegisterButton>
      </div>

      {isErrorVisible && (
        <ErrorBubble
          onClose={() => setIsErrorVisible(false)}
          durationMs={3000}
        >
          Телефон или пароль введены неверно!
        </ErrorBubble>
      )}
    </>
  )
}
