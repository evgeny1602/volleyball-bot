import { RegisterPage } from '@/pages/RegisterPage'
import { RegisteredPage } from '@/pages/RegisteredPage'
import { RejectedPage } from '@/pages/RejectedPage'
import { MainPage } from '@/pages/MainPage'
import { Loader } from '@/ui/Loader'
import { useCurrentUser } from '@/hooks/users'

export const App = () => {
  const { user, isLoading } = useCurrentUser()

  return (
    <div className="flex flex-col min-h-screen gap-2 select-none items-center bg-bot-page-bg text-bot-grey-800">
      {isLoading && <Loader />}
      {!isLoading && !user && <RegisterPage />}
      {user?.status == 'registered' && <RegisteredPage />}
      {user?.status == 'approved' && <MainPage />}
      {user?.status == 'rejected' && <RejectedPage />}
    </div>
  )
}
