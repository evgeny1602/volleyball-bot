import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { thanksApi } from '@/api/thanks'
import { XP_KEYS } from '@/hooks/xp'

export const THANKS_KEYS = {
  all: ['thanks'],
  rest: (gameId, fromUserId, toUserId) => [
    'thanks',
    'rest',
    gameId,
    fromUserId,
    toUserId,
  ],
  user: (toUserId) => ['thanks', 'user', toUserId],
  given: (gameId, fromUserId, toUserId) => [
    'thanks',
    'given',
    gameId,
    fromUserId,
    toUserId,
  ],
}

export const useRestThanks = (gameId, fromUserId, toUserId) => {
  return useQuery({
    queryKey: THANKS_KEYS.rest(gameId, fromUserId, toUserId),
    queryFn: () => thanksApi.getRest(gameId, fromUserId, toUserId),
    enabled: !!gameId && !!fromUserId && !!toUserId,
  })
}

export const useUserThanks = (toUserId) => {
  return useQuery({
    queryKey: THANKS_KEYS.user(toUserId),
    queryFn: () => thanksApi.getUserThanks(toUserId),
    enabled: !!toUserId,
  })
}

export const useGivenThank = (gameId, fromUserId, toUserId) => {
  return useQuery({
    queryKey: THANKS_KEYS.given(gameId, fromUserId, toUserId),
    queryFn: () => thanksApi.getGiven(gameId, fromUserId, toUserId),
    enabled: !!gameId && !!fromUserId && !!toUserId,
  })
}

export const useThanksMutations = () => {
  const queryClient = useQueryClient()

  const addThankMutation = useMutation({
    mutationFn: thanksApi.add,
    onSuccess: (_, variables) => {
      const { gameId, fromUserId, toUserId } = variables

      queryClient.invalidateQueries({
        queryKey: THANKS_KEYS.rest(gameId, fromUserId, toUserId),
      })
      queryClient.invalidateQueries({ queryKey: THANKS_KEYS.user(toUserId) })
      queryClient.invalidateQueries({
        queryKey: THANKS_KEYS.given(gameId, fromUserId, toUserId),
      })

      queryClient.invalidateQueries({ queryKey: XP_KEYS.detail(fromUserId) })

      queryClient.invalidateQueries({ queryKey: XP_KEYS.detail(toUserId) })
    },
  })

  return {
    addThank: addThankMutation.mutateAsync,
    isPending: addThankMutation.isPending,
  }
}
