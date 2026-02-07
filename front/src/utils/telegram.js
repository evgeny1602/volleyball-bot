import WebApp from '@twa-dev/sdk'

const isDev = import.meta.env.DEV

const fakeAppData = {
  query_id: 'AAHdF6IQAAAAAN0XohD9sL9E',
  user: {
    id: 12345,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    username: 'ivan_dev',
    language_code: 'ru',
    is_premium: true,
    allows_write_to_pm: true,
    photo_url: 'https://t.me/i/userpic/160/example.jpg',
  },
  auth_date: '1700000000',
  hash: '89d7b1d...567',
  chat_type: 'sender',
  chat_instance: '84729384729',
}

export const tgInit = () => {
  if (isDev) return

  WebApp.ready()
  WebApp.expand()
  WebApp.lockOrientation()
  WebApp.enableClosingConfirmation()
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
