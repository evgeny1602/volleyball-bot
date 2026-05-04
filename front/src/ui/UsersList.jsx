import { UserCard } from '@/ui/UserCard'
import { Loader } from '@/ui/Loader'
import { cn } from '@/utils/cn'

export const UsersList = ({ users, isLoading }) => {
  if (isLoading) {
    return <Loader variant="small" />
  }

  return (
    <>
      <div className="w-full flex flex-col items-center my-4">
        <span
          className={cn(
            'bg-white dark:bg-gray-800 px-2 text-center text-gray-600',
            'dark:text-gray-400 text-xs -mb-2 z-1'
          )}
        >
          Количество: {users.length}
        </span>
      </div>

      <div className="divide-y divide-gray-300">
        {users.map((user) => (
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
