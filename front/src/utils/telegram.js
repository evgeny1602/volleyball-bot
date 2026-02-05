import WebApp from '@twa-dev/sdk'

const isDev = import.meta.env.DEV

const fakeAppData = {
  user: {
    id: 12345,
    first_name: 'DevUser',
    username: 'dev_test',
  },
}

export const tgInit = () => {
  if (isDev) return

  WebApp.ready()
  WebApp.expand()
}

export const tgGetAppData = () => {
  if (isDev) return fakeAppData

  return WebApp.initDataUnsafe
}

export const tgVibro = (pattern) => {
  if (isDev) return

  switch (pattern) {
    case 'light':
      WebApp.HapticFeedback.impactOccurred('light')
      break
    case 'medium':
      WebApp.HapticFeedback.impactOccurred('medium')
      break
    case 'heavy':
      WebApp.HapticFeedback.impactOccurred('heavy')
      break
  }

  // WebApp.HapticFeedback.selectionChanged()
}
