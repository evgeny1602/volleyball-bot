export const ModalOverlay = ({ children }) => {
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center h-dvh bg-white/5 backdrop-blur-md z-1 absolute top-0 left-0">
      {children}
    </div>
  )
}
