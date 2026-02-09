import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { UserCard } from '@/ui/UserCard'
import { Loader } from '@/ui/Loader'

const dispayStatuses = [
  'registered',
  'approved',
  // 'rejected'
]

export const UsersList = () => {
  const { users, getUsers, userIsLoading } = useUser()

  useEffect(() => {
    const initList = async () => {
      await getUsers()
    }

    initList()
  }, [])

  const handleUserChange = async () => {
    await getUsers()
  }

  if (userIsLoading) return <Loader />

  return (
    <div className="divide-y divide-bot-grey-300 max-h-[90vh] overflow-y-auto">
      {users
        .filter((user) => dispayStatuses.includes(user.status))
        .map((user) => (
          <div
            key={user.id}
            className="pt-4 pb-4 last:pb-0"
          >
            <UserCard
              user={user}
              onUserChange={handleUserChange}
            />
          </div>
        ))}
    </div>
  )
}
