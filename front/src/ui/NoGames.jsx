const MODE_MESSAGES = {
  active: 'Самое время записаться на тренировку, чемпион! 🏆',
  past: 'Ты еще не участвовал в тренировках... 😕',
}

export const NoGames = ({ mode }) => {
  return (
    <div className="flex flex-1 flex-col text-center items-center justify-center w-full text-gray-400 mt-auto">
      {MODE_MESSAGES[mode]}
    </div>
  )
}
