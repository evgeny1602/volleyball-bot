import { notifyUsers } from '../services/notifier.js'

const TARGET_METHODS = ['POST', 'PATCH', 'DELETE', 'PUT']

const getNotifyMessage = (req) => {
  const body = Object.keys(req.body || {})
    .map((key) => `${key}: ${req.body[key]}`)
    .join(`\n`)

  return `${req.method} ${req.originalUrl} ${body}`
}

const handleEvent = (req, res) => {
  if (res.statusCode >= 400) return
  if (!TARGET_METHODS.includes(req.method)) return

  const msg = getNotifyMessage(req)
  notifyUsers(msg)
}

export const dbLogger = (req, res, next) => {
  res.on('finish', () => handleEvent(req, res))
  next()
}
