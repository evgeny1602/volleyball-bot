import { getUsers } from '@/api/user'
import { useEffect, useState } from 'react'
import { Loader } from '@/ui/Loader'
import { Button } from '@/ui/Button'
import { CircleX } from 'lucide-react'
import { tgVibro } from '@/utils/telegram'

const UserAvatar = ({ url }) => {
  return (
    <img
      src={url}
      className="w-16 h-16 rounded-[50%]"
    />
  )
}

const UserCard = ({ user }) => {
  return (
    <div
      key={user.id}
      className="text-bot-grey-800 flex flex-col gap-4 w-full"
    >
      <div className="flex flex-row items-center gap-2">
        <UserAvatar url={user.tg_avatar_url} />

        <p>{user.tg_username}</p>
      </div>

      <div className="flex flex-row gap-2">
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
      </div>
    </div>
  )
}

const UsersList = ({ users }) => {
  return (
    <div className="divide-y divide-bot-grey-300 max-h-[80vh] overflow-y-auto">
      {users.map((user) => (
        <div className="pt-4 pb-4 last:pb-0">
          <UserCard user={user} />
        </div>
      ))}
    </div>
  )
}

const ModalHeader = ({ children, onClose }) => {
  const handleClick = () => {
    tgVibro('medium')

    if (onClose) onClose()
  }

  return (
    <div className="border-b border-dashed border-bot-grey-500 flex flex-row items-center justify-between pb-2">
      <div className="text-black font-bold text-lg">{children}</div>
      <CircleX
        className="text-bot-primary w-5 cursor-pointer active:scale-80 transition-transform"
        onClick={handleClick}
      />
    </div>
  )
}

const ModalWrapper = ({ children }) => {
  return (
    <div className="w-full p-4 flex flex-col bg-white rounded-3xl shadow-sm">
      {children}
    </div>
  )
}

const ModalOverlay = ({ children }) => {
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center h-dvh bg-white/5 backdrop-blur-md z-1 absolute top-0 left-0">
      {children}
    </div>
  )
}

const UsersListModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)

      const data = await getUsers()

      console.log(data)

      if (data.success) {
        setUsers(data.data)
      }

      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  if (!isOpen) return null

  if (isLoading) return <Loader />

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalHeader onClose={onClose}>Игроки</ModalHeader>
        <UsersList users={users} />
      </ModalWrapper>
    </ModalOverlay>
  )
}

export const AdminTab = () => {
  const [isUsersListModalOpen, setIsUsersListModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-dvh items-center justify-center w-full p-4 relative">
      <Button
        className="w-full"
        onClick={() => setIsUsersListModalOpen(true)}
      >
        Игроки
      </Button>

      <UsersListModal
        isOpen={isUsersListModalOpen}
        onClose={() => setIsUsersListModalOpen(false)}
      />
    </div>
  )
}
