import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const syncTheme = () => {
      //   const isDark = WebApp.colorScheme === 'dark'
      // const isDark = true
      const isDark = false

      if (isDark) {
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

    return () => {
      WebApp.offEvent('themeChanged', syncTheme)
    }
  }, [])

  return <>{children}</>
}
