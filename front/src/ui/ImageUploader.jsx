import { useState, useRef } from 'react'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { vibro, appAlert } from '@/utils/tools'
import { useUpload } from '@/hooks/useUpload'
import { InputLabel } from '@/ui/InputLabel'

export const ImageUploader = ({ value, onChange, label, className }) => {
  const [preview, setPreview] = useState(value)
  const fileInputRef = useRef(null)
  const { uploadFile, deleteFile, isLoading } = useUpload()

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (!file) return

    const uploadedUrl = await uploadFile(file)
    if (uploadedUrl) {
      setPreview(uploadedUrl)
      onChange?.(uploadedUrl)
    } else {
      appAlert('Ошибка загрузки файла')
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    vibro('medium')

    setPreview(null)
    onChange?.('')
    if (fileInputRef.current) fileInputRef.current.value = ''

    if (preview) {
      await deleteFile(preview.split('?ts=')[0])
    }
  }

  const handleDownloadAreaClick = () => {
    vibro('medium')
    !isLoading && !preview && fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      {label && <InputLabel>{label}</InputLabel>}

      <div
        onClick={handleDownloadAreaClick}
        className={cn(
          'relative w-full h-48 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-200',
          preview
            ? 'border-transparent'
            : 'border-gray-200 dark:border-gray-600 dark:bg-gray-700 bg-gray-100 active:bg-gray-100 active:dark:bg-gray-600',
          isLoading && 'opacity-60 cursor-not-allowed',
          className
        )}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleDelete}
              className={cn(
                'absolute p-2 bg-bot-danger/90 backdrop-blur-md rounded-full',
                'text-white shadow-sm active:scale-90 transition-transform',
                'cursor-pointer hover:opacity-100 transition-all duration-200',
                'opacity-70'
              )}
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 cursor-pointer">
            {isLoading ? (
              <Loader2
                className="animate-spin text-bot-primary"
                size={32}
              />
            ) : (
              <ImagePlus
                size={32}
                className="text-gray-300 dark:text-gray-500"
              />
            )}

            {isLoading && (
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                Загрузка...
              </span>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isLoading}
      />
    </div>
  )
}
