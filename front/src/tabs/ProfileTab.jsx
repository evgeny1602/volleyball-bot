import { useCurrentUser } from '@/hooks/users'
import { useXp } from '@/hooks/xp'
import { useUserThanks } from '@/hooks/thanks'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { UserAvatar } from '@/ui/UserAvatar'
import { XpBar } from '@/ui/XpBar'
import { ModalButton } from '@/ui/ModalButton'
import { Star, Handshake } from 'lucide-react'

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
  const namedThanks = thanks.filter((thank) => thank.is_anonymous == 0)
  const games = stats?.games || 0
  const photoUrl = tgUser?.photo_url || ''
  const [lastName, ...otherParts] = (user?.fio || '').trim().split(/\s+/)
  const nameRest = otherParts.join(' ')
  const thankTotals = thanks.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1
    return acc
  }, {})

  console.log({ thanks })

  if (isXpLoading || isThanksLoading) return <LoaderFullScreen />

  return (
    <div className="w-full h-dvh p-4 pt-16 flex flex-col items-center gap-4 text-lg text-gray-600">
      <UserAvatar
        url={photoUrl}
        variant="big"
      />

      <div className="flex flex-col items-center">
        <div className="font-semibold">
          {nameRest} {lastName}
        </div>
        <div className="text-sm text-gray-400 -mt-1">{rank.name}</div>
      </div>

      <div className="my-4 font-mono bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-1 rounded-full">
        Уровень {rank.number}
      </div>

      <XpBar
        xpBalance={xpBalance}
        rank={rank}
        nextRank={nextRank}
      />

      <div className="flex flex-col items-center text-gray-400 text-sm">
        <div>
          <span className="mr-1">Игр сыграно:</span>
          <span className="font-semibold text-gray-600">{games}</span>
        </div>
      </div>

      <ModalButton
        modalHeader={
          <span className="text-sm">
            Респекты{' '}
            <span className="text-xs font-normal opacity-70">
              {thanks.length}
            </span>
          </span>
        }
        Icon={Star}
      />

      <ModalButton
        modalHeader={
          <span className="text-sm">
            Поблагодарили{' '}
            <span className="text-xs font-normal opacity-70">
              {namedThanks.length}
            </span>
          </span>
        }
        Icon={Handshake}
      />
    </div>
  )
}
