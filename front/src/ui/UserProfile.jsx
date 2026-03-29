import { useMemo } from 'react'
import { useUser } from '@/hooks/users'
import { useXp } from '@/hooks/xp'
import { useUserThanks } from '@/hooks/thanks'
import { ProfileHeader } from '@/ui/ProfileHeader'
import { ProfileXp } from '@/ui/ProfileXp'
import { ProfileStats } from '@/ui/ProfileStats'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { cn } from '@/utils/cn'
import { Button } from '@/ui/Button'
import { LogOut } from 'lucide-react'
import { removeCookieTgId, tgConfirm, IS_WEB } from '@/utils/telegram'

export const UserProfile = ({
  tgUserId,
  variant = 'full',
  className,
  displayExitBtn = false,
}) => {
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

  const handleExitClick = async () => {
    const isYes = await tgConfirm('Вы уверены, что хотите выйти?')

    if (isYes) {
      removeCookieTgId()
      document.location.reload()
    }
  }

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
        avatarUrl={IS_WEB ? `avatars/${user?.avatar_url}` : user?.tg_avatar_url}
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

      {IS_WEB && displayExitBtn && (
        <Button
          variant="danger"
          className="text-sm mt-10"
          onClick={handleExitClick}
        >
          <LogOut size={14} />
          Выйти из приложения
        </Button>
      )}
    </div>
  )
}
