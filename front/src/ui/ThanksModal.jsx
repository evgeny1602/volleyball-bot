import { useState } from 'react'
import { useCurrentUser } from '@/hooks/users'
import { useXp } from '@/hooks/xp'
import { LoaderFullScreen } from '@/ui/LoaderFullscreen'
import { useRestThanks, useThanksMutations } from '@/hooks/thanks'
import { Circle, CheckCircle2 } from 'lucide-react'
import { tgVibro } from '@/utils/telegram'
import { cn } from '@/utils/cn'
import { Button } from '@/ui/Button'

export const ThanksModal = ({
  onCancel,
  toUserId,
  gameId,
  toFio,
  onSubmit,
}) => {
  const [selectedId, setSelectedId] = useState(1)
  const [isAnonymous, setisAnomymous] = useState(false)
  const { user } = useCurrentUser()
  const { xpBalance = 0, isLoading: isXpLoading } = useXp(user?.id)
  const { data, isLoading: isThanksLoading } = useRestThanks(
    gameId,
    user?.id,
    toUserId
  )
  const { addThank, isPending } = useThanksMutations()

  if (isXpLoading || isThanksLoading || isPending) {
    return <LoaderFullScreen />
  }

  const restThanks = data?.thanks || []

  const handleSelect = (id) => {
    tgVibro('medium')
    setSelectedId(id)
  }

  const handleAnonymousToggle = () => {
    tgVibro('medium')
    setisAnomymous(!isAnonymous)
  }

  const handleSubmit = async () => {
    tgVibro('medium')
    await addThank({
      gameId,
      fromUserId: user?.id,
      toUserId,
      typeId: selectedId,
      isAnonymous: isAnonymous ? 1 : 0,
    })
    onSubmit()
    onCancel?.()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center text-sm text-gray-400 dark:text-gray-500">
        <p>
          Отправить респект игроку{' '}
          <span className="font-semibold text-gray-500 dark:text-gray-400">
            {toFio}
          </span>
        </p>
        <p>У тебя {xpBalance} очков опыта.</p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {restThanks.map(({ id, name }) => (
            <div className="flex justify-center h-8">
              <div
                key={id}
                onClick={() => handleSelect(id)}
                className={cn(
                  'uppercase px-3 py-1 rounded-full active:scale-95 transition-all duration-200 text-purple-600 dark:text-purple-400 text-sm font-semibold border-2 border-purple-600 dark:border-purple-400 flex items-center',
                  selectedId === id &&
                    'border-none bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 text-white dark:text-white'
                )}
              >
                {name}
              </div>
            </div>
          ))}
        </div>

        <div
          className="group flex justify-center items-center gap-1 text-gray-500 dark:text-gray-400"
          onClick={handleAnonymousToggle}
        >
          {isAnonymous ? (
            <CheckCircle2
              size={14}
              className="group-active:scale-80 transition-all duration-200"
            />
          ) : (
            <Circle
              size={14}
              className="group-active:scale-80 transition-all duration-200"
            />
          )}
          <div className="text-xs">Анонимно</div>
        </div>

        <Button
          variant="success"
          className="active:scale-95 transition-all duration-200 mt-2"
          onClick={handleSubmit}
        >
          Отправить
        </Button>
      </div>
    </div>
  )
}
