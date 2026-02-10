export const MenuContainer = ({ children }) => {
  return (
    <div
      className="fixed bottom-5 flex flex-row flex-nowrap overflow-x-auto scroll-smooth snap-x gap-2 py-1 px-1 bg-white rounded-full shadow-sm w-auto max-w-[95%]"
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  )
}
