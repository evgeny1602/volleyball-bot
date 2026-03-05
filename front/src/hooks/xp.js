import { useQuery, useQueryClient } from '@tanstack/react-query'
import { xpApi } from '@/api/xpApi'

const MIN_XP_FOR_RESPECT = 25

export const XP_KEYS = {
  all: ['xp'],
  detail: (userId) => ['xp', userId],
}

export const useUserXp = (userId) => {
  return useQuery({
    queryKey: XP_KEYS.detail(userId),
    queryFn: () => xpApi.getByUserId(userId),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000,
  })
}

export const useXp = (userId) => {
  const query = useUserXp(userId)

  return {
    ...query,
    xpBalance: query.data?.xpBalance || 0,
    stats: query.data?.stats || null,
    isEnoughXp: (query.data?.xpBalance || 0) >= MIN_XP_FOR_RESPECT,
    rank: query.data?.rank || null,
    nextRank: query.data?.nextRank || null,
  }
}

export const useXpActions = () => {
  const queryClient = useQueryClient()

  const invalidateXp = (userId) => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: XP_KEYS.detail(userId) })
    } else {
      queryClient.invalidateQueries({ queryKey: XP_KEYS.all })
    }
  }

  return {
    invalidateXp,
  }
}
