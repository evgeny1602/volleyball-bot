import { api } from './init'

export const gamesApi = {
  getAll: async () => {
    const { data } = await api.get('/games')
    return data
  },

  getById: async (id) => {
    const { data } = await api.get(`/games/${id}`)
    return data
  },

  create: async (gameData) => {
    const { data } = await api.post('/games', gameData)
    return data
  },

  update: async (id, gameData) => {
    const { data } = await api.put(`/games/${id}`, gameData)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`/games/${id}`)
    return data
  },

  join: async ({ gameId, userId }) => {
    const { data } = await api.post(`/games/${gameId}/join`, {
      user_id: userId,
    })
    return data
  },

  leave: async ({ gameId, userId }) => {
    const { data } = await api.post(`/games/${gameId}/leave`, {
      user_id: userId,
    })
    return data
  },

  promote: async ({ gameId, userId }) => {
    const { data } = await api.post(`/games/${gameId}/promote`, {
      user_id: userId,
    })
    return data
  },
}
