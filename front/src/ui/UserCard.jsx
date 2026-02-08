import { UserAvatar } from '@/ui/UserAvatar'
import { Button } from '@/ui/Button'

export const UserCard = ({ user }) => {
  return (
    <div className="text-bot-grey-800 flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-2">
        <UserAvatar url={user.tg_avatar_url} />

        <p>{user.tg_username}</p>
      </div>

      <div className="flex flex-row gap-2">
        {user.role == 'player' && user.status == 'registered' && (
          <>
            <Button
              variant="success"
              className="w-full"
            >
              Одобрить
            </Button>
            <Button
              className="w-full"
              variant="danger"
            >
              Отклонить
            </Button>
          </>
        )}

        {user.role == 'player' && user.status == 'approved' && (
          <Button
            className="w-full"
            variant="danger"
          >
            Удалить
          </Button>
        )}
      </div>
    </div>
  )
}
