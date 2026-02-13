import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/api/users'
import { tgGetUser } from '@/utils/telegram'

export const USER_KEYS = {
  all: ['users'],
  detail: (tgId) => ['users', tgId],
}

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
    user: query.data?.user || null,
    tgUser,
  }
}

export const useUsers = () => {
  return useQuery({
    queryKey: USER_KEYS.all,
    queryFn: usersApi.getAll,
  })
}

export const useUser = (tgId) => {
  return useQuery({
    queryKey: USER_KEYS.detail(tgId),
    queryFn: () => usersApi.getByTgId(tgId),
    enabled: !!tgId,
  })
}

export const useUserMutations = () => {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: USER_KEYS.all })
  }

  const createMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: invalidate,
  })

  const approveMutation = useMutation({
    mutationFn: usersApi.approve,
    onSuccess: (_, tgId) => {
      invalidate()
      queryClient.invalidateQueries({ queryKey: USER_KEYS.detail(tgId) })
    },
  })

  const rejectMutation = useMutation({
    mutationFn: usersApi.reject,
    onSuccess: invalidate,
  })

  const deleteMutation = useMutation({
    mutationFn: usersApi.delete,
    onSuccess: invalidate,
  })

  const createGuestMutation = useMutation({
    mutationFn: usersApi.createGuest,
    onSuccess: invalidate,
  })

  return {
    createUser: createMutation.mutateAsync,
    approveUser: approveMutation.mutateAsync,
    rejectUser: rejectMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    createGuest: createGuestMutation.mutateAsync,
    isPending:
      createMutation.isPending ||
      approveMutation.isPending ||
      deleteMutation.isPending,
  }
}
