import { api } from './init'

const BASE_PATH = '/games'

export const gamesApi = {
  getAll: async () => {
    const { data } = await api.get(BASE_PATH)
    return data
  },

  getById: async (id) => {
    const { data } = await api.get(`${BASE_PATH}/${id}`)
    return data
  },

  create: async (gameData) => {
    const { data } = await api.post(BASE_PATH, gameData)
    return data
  },

  update: async (id, gameData) => {
    const { data } = await api.put(`${BASE_PATH}/${id}`, gameData)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`${BASE_PATH}/${id}`)
    return data
  },

  join: async ({ gameId, userId }) => {
    const { data } = await api.post(`${BASE_PATH}/${gameId}/join`, {
      user_id: userId,
    })
    return data
  },

  leave: async ({ gameId, userId }) => {
    const { data } = await api.post(`${BASE_PATH}/${gameId}/leave`, {
      user_id: userId,
    })
    return data
  },

  promote: async ({ gameId, userId }) => {
    const { data } = await api.post(`${BASE_PATH}/${gameId}/promote`, {
      user_id: userId,
    })
    return data
  },
}
