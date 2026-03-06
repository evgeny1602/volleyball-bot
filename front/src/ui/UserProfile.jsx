import { useMemo } from 'react'
import { useUser } from '@/hooks/users'
import { useXp } from '@/hooks/xp'
import { useUserThanks } from '@/hooks/thanks'
import { ProfileHeader } from '@/ui/ProfileHeader'
import { ProfileXp } from '@/ui/ProfileXp'
import { ProfileStats } from '@/ui/ProfileStats'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { cn } from '@/utils/cn'

export const UserProfile = ({ tgUserId, variant = 'full', className }) => {
  const { data, isLoading: isUserLoading } = useUser(tgUserId)
  const user = data?.user
  const {
    xpBalance = 0,
    stats,
    isLoading: isXpLoading,
    rank,
    nextRank,
  } = useXp(user?.id)
  const { data: thanksData, isLoading: isThanksLoading } = useUserThanks(
    user?.id
  )
  const thanks = thanksData?.thanks || []
  const namedThanks = useMemo(
    () => thanks.filter((thank) => !thank.is_anonymous),
    [thanks]
  )

  if (!tgUserId) {
    return <p className="text-sm font-mono">ОШИБКА: Не получен tgUserId</p>
  }

  if (isXpLoading || isThanksLoading || isUserLoading) {
    return <LoaderFullScreen />
  }

  return (
    <div
      className={cn(
        'w-full',
        'px-4 py-8',
        'flex flex-col items-center gap-14',
        'text-lg text-gray-600 dark:text-white',
        className
      )}
    >
      <ProfileHeader
        avatarUrl={user?.tg_avatar_url}
        userFio={user?.fio}
        rankName={rank?.name}
      />

      <ProfileXp
        rankNumber={rank?.number}
        xpBalance={xpBalance}
        nextXp={nextRank?.min_xp || xpBalance}
      />

      <ProfileStats
        playedGames={stats?.games || 0}
        thanks={thanks}
        namedThanks={namedThanks}
        variant={variant}
      />
    </div>
  )
}
