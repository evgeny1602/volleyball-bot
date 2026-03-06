import { XpBar } from '@/ui/XpBar'
import { RankNumberPill } from '@/ui/RankNumberPill'
import { cn } from '@/utils/cn'

export const ProfileXp = ({ rankNumber, xpBalance, nextXp, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full gap-3',
        className
      )}
    >
      <RankNumberPill rankNumber={rankNumber} />

      <XpBar
        xpBalance={xpBalance}
        nextXp={nextXp}
      />
    </div>
  )
}
