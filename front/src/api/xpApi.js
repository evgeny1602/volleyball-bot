import { api } from './init'

const BASE_PATH = '/xp'

export const xpApi = {
  getByUserId: async (userId) => {
    const { data } = await api.get(`${BASE_PATH}/${userId}`)
    return data
  },
}
