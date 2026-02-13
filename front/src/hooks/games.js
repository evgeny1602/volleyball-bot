import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gamesApi } from '@/api/games'

export const GAME_KEYS = {
  all: ['games'],
  detail: (id) => ['games', id],
}

export const useGames = () => {
  return useQuery({
    queryKey: GAME_KEYS.all,
    queryFn: gamesApi.getAll,
  })
}

export const useGame = (id) => {
  return useQuery({
    queryKey: GAME_KEYS.detail(id),
    queryFn: () => gamesApi.getById(id),
    enabled: !!id,
  })
}

export const useGameActions = (gameId) => {
  const queryClient = useQueryClient()

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: GAME_KEYS.all })
    if (gameId) {
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.detail(gameId) })
    }
  }

  const joinMutation = useMutation({
    mutationFn: gamesApi.join,
    onSuccess: refresh,
  })

  const promoteMutation = useMutation({
    mutationFn: gamesApi.promote,
    onSuccess: refresh,
  })

  const leaveMutation = useMutation({
    mutationFn: gamesApi.leave,
    onSuccess: refresh,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => gamesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: GAME_KEYS.detail(variables.id),
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => gamesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.all })
    },
  })

  const createMutation = useMutation({
    mutationFn: (gameData) => gamesApi.create(gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GAME_KEYS.all })
    },
  })

  return {
    createGame: createMutation.mutateAsync,
    join: joinMutation.mutateAsync,
    leave: leaveMutation.mutateAsync,
    promote: promoteMutation.mutateAsync,
    updateGame: updateMutation.mutateAsync,
    deleteGame: deleteMutation.mutateAsync,
    isPending:
      createMutation.isPending ||
      joinMutation.isPending ||
      leaveMutation.isPending ||
      promoteMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  }
}
