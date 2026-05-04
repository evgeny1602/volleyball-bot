import WebApp from '@twa-dev/sdk'

export const IS_WEB = WebApp.initData === ''
export const IS_TELEGRAM = WebApp.initData !== ''

const PATTERNS_VIBRO = ['light', 'medium', 'heavy', 'success', 'error']

export const setCookieTgId = (id, rememberMe, days = 7) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = rememberMe ? '; expires=' + date.toUTCString() : ''
  document.cookie = `tg_id=${id}${expires}; path=/; SameSite=Lax`
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
  if (IS_WEB) {
    return null
  }

  return WebApp.initData
}

export const tgGetUser = () => {
  if (IS_WEB) {
    return { id: getCookieTgId() ?? 0 }
  }

  if (IS_TELEGRAM) {
    return WebApp.initDataUnsafe.user
  }
}

export const vibro = (pattern) => {
  if (!PATTERNS_VIBRO.includes(pattern)) {
    return
  }

  if (IS_WEB) {
    return
  }

  if (IS_TELEGRAM) {
    WebApp.HapticFeedback.impactOccurred(pattern)
  }
}

export const appAlert = async (message) => {
  vibro('medium')

  if (IS_WEB) {
    alert(message)
    return
  }

  if (IS_TELEGRAM) {
    return new Promise((resolve) => WebApp.showAlert(message, () => resolve()))
  }
}

export const appConfirm = async (message) => {
  vibro('medium')

  if (IS_WEB) {
    return window.confirm(message)
  }

  if (IS_TELEGRAM) {
    return new Promise((resolve) =>
      WebApp.showConfirm(message, (isConfirmed) => resolve(isConfirmed))
    )
  }
}

export const appOpenLink = (url) => {
  if (window.Telegram?.WebApp?.openLink) {
    window.Telegram.WebApp.openLink(url)
  }
}
