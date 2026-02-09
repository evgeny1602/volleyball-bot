import { RegisterPage } from '@/pages/RegisterPage'
import { RegisteredPage } from '@/pages/RegisteredPage'
import { RejectedPage } from '@/pages/RejectedPage'
import { MainPage } from '@/pages/MainPage'
import { Loader } from '@/ui/Loader'
import { useUser } from '@/hooks/useUser'

export const App = () => {
  const { user, getTgCurrentUser, userIsLoading } = useUser()

  return (
    <div className="flex flex-col min-h-screen gap-2 select-none items-center bg-bot-page-bg text-bot-grey-800">
      {userIsLoading && <Loader />}

      {!userIsLoading && !user && (
        <RegisterPage onRegistered={async () => await getTgCurrentUser()} />
      )}
      {user?.status == 'registered' && <RegisteredPage />}
      {user?.status == 'approved' && <MainPage />}
      {user?.status == 'rejected' && <RejectedPage />}
    </div>
  )
}
