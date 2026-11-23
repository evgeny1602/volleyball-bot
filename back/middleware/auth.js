import db from '../db.js'

const findUserByCookie = (req, res) => {
  const tgId = req.cookies?.tg_id

  if (!tgId) {
    res.status(401).json({ error: 'No tg_id cookie. Access denied.' })
    return null
  }

  const user = db
    .prepare('SELECT id, role FROM users WHERE tg_id = ?')
    .get(tgId)

  if (!user) {
    res.status(403).json({ error: 'No user with such tg_id. Access denied.' })
    return null
  }

  return user
}

export const isRegistered = (req, res, next) => {
  const user = findUserByCookie(req, res)

  if (!user) return

  next()
}

export const isAdmin = (req, res, next) => {
  const user = findUserByCookie(req, res)

  if (!user) return

  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required.' })
  }

  next()
}
