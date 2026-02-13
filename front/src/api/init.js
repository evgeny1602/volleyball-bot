import axios from 'axios'
import { tgGetAppDataRaw } from '@/utils/telegram'

export const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  config.headers['X-Telegram-Init-Data'] = tgGetAppDataRaw()

  return config
})
