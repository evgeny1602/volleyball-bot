import { Loader } from '@/ui/Loader'
import { useState } from 'react'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useUser } from '@/hooks/useUser'
import { RegisterForm } from '@/ui/RegisterForm'
import { RegisterWelcome } from '@/ui/RegisterWelcome'
import { RegisterError } from '@/ui/RegisterError'

export const RegisterPage = ({ onRegistered }) => {
  const { tgUserData } = useTelegramUser()
  const { createUser, userIsLoading } = useUser()

  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleRegisterSubmit = async (formData) => {
    const response = await createUser({
      tg_id: tgUserData.id,
      tg_username: tgUserData.username,
      tg_avatar_url: tgUserData.photo_url,
      ...formData,
    })

    if (response.status === 201) {
      onRegistered()
    }
  }

  if (userIsLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col items-center gap-20 pt-5 relative">
      <RegisterWelcome />

      <RegisterForm
        isLoading={userIsLoading}
        onSubmit={handleRegisterSubmit}
        onError={() => setIsErrorVisible(true)}
      />

      <RegisterError
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </div>
  )
}
