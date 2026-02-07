import db from '../db.js'

export const getAllUsers = (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC')
    const users = stmt.all()
    res.json({ success: true, count: users.length, data: users })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserByTgId = (req, res) => {
  try {
    const { tgId } = req.params
    const user = db.prepare(`SELECT * FROM users WHERE tg_id = ?`).get(tgId)
    res.json(user ? { exists: true, user } : { exists: false })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createUser = (req, res) => {
  try {
    const {
      tg_id,
      tg_username,
      tg_avatar_url,
      fio,
      gender,
      phone,
      birthday,
      role,
      status,
    } = req.body
    if (!tg_id) return res.status(400).json({ error: 'tg_id is required' })

    const stmt = db.prepare(`
            INSERT INTO users (tg_id, tg_username, tg_avatar_url, fio, gender, phone, birthday, role, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)

    const info = stmt.run(
      tg_id,
      tg_username || null,
      tg_avatar_url || null,
      fio || null,
      gender || 'male',
      phone || null,
      birthday || null,
      role || 'player',
      status || 'registered'
    )

    res.status(201).json({
      message: 'User created successfully',
      userId: info.lastInsertRowid,
    })
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE')
      return res.status(409).json({ error: 'User already exists' })
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const approveUser = (req, res) => {
  try {
    const { tgId } = req.params
    const info = db
      .prepare(`UPDATE users SET status = 'approved' WHERE tg_id = ?`)
      .run(tgId)

    if (info.changes > 0) {
      res.json({
        success: true,
        message: `User ${tgId} status updated to approved`,
      })
    } else {
      res.status(404).json({ success: false, error: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteUser = (req, res) => {
  try {
    const { tgId } = req.params
    const info = db.prepare('DELETE FROM users WHERE tg_id = ?').run(tgId)

    if (info.changes > 0) {
      res.json({ success: true, message: `User ${tgId} deleted` })
    } else {
      res.status(404).json({ success: false, error: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
