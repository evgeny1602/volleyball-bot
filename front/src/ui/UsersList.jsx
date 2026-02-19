import { UserCard } from '@/ui/UserCard'
import { Loader } from '@/ui/Loader'
import { useUsers } from '@/hooks/users'

export const UsersList = ({ statuses }) => {
  const { data, isLoading } = useUsers()

  if (isLoading) return <Loader variant="small" />

  return (
    <div className="divide-y divide-gray-300">
      {data?.data
        .filter((user) => statuses.includes(user.status))
        .map((user) => (
          <UserCard
            key={user.id}
            className="pt-4 pb-4 last:pb-0"
            user={user}
          />
        ))}
    </div>
  )
}
