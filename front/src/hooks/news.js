import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { newsApi } from '@/api/news'

export const NEW_KEYS = {
  all: ['news'],
  detail: (id) => ['news', id],
}

export const useNews = () => {
  return useQuery({
    queryKey: NEW_KEYS.all,
    queryFn: newsApi.getAll,
  })
}

export const useNew = (id) => {
  return useQuery({
    queryKey: NEW_KEYS.detail(id),
    queryFn: () => newsApi.getById(id),
    enabled: !!id,
  })
}

export const useNewMutations = (newId) => {
  const queryClient = useQueryClient()

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: NEW_KEYS.all })
    if (newId) {
      queryClient.invalidateQueries({
        queryKey: NEW_KEYS.detail(newId),
      })
    }
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => newsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: NEW_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: NEW_KEYS.detail(variables.id),
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => newsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEW_KEYS.all })
    },
  })

  const createMutation = useMutation({
    mutationFn: (gameData) => newsApi.create(gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEW_KEYS.all })
    },
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, enabled }) => newsApi.setStatus(id, enabled),
    onSuccess: (_, variables) => refresh(variables.id),
  })

  return {
    createNew: createMutation.mutateAsync,
    updateNew: updateMutation.mutateAsync,
    deleteNew: deleteMutation.mutateAsync,
    setNewStatus: statusMutation.mutateAsync,
    isPending:
      statusMutation.isPending ||
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  }
}
