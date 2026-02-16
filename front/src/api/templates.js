import { api } from './init'

const BASE_PATH = '/templates'

export const templatesApi = {
  getAll: async () => {
    const { data } = await api.get(BASE_PATH)
    return data
  },

  getById: async (id) => {
    const { data } = await api.get(`${BASE_PATH}/${id}`)
    return data
  },

  create: async (templateData) => {
    const { data } = await api.post(BASE_PATH, templateData)
    return data
  },

  update: async (id, templateData) => {
    const { data } = await api.put(`${BASE_PATH}/${id}`, templateData)
    return data
  },

  delete: async (id) => {
    const { data } = await api.delete(`${BASE_PATH}/${id}`)
    return data
  },
}
