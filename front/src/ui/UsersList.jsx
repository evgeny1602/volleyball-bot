import { useUser } from '@/hooks/useUsers'
import { useEffect } from 'react'
import { UserCard } from '@/ui/UserCard'
import { Loader } from '@/ui/Loader'

export const UsersList = ({ statuses }) => {
  const { users, getUsers, userIsLoading } = useUser()

  useEffect(() => {
    const initList = async () => {
      await getUsers()
    }

    initList()
  }, [])

  if (userIsLoading) return <Loader variant="small" />

  return (
    <div className="divide-y divide-bot-grey-300">
      {users
        .filter((user) => statuses.includes(user.status))
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
