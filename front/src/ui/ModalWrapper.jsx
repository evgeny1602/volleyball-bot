export const ModalWrapper = ({ children }) => {
  return (
    <div className="w-full p-4 flex flex-col bg-white rounded-3xl border border-gray-300 shadow-sm max-h-[95vh]">
      {children}
    </div>
  )
}
