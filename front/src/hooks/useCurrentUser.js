import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/api/users'
import { tgGetUser } from '@/utils/telegram'

export const useCurrentUser = () => {
  const tgUser = tgGetUser()
  const tgId = tgUser.id

  const query = useQuery({
    queryKey: ['users', 'me', tgId],
    queryFn: () => usersApi.getByTgId(tgId),
    enabled: !!tgId,
    staleTime: 5 * 60 * 1000,
  })

  return {
    ...query,
    user: query.data,
    tgUser,
  }
}
