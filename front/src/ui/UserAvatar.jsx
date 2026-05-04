import { cn } from '@/utils/cn'
import { CircleUser } from 'lucide-react'
import { useState, useRef } from 'react'
import { useUpload } from '@/hooks/useUpload'
import { useUserMutations } from '@/hooks/users'
import { vibro, appAlert } from '@/utils/tools'

const SIZES = {
  default: 'w-16 h-16',
  small: 'w-10 h-10',
  big: 'w-34 h-34',
}

export const UserAvatar = ({
  user,
  variant = 'default',
  className,
  onClick,
  isChangable = false,
}) => {
  const { setAvatar, isPending } = useUserMutations()
  const fileInputRef = useRef(null)
  const { uploadFile, isLoading } = useUpload()
  const [preview, setPreview] = useState(
    user.avatar_url != ''
      ? `avatars/${user.avatar_url}?ts=${Date.now()}`
      : `${user.tg_avatar_url}`
  )

  const sizeClass = SIZES[variant] || SIZES.default

  const handleClick = () => {
    vibro('medium')

    if (!isChangable) {
      onClick?.()
      return
    }

    if (!isLoading && !isPending) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const uploadedUrl = await uploadFile(file)

    if (!uploadedUrl) {
      appAlert('Ошибка загрузки файла')
      return
    }

    const ext = uploadedUrl.split('.').at(-1)

    setAvatar({ tgId: user.tg_id, filename: uploadedUrl.split('/').at(-1) })

    setPreview(`avatars/${user.id}.${ext}?ts=${Date.now()}`)
  }

  return (
    <>
      {user.tg_username == 'Guest' ? (
        <div
          onClick={handleClick}
          className={cn(
            'bg-gray-200 dark:bg-gray-600 rounded-full flex',
            'items-center justify-center shrink-0',
            sizeClass,
            className
          )}
        >
          <CircleUser className="text-gray-400 w-2/3 h-2/3" />
        </div>
      ) : (
        <img
          onClick={handleClick}
          src={preview}
          className={cn(
            'rounded-full object-cover shrink-0',
            sizeClass,
            className
          )}
        />
      )}

      {isChangable && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isLoading}
        />
      )}
    </>
  )
}
