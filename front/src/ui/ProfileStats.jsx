import { RespectTotals } from '@/ui/RespectTotals'
import { ThankUsers } from '@/ui/ThankUsers'
import { ModalButton } from '@/ui/ModalButton'
import { Star, Handshake, Volleyball } from 'lucide-react'
import { cn } from '@/utils/cn'

const ProfileGameStats = ({ playedGames = 0 }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-white text-sm px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-full font-semibold">
      <Volleyball size={16} />
      <span>
        Игры <span className="font-normal opacity-80">{playedGames || 0}</span>
      </span>
    </div>
  )
}

export const ProfileStats = ({
  playedGames,
  thanks,
  namedThanks,
  className,
  variant = 'full',
}) => {
  return (
    <div className={cn('flex flex-col gap-3 items-center w-full', className)}>
      <ProfileGameStats playedGames={playedGames} />

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
        ModalContent={RespectTotals}
        modalProps={{ thanks }}
      />

      {variant == 'full' && (
        <ModalButton
          modalHeader={
            <span className="text-sm">
              Поблагодарили{' '}
              <span className="text-xs font-normal opacity-80">
                {namedThanks.length}
              </span>
            </span>
          }
          ModalContent={ThankUsers}
          Icon={Handshake}
          modalProps={{ thanks: namedThanks }}
        />
      )}
    </div>
  )
}
