import { UsersList } from '@/ui/UsersList'
import { Input } from '@/ui/Input'
import { useState } from 'react'
import { useUsers } from '@/hooks/users'

export const UsersListFiltered = ({ statuses }) => {
  const { data, isLoading } = useUsers()
  const [fioFilter, setFioFilter] = useState('')

  const users = data?.data
    .filter((user) => statuses.includes(user.status))
    .filter((user) => user.fio.toLowerCase().includes(fioFilter))

  return (
    <>
      <Input
        label="Фильтр"
        value={fioFilter}
        onChange={(val) => setFioFilter(val)}
      />

      <UsersList
        isLoading={isLoading}
        users={users}
      />
    </>
  )
}
