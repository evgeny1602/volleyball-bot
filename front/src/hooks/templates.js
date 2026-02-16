import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { templatesApi } from '@/api/templates'

export const TEMPLATE_KEYS = {
  all: ['templates'],
  detail: (id) => ['templates', id],
}

export const useTemplates = () => {
  return useQuery({
    queryKey: TEMPLATE_KEYS.all,
    queryFn: templatesApi.getAll,
  })
}

export const useTemplate = (id) => {
  return useQuery({
    queryKey: TEMPLATE_KEYS.detail(id),
    queryFn: () => templatesApi.getById(id),
    enabled: !!id,
  })
}

export const useTemplateMutations = (templateId) => {
  const queryClient = useQueryClient()

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all })
    if (templateId) {
      queryClient.invalidateQueries({
        queryKey: TEMPLATE_KEYS.detail(templateId),
      })
    }
  }

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => templatesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all })
      queryClient.invalidateQueries({
        queryKey: TEMPLATE_KEYS.detail(variables.id),
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => templatesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all })
    },
  })

  const createMutation = useMutation({
    mutationFn: (gameData) => templatesApi.create(gameData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_KEYS.all })
    },
  })

  return {
    createTemplate: createMutation.mutateAsync,
    updateTemplate: updateMutation.mutateAsync,
    deleteTemplate: deleteMutation.mutateAsync,
    isPending:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  }
}
