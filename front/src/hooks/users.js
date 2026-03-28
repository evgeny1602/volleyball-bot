import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/api/users'
import { tgGetUser, setCookieTgId } from '@/utils/telegram'

export const USER_KEYS = {
  all: ['users'],
  detail: (tgId) => ['users', tgId],
  byPhone: (phone) => ['users', 'by_phone', phone],
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

  const getUserByPhoneMutation = useMutation({
    mutationFn: usersApi.getByPhone,
    onSuccess: (data, phone) => {
      if (data?.user) {
        queryClient.setQueryData(USER_KEYS.byPhone(phone), data)
      }
    },
  })

  const loginMutation = useMutation({
    mutationFn: usersApi.login,
    onSuccess: (data) => {
      if (data.success && data.user?.tg_id) {
        setCookieTgId(data.user.tg_id)
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
        invalidate()
      }
    },
  })

  const createMutation = useMutation({
    mutationFn: usersApi.create,
    onSuccess: (data) => {
      if (data.success && data.tgId) {
        queryClient.invalidateQueries({ queryKey: ['users', 'me'] })
        setCookieTgId(data.tgId)
        invalidate()
      }
    },
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

  const generatePasswordMutation = useMutation({
    mutationFn: usersApi.generatePassword,
    onSuccess: invalidate,
  })

  const createGuestMutation = useMutation({
    mutationFn: usersApi.createGuest,
    onSuccess: invalidate,
  })

  return {
    login: loginMutation.mutateAsync,
    createUser: createMutation.mutateAsync,
    approveUser: approveMutation.mutateAsync,
    rejectUser: rejectMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    createGuest: createGuestMutation.mutateAsync,
    generatePassword: generatePasswordMutation.mutateAsync,
    getUserByPhone: getUserByPhoneMutation.mutateAsync,
    isPending:
      loginMutation.isPending ||
      createMutation.isPending ||
      approveMutation.isPending ||
      deleteMutation.isPending ||
      generatePasswordMutation.isPending ||
      getUserByPhoneMutation.isPending,
  }
}
