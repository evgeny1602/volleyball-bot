import { api } from './init'

const BASE_PATH = '/thanks'

export const thanksApi = {
  getAll: async () => {
    const { data } = await api.get(`${BASE_PATH}/all`)
    return data
  },

  getRest: async (gameId, fromUserId, toUserId) => {
    const { data } = await api.get(
      `${BASE_PATH}/rest/${gameId}/${fromUserId}/${toUserId}`
    )
    return data
  },

  add: async (payload) => {
    const { data } = await api.post(BASE_PATH, payload)
    return data
  },

  getUserThanks: async (toUserId) => {
    const { data } = await api.get(`${BASE_PATH}/${toUserId}`)
    return data
  },

  getGiven: async (gameId, fromUserId, toUserId) => {
    const { data } = await api.get(
      `${BASE_PATH}/given/${gameId}/${fromUserId}/${toUserId}`
    )
    return data
  },
}
