import WebApp from '@twa-dev/sdk'

export const IS_WEB = WebApp.initData === ''
export const IS_TELEGRAM = WebApp.initData !== ''
// const IS_DEV = import.meta.env.DEV
const IS_DEV = false
const PATTERNS_VIBRO = ['light', 'medium', 'heavy', 'success', 'error']

const fakeAppDataRaw =
  'user=%7B%22id%22%3A450980607%2C%22first_name%22%3A%22Evgeny%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22evgeny1602%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F9yAlG4r7_30UQWSB-ks7Lo929kSPgx1qAbKF4Y0Qg2o.svg%22%7D&chat_instance=4903906999596755832&chat_type=private&auth_date=1770964724&signature=2_PRqmznGRGM-G85eCNoP_rqDknmMouzuwp9GSDo_Smm_GTTHLu8fzuQAA7FZLaqDjKf1RcEq1XAwEM9xNSXCA&hash=bce28c1b6abd5caefdcbd6123da0f6d8c514da471e52567d6e17aae5fd791ff7'

const fakeUser = {
  id: 450980607,
  first_name: 'Evgeny',
  last_name: '',
  username: 'evgeny1602',
  language_code: 'ru',
  allows_write_to_pm: true,
  photo_url:
    'https://t.me/i/userpic/320/9yAlG4r7_30UQWSB-ks7Lo929kSPgx1qAbKF4Y0Qg2o.svg',
}

export const setCookieTgId = (id, rememberMe) => {
  const days = 7
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = rememberMe ? '; expires=' + date.toUTCString() : ''
  const cookieText = `tg_id=${id}${expires}; path=/; SameSite=Lax`
  document.cookie = cookieText
}

export const removeCookieTgId = () => {
  document.cookie =
    'tg_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax'
}

const getCookieTgId = () => {
  const name = 'tg_id='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      const value = c.substring(name.length, c.length)
      return value ? Number(value) : null
    }
  }
  return null
}

export const tgGetAppDataRaw = () => {
  if (IS_DEV) {
    return fakeAppDataRaw
  }

  if (IS_WEB) {
    return fakeAppDataRaw
  }

  return WebApp.initData
}

export const tgGetUser = () => {
  if (IS_DEV) {
    return fakeUser
  }

  if (IS_WEB) {
    return { id: getCookieTgId() ?? 0 }
  }

  if (IS_TELEGRAM) {
    return WebApp.initDataUnsafe.user
  }
}

export const tgVibro = (pattern) => {
  if (!PATTERNS_VIBRO.includes(pattern)) {
    return
  }

  if (IS_DEV) {
    return
  }

  if (IS_WEB) {
    return
  }

  if (IS_TELEGRAM) {
    WebApp.HapticFeedback.impactOccurred(pattern)
  }
}

export const tgAlert = async (message) => {
  tgVibro('medium')

  if (IS_DEV) {
    alert(message)
    return
  }

  if (IS_WEB) {
    alert(message)
    return
  }

  if (IS_TELEGRAM) {
    return new Promise((resolve) => WebApp.showAlert(message, () => resolve()))
  }
}

export const tgConfirm = async (message) => {
  tgVibro('medium')

  if (IS_DEV) {
    return window.confirm(message)
  }

  if (IS_WEB) {
    return window.confirm(message)
  }

  if (IS_TELEGRAM) {
    return new Promise((resolve) =>
      WebApp.showConfirm(message, (isConfirmed) => resolve(isConfirmed))
    )
  }
}
