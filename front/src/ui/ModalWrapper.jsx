export const ModalWrapper = ({ children }) => {
  return (
    <div className="w-full p-4 flex flex-col bg-white dark:bg-gray-800 rounded-3xl border border-gray-300 dark:border-gray-900 shadow-sm dark:shadow-sm-dark max-h-[95vh]">
      {children}
    </div>
  )
}
