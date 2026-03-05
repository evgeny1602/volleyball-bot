export const XpBar = ({ xpBalance, nextRank }) => {
  const progress = Math.min(
    Math.max((xpBalance / nextRank.min_xp) * 100, 0),
    100
  )

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center gap-1 my-4">
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-bot-primary dark:bg-bot-primary-dark rounded-full relative"
        />
      </div>

      <span className="text-xs font-mono text-slate-400">
        {xpBalance} / {nextRank.min_xp} XP
      </span>
    </div>
  )
}
