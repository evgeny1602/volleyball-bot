import { useMemo } from 'react'
import { NoRespects } from '@/ui/NoRespects'

export const RespectTotals = ({ thanks }) => {
  const sortedThankTotals = useMemo(() => {
    const totals = thanks.reduce((acc, item) => {
      acc[item.name] = (acc[item.name] || 0) + 1
      return acc
    }, {})

    return Object.entries(totals).sort((a, b) => b[1] - a[1])
  }, [thanks])

  if (!thanks || thanks.length == 0) return <NoRespects />

  return (
    <div className="text-sm font-semibold flex flex-col items-center gap-2">
      {sortedThankTotals.map(([name, count]) => (
        <div
          key={name}
          className="uppercase inline-flex items-center gap-2 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white px-3 py-2 rounded-full"
        >
          <span>{name}</span>
          <span className="bg-white text-purple-600 rounded-[50%] w-6 h-6 flex justify-center items-center shrink-0">
            {count}
          </span>
        </div>
      ))}
    </div>
  )
}
