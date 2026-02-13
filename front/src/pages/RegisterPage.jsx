import { Loader } from '@/ui/Loader'
import { useState } from 'react'
import { RegisterForm } from '@/ui/RegisterForm'
import { RegisterWelcome } from '@/ui/RegisterWelcome'
import { RegisterError } from '@/ui/RegisterError'
import { useCurrentUser, useUserMutations } from '@/hooks/users'

export const RegisterPage = () => {
  const { tgUser, isLoading } = useCurrentUser()
  const { createUser, isPending } = useUserMutations()

  const [isErrorVisible, setIsErrorVisible] = useState(false)

  const handleCreateUser = async (formData) => {
    await createUser({
      ...formData,
      tg_id: tgUser.id,
      tg_username: tgUser.username,
      tg_avatar_url: tgUser.photo_url,
    })
  }

  if (isLoading || isPending) {
    return <Loader />
  }

  return (
    <div className="flex flex-col items-center gap-20 pt-5 relative">
      <RegisterWelcome />

      <RegisterForm
        isLoading={isLoading || isPending}
        onSubmit={handleCreateUser}
        onError={() => setIsErrorVisible(true)}
      />

      <RegisterError
        isVisible={isErrorVisible}
        onClose={() => setIsErrorVisible(false)}
      />
    </div>
  )
}
