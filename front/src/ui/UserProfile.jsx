import { useMemo } from 'react'
import { useUser } from '@/hooks/users'
import { useXp } from '@/hooks/xp'
import { useUserThanks } from '@/hooks/thanks'
import { ProfileHeader } from '@/ui/ProfileHeader'
import { ProfileXp } from '@/ui/ProfileXp'
import { ProfileStats } from '@/ui/ProfileStats'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { tgGetUser } from '@/utils/telegram'

export const UserProfile = ({ tgUserId, variant = 'full' }) => {
  const tgUser = tgGetUser(tgUserId)
  const { data, isLoading: isUserLoading } = useUser(tgUser?.id)
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

  if (!tgUser) {
    return <p className="text-sm font-mono">ОШИБКА: Не получен tgUser</p>
  }

  if (isXpLoading || isThanksLoading || isUserLoading) {
    return <LoaderFullScreen />
  }

  return (
    <>
      <ProfileHeader
        avatarUrl={tgUser?.photo_url}
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
    </>
  )
}
