import WebApp from '@twa-dev/sdk'

const isDev = import.meta.env.DEV

const fakeAppDataRaw =
  'user=%7B%22id%22%3A450980607%2C%22first_name%22%3A%22Evgeny%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22evgeny1602%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F9yAlG4r7_30UQWSB-ks7Lo929kSPgx1qAbKF4Y0Qg2o.svg%22%7D&chat_instance=4903906999596755832&chat_type=private&auth_date=1770964724&signature=2_PRqmznGRGM-G85eCNoP_rqDknmMouzuwp9GSDo_Smm_GTTHLu8fzuQAA7FZLaqDjKf1RcEq1XAwEM9xNSXCA&hash=bce28c1b6abd5caefdcbd6123da0f6d8c514da471e52567d6e17aae5fd791ff7'

const fakeAppData = {
  user: {
    id: 450980607,
    first_name: 'Evgeny',
    last_name: '',
    username: 'evgeny1602',
    language_code: 'ru',
    allows_write_to_pm: true,
    photo_url:
      'https://t.me/i/userpic/320/9yAlG4r7_30UQWSB-ks7Lo929kSPgx1qAbKF4Y0Qg2o.svg',
  },
  chat_instance: '4903906999596755832',
  chat_type: 'private',
  auth_date: '1770964724',
  signature:
    '2_PRqmznGRGM-G85eCNoP_rqDknmMouzuwp9GSDo_Smm_GTTHLu8fzuQAA7FZLaqDjKf1RcEq1XAwEM9xNSXCA',
  hash: 'bce28c1b6abd5caefdcbd6123da0f6d8c514da471e52567d6e17aae5fd791ff7',
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

export const tgGetAppDataRaw = () => {
  if (isDev) return fakeAppDataRaw

  return WebApp.initData
}

export const tgGetUser = () => tgGetAppData().user

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

  if (isDev) {
    alert(message)
    return
  }

  return new Promise((resolve) => WebApp.showAlert(message, () => resolve()))
}

export const tgConfirm = async (message) => {
  tgVibro('medium')

  if (isDev) {
    return window.confirm(message)
  }

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

export const colorScheme = WebApp.colorScheme
