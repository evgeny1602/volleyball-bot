import { api } from './init'

const BASE_PATH = '/upload'

export const uploadsApi = {
  upload: async (formData) => {
    const { data } = await api.post(BASE_PATH, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  delete: async (filename) => {
    const { data } = await api.delete(`${BASE_PATH}/${filename}`)
    return data
  },
}
