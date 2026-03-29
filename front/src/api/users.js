import { api } from './init'

const prefix = '/users'

export const usersApi = {
  login: async (credentials) => {
    const { data } = await api.post(`${prefix}/login`, credentials)
    return data
  },

  setAvatar: async ({ tgId, filename }) => {
    if (!tgId) {
      return null
    }

    if (!filename) {
      return null
    }

    const { data } = await api.post(`${prefix}/set_avatar`, { tgId, filename })
    return data
  },

  getByTgId: async (tgId) => {
    const { data } = await api.get(`${prefix}/${tgId}`)
    return data
  },

  getByPhone: async (phone) => {
    const { data } = await api.get(`${prefix}/by_phone/${phone}`)
    return data
  },

  create: async (userData) => {
    const { data } = await api.post(prefix, userData)
    return data
  },

  getAll: async () => {
    const { data } = await api.get(prefix)
    return data
  },

  approve: async (tgId) => {
    const { data } = await api.patch(`${prefix}/approve/${tgId}`)
    return data
  },

  reject: async (tgId) => {
    const { data } = await api.patch(`${prefix}/reject/${tgId}`)
    return data
  },

  delete: async (tgId) => {
    const { data } = await api.delete(`${prefix}/${tgId}`)
    return data
  },

  createGuest: async (fio) => {
    const { data } = await api.post(`${prefix}/guest`, { fio })
    return data
  },

  generatePasswords: async () => {
    const { data } = await api.get(`${prefix}/gen_psws`)
    return data
  },

  generatePassword: async (tgId) => {
    const { data } = await api.get(`${prefix}/gen_psw/${tgId}`)
    return data
  },
}
