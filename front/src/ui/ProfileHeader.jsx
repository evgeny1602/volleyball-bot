import { useMemo } from 'react'
import { UserAvatar } from '@/ui/UserAvatar'
import { fioFormat } from '@/utils/formatters'
import { cn } from '@/utils/cn'

export const ProfileHeader = ({ avatarUrl, userFio, rankName, className }) => {
  const { first, last } = useMemo(() => fioFormat(userFio), [userFio])

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <UserAvatar
        url={avatarUrl || ''}
        variant="big"
      />

      <div className="flex flex-col items-center">
        <div className="font-semibold">
          {first} {last}
        </div>

        <div className="text-sm text-gray-400 -mt-1">{rankName}</div>
      </div>
    </div>
  )
}
