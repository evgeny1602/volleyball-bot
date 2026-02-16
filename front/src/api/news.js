import { api } from './init'

const BASE_PATH = '/news'

export const newsApi = {
  getAll: async () => {
    const { data } = await api.get(BASE_PATH)
    return data
  },

  getById: async (id) => {
    const { data } = await api.get(`${BASE_PATH}/${id}`)
    return data
  },

  create: async (newData) => {
    const { data } = await api.post(BASE_PATH, newData)
    return data
  },

  update: async (id, newData) => {
    const { data } = await api.put(`${BASE_PATH}/${id}`, newData)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`${BASE_PATH}/${id}`)
    return data
  },
}
