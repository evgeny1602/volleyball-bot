import db from '../db.js'
import { GMT } from './utils.js'

const getRestGameThanks = (gameId, fromUserId) =>
  db
    .prepare(
      'SELECT id, name FROM thank_types WHERE id NOT IN (SELECT type_id FROM thanks WHERE game_id = ? AND from_user_id = ?) ORDER BY id ASC'
    )
    .all(gameId, fromUserId)

const hasThankFromUser = (gameId, fromUserId, toUserId) =>
  db
    .prepare(
      'SELECT COUNT(*) as count FROM thanks WHERE game_id = ? AND from_user_id = ? AND to_user_id = ?'
    )
    .get(gameId, fromUserId, toUserId).count > 0

export const getPlayerThanks = (gameId, toUserId) =>
  db
    .prepare(
      `
        SELECT
          tt.id AS id,
          tt.name AS name,
          t.from_user_id AS from_user_id
        FROM
          thanks t
        JOIN thank_types tt ON t.type_id = tt.id
        WHERE
          t.game_id = ?
          AND t.to_user_id = ?
      `
    )
    .all(gameId, toUserId)

export const getRestThanks = (req, res) => {
  try {
    const { gameId, fromUserId, toUserId } = req.params

    if (
      hasThankFromUser(gameId, fromUserId, toUserId) ||
      fromUserId == toUserId
    ) {
      res.json({ success: true, thanks: [] })
      return
    }

    const thanks = getRestGameThanks(gameId, fromUserId)

    console.log({ thanks })

    res.json({ success: true, thanks })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const addThank = (req, res) => {
  try {
    const { gameId, fromUserId, toUserId, typeId, isAnonymous } = req.body

    const thank = db
      .prepare(
        `INSERT INTO thanks (game_id, to_user_id, from_user_id, type_id, is_anonymous, created_at) VALUES (?, ?, ?, ?, ?, datetime('now', '+${GMT} hours'))`
      )
      .run(gameId, toUserId, fromUserId, typeId, isAnonymous)
    res.json({ success: true, thank })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getUserThanks = (req, res) => {
  try {
    const { toUserId } = req.params

    const thanks = db
      .prepare(
        'SELECT t.created_at AS created_at, tt.name AS name, u.fio AS from_fio, t.is_anonymous AS is_anonymous FROM thanks t JOIN thank_types tt ON t.type_id = tt.id JOIN users u ON t.from_user_id = u.id WHERE t.to_user_id = ? ORDER BY t.created_at DESC'
      )
      .all(toUserId)
    res.json({ success: true, thanks })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getGivenThank = (req, res) => {
  try {
    const { gameId, fromUserId, toUserId } = req.params

    const thank = db
      .prepare(
        'SELECT t.type_id as type_id, tt.name AS name FROM thanks t JOIN thank_types tt ON t.type_id = tt.id WHERE t.game_id = ? AND t.to_user_id = ? AND t.from_user_id = ?'
      )
      .get(gameId, toUserId, fromUserId)

    res.json({ success: true, thank })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
