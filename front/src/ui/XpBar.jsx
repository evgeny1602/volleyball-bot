import { cn } from '@/utils/cn'

export const XpBar = ({ xpBalance, nextRank, className }) => {
  const nextXp = nextRank?.min_xp || xpBalance
  const progress = Math.min(Math.max((xpBalance / nextXp) * 100, 0), 100)

  return (
    <div
      className={cn(
        'w-full max-w-md mx-auto px-4 flex flex-col items-center gap-1',
        className
      )}
    >
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-bot-primary rounded-full relative"
        />
      </div>

      <span className="text-xs font-mono text-slate-400">
        {xpBalance} / {nextXp} XP
      </span>
    </div>
  )
}
