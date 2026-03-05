import { useCurrentUser } from '@/hooks/users'
import { useXp } from '@/hooks/xp'
import { useUserThanks } from '@/hooks/thanks'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { UserAvatar } from '@/ui/UserAvatar'
import { XpBar } from '@/ui/XpBar'
import { ModalButton } from '@/ui/ModalButton'
import { Star, Handshake, Medal, Volleyball } from 'lucide-react'
import { RespectTotals } from '@/ui/RespectTotals'
import { ThankUsers } from '@/ui/ThankUsers'
import { useMemo } from 'react'

export const ProfileTab = () => {
  const { tgUser, user } = useCurrentUser()
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
  const displayName = useMemo(() => {
    if (!user?.fio) return { first: '', last: '' }
    const parts = user.fio.trim().split(/\s+/)
    if (parts.length === 1) return { first: parts[0], last: '' }
    const [lastName, ...other] = parts
    return { first: other.join(' '), last: lastName }
  }, [user?.fio])

  if (isXpLoading || isThanksLoading || !user) return <LoaderFullScreen />

  return (
    <div className="scrollable-content overflow-y-auto w-full p-4 pt-8 pb-30 flex flex-col items-center gap-4 text-lg text-gray-600 dark:text-white">
      <UserAvatar
        url={tgUser?.photo_url || ''}
        variant="big"
      />

      <div className="flex flex-col items-center">
        <div className="font-semibold">
          {displayName.first} {displayName.last}
        </div>

        <div className="text-sm text-gray-400 -mt-1">{rank.name}</div>
      </div>

      <div className="text-xs mt-8 font-mono font-semibold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1 rounded-full">
        <span className="flex items-center gap-1">
          <Medal size={15} />
          Уровень: {rank?.number}
        </span>
      </div>

      <XpBar
        xpBalance={xpBalance}
        rank={rank}
        nextRank={nextRank}
        className="mb-8"
      />

      <div className="flex flex-col gap-3 items-center w-full">
        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-white text-sm px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-full font-semibold">
          <Volleyball size={16} />
          <span>
            Игры{' '}
            <span className="font-normal opacity-80">{stats?.games || 0}</span>
          </span>
        </div>

        <ModalButton
          modalHeader={
            <span className="text-sm">
              Респекты{' '}
              <span className="text-xs font-normal opacity-80">
                {thanks.length}
              </span>
            </span>
          }
          Icon={Star}
          ModalContent={() => <RespectTotals thanks={thanks} />}
        />

        <ModalButton
          modalHeader={
            <span className="text-sm">
              Поблагодарили{' '}
              <span className="text-xs font-normal opacity-80">
                {namedThanks.length}
              </span>
            </span>
          }
          ModalContent={() => <ThankUsers thanks={namedThanks} />}
          Icon={Handshake}
        />
      </div>
    </div>
  )
}
