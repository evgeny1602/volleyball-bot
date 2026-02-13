import { api } from './init'

export const usersApi = {
  getByTgId: async (tgId) => {
    const { data } = await api.get(`/users/${tgId}`)
    return data
  },

  create: async (userData) => {
    const { data } = await api.post('/users', userData)
    return data
  },

  getAll: async () => {
    const { data } = await api.get('/users')
    return data
  },

  approve: async (tgId) => {
    const { data } = await api.patch(`/users/approve/${tgId}`)
    return data
  },

  reject: async (tgId) => {
    const { data } = await api.patch(`/users/reject/${tgId}`)
    return data
  },

  delete: async (tgId) => {
    const { data } = await api.delete(`/users/${tgId}`)
    return data
  },

  createGuest: async (fio) => {
    const { data } = await api.post('/users/guest', { fio })
    return data
  },
}
