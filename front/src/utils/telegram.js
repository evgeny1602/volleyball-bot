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
    case 'success':
      WebApp.HapticFeedback.notificationOccurred('success')
      break
    case 'error':
      WebApp.HapticFeedback.notificationOccurred('error')
      break
  }
}

export const tgAlert = async (message) => {
  tgVibro('medium')

  if (isDev) return

  return new Promise((resolve) => WebApp.showAlert(message, () => resolve()))
}

export const tgConfirm = async (message) => {
  tgVibro('medium')

  if (isDev) return

  return new Promise((resolve) =>
    WebApp.showConfirm(message, (isConfirmed) => resolve(isConfirmed))
  )
}

export const tgPopUp = async (params) => {
  tgVibro('medium')

  if (isDev) return

  return new Promise((resolve) =>
    WebApp.showPopup(params, (buttonId) => resolve(buttonId))
  )
}
