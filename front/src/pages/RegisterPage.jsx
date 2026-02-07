import { Loader } from '@/ui/Loader'
import { useState } from 'react'
import { createUser } from '@/api/user'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { RegisterForm } from '@/ui/RegisterForm'
import { RegisterWelcome } from '@/ui/RegisterWelcome'
import { RegisterError } from '@/ui/RegisterError'

export const RegisterPage = ({ onRegistered }) => {
  const { userData } = useTelegramUser()

  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegisterSubmit = async (formData) => {
    if (!formData) {
      setIsErrorVisible(true)

      return
    }

    setIsLoading(true)

    try {
      const response = await createUser({
        tg_id: userData.id,
        tg_username: userData.username,
        tg_avatar_url: userData.photo_url,
        ...formData,
      })

      if (response.status === 201) {
        onRegistered()
      }
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col items-center gap-20 mt-5 relative">
      <RegisterWelcome />

      <RegisterForm
        onSubmit={handleRegisterSubmit}
        isLoading={isLoading}
      />

      <RegisterError
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </div>
  )
}
