import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { UserCard } from '@/ui/UserCard'
import { Loader } from '@/ui/Loader'
import { usersListDispayStatuses } from '@/config/usersListDisplayStatuses'

export const UsersList = () => {
  const { users, getUsers, userIsLoading } = useUser()

  useEffect(() => {
    const initList = async () => {
      await getUsers()
    }

    initList()
  }, [])

  if (userIsLoading) return <Loader />

  return (
    <div className="divide-y divide-bot-grey-300 max-h-[90vh] overflow-y-auto">
      {users
        .filter((user) => usersListDispayStatuses.includes(user.status))
        .map((user) => (
          <UserCard
            key={user.id}
            className="pt-4 pb-4 last:pb-0"
            user={user}
            onUserChange={async () => await getUsers()}
          />
        ))}
    </div>
  )
}
