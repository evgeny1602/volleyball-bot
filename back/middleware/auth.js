import crypto from 'crypto'

export const validateTelegramData = (req, res, next) => {
  if (req.path.startsWith('/uploads/')) {
    return next()
  }

  if (process.env.NODE_ENV === 'development' && req.headers['x-debug-mode']) {
    req.user = { id: 12345, first_name: 'Лобанов Евгений' }
    return next()
  }

  const initData = req.headers['x-telegram-init-data']

  if (!initData) return res.status(401).json({ error: 'No Telegram data' })

  try {
    const urlParams = new URLSearchParams(initData)
    const hash = urlParams.get('hash')
    const dataToVerify = []

    urlParams.sort()
    for (const [key, value] of urlParams.entries()) {
      if (key !== 'hash') dataToVerify.push(`${key}=${value}`)
    }

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(process.env.BOT_TOKEN)
      .digest()

    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(dataToVerify.join('\n'))
      .digest('hex')

    if (hmac !== hash) return res.status(403).json({ error: 'Invalid hash' })

    req.user = JSON.parse(urlParams.get('user'))
    next()
  } catch (e) {
    return res.status(400).json({ error: 'Invalid data format' })
  }
}
