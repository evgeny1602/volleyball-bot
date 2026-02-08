export const ModalWrapper = ({ children }) => {
  return (
    <div className="w-full p-4 flex flex-col bg-white rounded-3xl shadow-sm max-h-[90vh]">
      {children}
    </div>
  )
}
