import { useState } from 'react'
import { uploadsApi } from '@/api/uploads'

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const uploadFile = async (file) => {
    if (!file) return null

    const formData = new FormData()
    formData.append('image', file)

    setIsLoading(true)
    setError(null)

    try {
      const result = await uploadsApi.upload(formData)

      if (result.success) {
        return result.url
      }
    } catch (err) {
      setError('Не удалось загрузить файл')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFile = async (url) => {
    if (!url) return

    const filename = url.split('/').pop()

    setIsLoading(true)
    try {
      await uploadsApi.delete(filename)
      return true
    } catch (err) {
      console.error('Delete error:', err)
      setError('Не удалось удалить файл с сервера')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    uploadFile,
    deleteFile,
    isLoading,
    error,
    clearError: () => setError(null),
  }
}
