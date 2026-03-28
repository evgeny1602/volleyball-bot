import { useState } from 'react'
import { Loader } from '@/ui/Loader'
import { RegisterForm } from '@/ui/RegisterForm'
import { LoginForm } from '@/ui/LoginForm'
import { useCurrentUser, useUserMutations } from '@/hooks/users'
import { ErrorBubble } from '@/ui/ErrorBubble'
import { BaseRadio } from '@/ui/BaseRadio'
import { LogIn, UserRoundPen } from 'lucide-react'

export const RegisterPage = () => {
  const { tgUser, isLoading } = useCurrentUser()
  const { createUser, login, getUserByPhone, isPending } = useUserMutations()

  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [activeForm, setActiveForm] = useState('login')

  const handleCreateUser = async (formData) => {
    if (!formData.phone) {
      setErrorText('Введите телефон!')
      setIsErrorVisible(true)
      return
    }

    const data = await getUserByPhone(formData.phone)

    if (data.exists) {
      setErrorText('Пользователь с таким номером телефона уже существует!')
      setIsErrorVisible(true)
      return
    }

    const resp = await createUser({
      ...formData,
      tg_id: tgUser.id,
      tg_username: tgUser.username,
      tg_avatar_url: tgUser.photo_url,
    })

    if (resp.success) {
      window.location.reload()
    }
  }

  const handleLogin = async (formData) => {
    try {
      const resp = await login(formData)

      if (resp.success) {
        window.location.reload()
      }
    } catch (err) {
      setErrorText('Телефон или пароль введены неверно!')
      setIsErrorVisible(true)
    }
  }

  if (isLoading || isPending) {
    return <Loader />
  }

  return (
    <div className="flex flex-col items-center gap-5 pt-5 relative">
      <BaseRadio
        value={activeForm}
        onChange={(formId) => setActiveForm(formId)}
        options={[
          { id: 'login', label: 'Вход', Icon: LogIn },
          { id: 'register', label: 'Регистрация', Icon: UserRoundPen },
        ]}
        layoutId="form-radio"
        className="mb-10"
      />

      {activeForm == 'register' && (
        <RegisterForm
          isLoading={isLoading || isPending}
          onSubmit={handleCreateUser}
        />
      )}

      {activeForm == 'login' && (
        <LoginForm
          isLoading={isLoading || isPending}
          onSubmit={handleLogin}
        />
      )}

      {isErrorVisible && (
        <ErrorBubble
          onClose={() => setIsErrorVisible(false)}
          durationMs={3000}
        >
          {errorText}
        </ErrorBubble>
      )}
    </div>
  )
}
