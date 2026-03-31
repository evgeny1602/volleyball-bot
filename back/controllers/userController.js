import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import db from '../db.js'
import { GMT } from './utils.js'

const imgExts = ['jpg', 'jpeg', 'png', 'svg']

const generatePassword = () =>
  crypto.randomBytes(4).toString('hex').toLowerCase()

const getRandomTgId = () => -Math.floor(Date.now() + Math.random() * 1000)

const clearPsw = (user) => {
  const { psw, ...userNoPsw } = user
  return userNoPsw
}

const deleteOldAvatars = (userId) => {
  const oldAvatarFiles = imgExts
    .map((e) => path.join('avatars', `${userId}.${e}`))
    .filter((f) => fs.existsSync(f))

  for (const f of oldAvatarFiles) {
    fs.unlinkSync(f)
  }
}

export const setAvatar = (req, res) => {
  try {
    const { tgId, filename } = req.body

    if (!tgId) {
      return res.status(400).json({ error: 'tgId is required' })
    }

    if (!filename) {
      return res.status(400).json({ error: 'filename is required' })
    }

    const ext = filename.split('.').at(-1).toLowerCase()
    const uploadedFilename = path.join('uploads', filename)

    if (!fs.existsSync(uploadedFilename)) {
      return res
        .status(404)
        .json({ error: `File "${uploadedFilename}" not found` })
    }

    const user = db
      .prepare(
        `
          SELECT * 
          FROM users 
          WHERE tg_id = ?
        `
      )
      .get(tgId)

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with tg_id "${tgId}" not found` })
    }

    deleteOldAvatars(user.id)

    const avatarFilename = `${user.id}.${ext}`

    fs.copyFileSync(uploadedFilename, path.join('avatars', avatarFilename))
    fs.unlinkSync(uploadedFilename)

    db.prepare(
      `
        UPDATE users
        SET avatar_url = ?
        WHERE id = ?
      `
    ).run(avatarFilename, user.id)

    return res.status(200).json({
      success: true,
      user: clearPsw(user),
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getAllUsers = (req, res) => {
  try {
    const data = db
      .prepare(
        `
          SELECT * 
          FROM users 
          WHERE tg_username != 'Guest' 
          ORDER BY created_at DESC
        `
      )
      .all()

    res.json({
      success: true,
      count: data.length,
      data,
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserByTgId = (req, res) => {
  try {
    const { tgId } = req.params

    const user = db
      .prepare(
        `
          SELECT * 
          FROM users 
          WHERE tg_id = ?
        `
      )
      .get(tgId)

    res.json(user ? { exists: true, user: clearPsw(user) } : { exists: false })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createGuestUser = (req, res) => {
  try {
    const { fio } = req.body

    if (!fio) {
      return res.status(400).json({ error: 'fio is required' })
    }

    const tgId = getRandomTgId()

    const info = db
      .prepare(
        `
          INSERT INTO users (
            tg_id, 
            tg_username, 
            tg_avatar_url, 
            fio, 
            gender, 
            phone, 
            birthday, 
            role, 
            status, 
            created_at
          ) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '+${GMT} hours'))
        `
      )
      .run(tgId, 'Guest', '', fio, 'male', '', '', 'player', 'approved')

    res.status(201).json({
      success: true,
      message: 'Guest user created successfully',
      userId: info.lastInsertRowid,
      tgId,
    })
  } catch (err) {
    console.error('Create guest error:', err)
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'Conflict: try again' })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserByPhone = (req, res) => {
  try {
    const { phone } = req.params
    const user = db
      .prepare(
        `
          SELECT * 
          FROM users 
          WHERE phone = ?
        `
      )
      .get(phone)

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

    const existingUser = db
      .prepare(
        `
          SELECT * 
          FROM users 
          WHERE phone = ?
        `
      )
      .get(phone)

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const tgId = tg_id || getRandomTgId()

    const info = db
      .prepare(
        `
          INSERT INTO users (
            tg_id, 
            tg_username, 
            tg_avatar_url, 
            fio, 
            gender, 
            phone, 
            birthday, 
            role, 
            status, 
            created_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '+${GMT} hours'))
        `
      )
      .run(
        tgId,
        tg_username || '',
        tg_avatar_url || '',
        fio || '',
        gender || 'male',
        phone || '',
        birthday || '',
        role || 'player',
        status || 'registered'
      )

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      userId: info.lastInsertRowid,
      tgId,
    })
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'User already exists' })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = (req, res) => {
  const { phone, password } = req.body

  try {
    const user = db
      .prepare(
        `
          SELECT * 
          FROM users 
          WHERE phone = ? AND psw = ?
        `
      )
      .get(phone, password)

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    return res.status(200).json({
      success: true,
      user: clearPsw(user),
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const rejectUser = (req, res) => {
  try {
    const { tgId } = req.params

    const info = db
      .prepare(
        `
          UPDATE users 
          SET status = 'rejected' 
          WHERE tg_id = ?
        `
      )
      .run(tgId)

    if (info.changes > 0) {
      res.json({
        success: true,
        message: `User ${tgId} status updated to rejected`,
      })
    } else {
      res.status(404).json({ success: false, error: 'User not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const approveUser = (req, res) => {
  try {
    const { tgId } = req.params

    const info = db
      .prepare(
        `
          UPDATE users 
          SET status = 'approved' 
          WHERE tg_id = ?
        `
      )
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

    const info = db
      .prepare(
        `
          DELETE FROM users 
          WHERE tg_id = ?
        `
      )
      .run(tgId)

    if (info.changes > 0) {
      res.json({
        success: true,
        message: `User ${tgId} deleted`,
      })
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found',
      })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const genPsws = (req, res) => {
  try {
    const userIds = db
      .prepare(
        `
          SELECT id 
          FROM users
        `
      )
      .all()
      .map((user) => user.id)

    const updateStmt = db.prepare(
      `
        UPDATE users 
        SET psw = ? 
        WHERE id = ?
      `
    )

    const transaction = db.transaction((_userIds) => {
      for (const _userId of _userIds) {
        updateStmt.run(generatePassword(), _userId)
      }
    })

    transaction(userIds)

    res.json({
      success: true,
      message: `Passwords generated for ${userIds.length} users`,
    })
  } catch (err) {
    console.error('GenPsws error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const genPsw = (req, res) => {
  try {
    const { tgId } = req.params

    db.prepare(
      `
        UPDATE users 
        SET psw = ? 
        WHERE tg_id = ?
      `
    ).run(generatePassword(), tgId)

    res.json({
      success: true,
      message: `Password generated for users with tg_id ${tgId}`,
    })
  } catch (err) {
    console.error('GenPsw error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
