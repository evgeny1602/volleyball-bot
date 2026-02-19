import { UserCard } from '@/ui/UserCard'
import { Loader } from '@/ui/Loader'
import { useUsers } from '@/hooks/users'

export const UsersList = ({ statuses }) => {
  const { data, isLoading } = useUsers()

  if (isLoading) return <Loader variant="small" />

  const usersToDisplay = data?.data.filter((user) =>
    statuses.includes(user.status)
  )

  return (
    <>
      <div className="w-full flex flex-col items-center -mt-1 mb-4">
        <span className="bg-white dark:bg-gray-800 px-2 text-center text-gray-600 dark:text-gray-400 text-xs -mb-2 z-1">
          Количество: {usersToDisplay.length}
        </span>
      </div>

      <div className="divide-y divide-gray-300">
        {usersToDisplay.map((user) => (
          <UserCard
            key={user.id}
            className="pt-4 pb-4 last:pb-0"
            user={user}
          />
        ))}
      </div>
    </>
  )
}
