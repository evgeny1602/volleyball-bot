import { UserAvatar } from '@/ui/UserAvatar'
import { Button } from '@/ui/Button'
import { useUser } from '@/hooks/useUser'
import { tgConfirm } from '@/utils/telegram'

export const UserCard = ({ user }) => {
  const { rejectUser, approveUser, deleteUser, getUsers, userIsLoading } =
    useUser()

  const handleApproveUser = async () => {
    const res = await approveUser(user.tg_id)
    if (res?.success) {
      await getUsers()
    }
  }

  const handleRejectUser = async () => {
    const isConfirmed = await tgConfirm(
      'Вы уверены, что хотите отклонить пользователя?'
    )
    console.log({ isConfirmed })

    // const res = await rejectUser(user.tg_id)
    // if (res?.success) {
    //   await getUsers()
    // }
  }

  const handleDeleteUser = async () => {
    const res = await deleteUser(user.tg_id)
    if (res?.success) {
      await getUsers()
    }
  }

  return (
    <div className="text-bot-grey-800 flex flex-col gap-4 w-full">
      <div className="flex flex-row items-center gap-2">
        <UserAvatar url={user.tg_avatar_url} />
        <p>{user.tg_username || 'ID: ' + user.tg_id}</p>
      </div>

      <div className="flex flex-row gap-2">
        {user.role === 'player' && user.status === 'registered' && (
          <>
            <Button
              variant="success"
              className="w-full"
              onClick={handleApproveUser}
              disabled={userIsLoading}
            >
              Одобрить
            </Button>
            <Button
              className="w-full"
              variant="danger"
              onClick={handleRejectUser}
              disabled={userIsLoading}
            >
              Отклонить
            </Button>
          </>
        )}

        {user.role === 'player' && user.status === 'approved' && (
          <Button
            className="w-full"
            variant="danger"
            onClick={handleDeleteUser}
            disabled={userIsLoading}
          >
            Удалить
          </Button>
        )}
      </div>
    </div>
  )
}
