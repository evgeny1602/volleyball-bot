import { api } from './init'

const BASE_PATH = '/thanks'

export const thanksApi = {
  getAll: async () => {
    const { data } = await api.get(`${BASE_PATH}/all`)
    return data
  },
  /**
   * Получить типы благодарностей, которые пользователь еще НЕ отправлял в этой игре конкретному игроку
   */
  getRest: async (gameId, fromUserId, toUserId) => {
    const { data } = await api.get(
      `${BASE_PATH}/rest/${gameId}/${fromUserId}/${toUserId}`
    )
    return data
  },

  /**
   * Отправить благодарность
   * @param {Object} payload { gameId, fromUserId, toUserId, typeId, isAnonymous }
   */
  add: async (payload) => {
    const { data } = await api.post(BASE_PATH, payload)
    return data
  },

  /**
   * Получить список всех благодарностей, полученных пользователем (история)
   */
  getUserThanks: async (toUserId) => {
    const { data } = await api.get(`${BASE_PATH}/${toUserId}`)
    return data
  },

  /**
   * Узнать, какую благодарность пользователь уже дал в рамках конкретной игры
   */
  getGiven: async (gameId, fromUserId, toUserId) => {
    const { data } = await api.get(
      `${BASE_PATH}/given/${gameId}/${fromUserId}/${toUserId}`
    )
    return data
  },
}
