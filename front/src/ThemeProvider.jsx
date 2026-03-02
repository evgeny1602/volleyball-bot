import WebApp from '@twa-dev/sdk'
import { useEffect, useState, createContext, useContext } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
})

export const ThemeProvider = ({ children, theme: manualTheme }) => {
  const [currentTheme, setCurrentTheme] = useState(
    manualTheme || WebApp.colorScheme
  )

  useEffect(() => {
    const syncTheme = () => {
      const newTheme = manualTheme ? manualTheme : WebApp.colorScheme || 'light'

      setCurrentTheme(newTheme)

      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
        WebApp.setHeaderColor('#1c1c1d')
        WebApp.setBackgroundColor('#1c1c1d')
      } else {
        document.documentElement.classList.remove('dark')
        WebApp.setHeaderColor('#fafafa')
        WebApp.setBackgroundColor('#fafafa')
      }
    }

    WebApp.ready()
    syncTheme()

    WebApp.onEvent('themeChanged', syncTheme)
    return () => WebApp.offEvent('themeChanged', syncTheme)
  }, [manualTheme])

  const value = {
    theme: currentTheme,
    isDark: currentTheme === 'dark',
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
