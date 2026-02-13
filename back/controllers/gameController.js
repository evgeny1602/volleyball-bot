import db from '../db.js'

const GMT = +7

const getDateFromStr = (s) => {
  const [datePart, timePart] = s.split(' ')
  const [y, m, d] = datePart.split('.')
  const [hh, mm] = timePart.split(':')
  const dt = new Date(y, m - 1, d, hh, mm)
  dt.setHours(dt.getHours() + GMT)
  const _y = dt.getFullYear()
  const _m = (dt.getMonth() + 1).toString().padStart(2, '0')
  const _d = dt.getDate().toString().padStart(2, '0')
  const _hh = dt.getHours().toString().padStart(2, '0')
  const _mm = dt.getMinutes().toString().padStart(2, '0')
  return `${_y}-${_m}-${_d} ${_hh}:${_mm}`
}

const getGamePlayers = (id) =>
  db
    .prepare(
      `select users.*, users_to_games.status, users_to_games.created_at as login_date from users_to_games LEFT JOIN users ON users_to_games.user_id=users.id where users_to_games.game_id=? ORDER BY users_to_games.created_at ASC`
    )
    .all(id)

export const getAllGames = (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM games ORDER BY start_datetime DESC')
    const games = stmt.all()
    const data = games.map((game) => ({
      ...game,
      players: getGamePlayers(game.id),
    }))
    res.json({ success: true, count: games.length, data })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getGameById = (req, res) => {
  try {
    const { id } = req.params
    const game = db.prepare(`SELECT * FROM games WHERE id = ?`).get(id)
    res.json(
      game
        ? { success: true, game: { ...game, players: getGamePlayers(id) } }
        : { success: false, error: 'Game not found' }
    )
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createGame = (req, res) => {
  try {
    const {
      name,
      location: location_name,
      address: location_address,
      date,
      time,
      duration,
      description,
      price,
      maxPlayers: max_players,
    } = req.body

    const start_datetime = getDateFromStr(`${date} ${time}`)

    for (const value of [
      name,
      location_name,
      location_address,
      date,
      time,
      duration,
      description,
      price,
      max_players,
    ]) {
      if (!value || value === null || value === '') {
        return res.status(400).json({ error: 'All fields are required' })
      }
    }

    const stmt = db.prepare(`
      INSERT INTO games (name, location_name, location_address, start_datetime, duration, description, price, max_players, mode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const info = stmt.run(
      name,
      location_name || null,
      location_address || null,
      start_datetime,
      duration || 120,
      description || null,
      price || 0,
      max_players || 14,
      'main'
    )

    res.status(201).json({
      success: true,
      message: 'Game created successfully',
      gameId: info.lastInsertRowid,
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateGame = (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      location: location_name,
      address: location_address,
      date,
      time,
      duration,
      description,
      price,
      maxPlayers: max_players,
      mode,
    } = req.body

    const start_datetime = getDateFromStr(`${date} ${time}`)

    const stmt = db.prepare(`
      UPDATE games 
      SET name = ?, location_name = ?, location_address = ?, start_datetime = ?, 
          duration = ?, description = ?, price = ?, max_players = ?, mode = ?
      WHERE id = ?
    `)

    const info = stmt.run(
      name,
      location_name,
      location_address,
      start_datetime,
      duration,
      description,
      price,
      max_players,
      mode,
      id
    )

    if (info.changes > 0) {
      res.json({ success: true, message: 'Game updated successfully' })
    } else {
      res.status(404).json({ success: false, error: 'Game not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteGame = (req, res) => {
  try {
    const { id } = req.params

    const guests = db
      .prepare(
        `SELECT users.tg_id as tg_id FROM users_to_games LEFT JOIN users ON users_to_games.user_id=users.id WHERE users.tg_id < 0 AND users_to_games.game_id=?`
      )
      .all(id)

    const deleteMany = db.transaction((tgIds) => {
      const stmt = db.prepare('DELETE FROM users WHERE tg_id = ?')
      for (const tgId of tgIds) {
        stmt.run(tgId)
      }
    })

    deleteMany(guests.map((guest) => guest.tg_id))

    db.prepare(`DELETE FROM users_to_games WHERE game_id = ?`).run(id)

    const info = db.prepare('DELETE FROM games WHERE id = ?').run(id)

    if (info.changes > 0) {
      res.json({ success: true, message: `Game ${id} deleted` })
    } else {
      res.status(404).json({ success: false, error: 'Game not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const joinGame = (req, res) => {
  try {
    const { id: game_id } = req.params
    const { user_id } = req.body

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const game = db
      .prepare('SELECT max_players, mode FROM games WHERE id = ?')
      .get(game_id)

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    const existingPlayer = db
      .prepare(
        'SELECT id FROM users_to_games WHERE game_id = ? AND user_id = ?'
      )
      .get(game_id, user_id)

    if (existingPlayer) {
      return res.status(400).json({ error: 'Player already joined this game' })
    }

    const { current_count } = db
      .prepare(
        "SELECT COUNT(*) as current_count FROM users_to_games WHERE game_id = ? AND status = 'main'"
      )
      .get(game_id)

    const restCount = game.max_players - current_count

    const status =
      game.mode == 'reserve' ? 'reserve' : restCount > 0 ? 'main' : 'reserve'

    const gameNewMode = restCount <= 1 ? 'reserve' : 'main'

    const stmt = db.prepare(`
      INSERT INTO users_to_games (game_id, user_id, status, created_at)
      VALUES (?, ?, ?, datetime('now', '+${GMT} hours'))
    `)

    stmt.run(game_id, user_id, status)

    if (game.mode == 'main' && gameNewMode == 'reserve') {
      const stmt = db.prepare(`
        UPDATE games SET mode = ? WHERE id = ?
      `)
      stmt.run(gameNewMode, game_id)
    }

    res.json({
      success: true,
      status,
      message: status === 'main' ? 'Joined main roster' : 'Joined reserve',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const leaveGame = (req, res) => {
  try {
    const { id: game_id } = req.params
    const { user_id } = req.body

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const playerRecord = db
      .prepare(
        'SELECT status FROM users_to_games WHERE game_id = ? AND user_id = ?'
      )
      .get(game_id, user_id)

    if (!playerRecord) {
      return res.status(404).json({ error: 'Player record not found' })
    }

    db.prepare(
      'DELETE FROM users_to_games WHERE game_id = ? AND user_id = ?'
    ).run(game_id, user_id)

    const tgId = db.prepare('SELECT tg_id FROM users WHERE id = ?').get(user_id)

    if (tgId && parseInt(tgId.tg_id) < 0) {
      db.prepare('DELETE FROM users WHERE tg_id = ?').run(tgId.tg_id)
    }

    res.json({
      success: true,
      message: 'Successfully left the game',
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const promotePlayer = (req, res) => {
  try {
    const { id: game_id } = req.params
    const { user_id } = req.body

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const playerRecord = db
      .prepare(
        'SELECT status FROM users_to_games WHERE game_id = ? AND user_id = ?'
      )
      .get(game_id, user_id)

    if (!playerRecord) {
      return res.status(404).json({ error: 'Player not found in this game' })
    }

    if (playerRecord.status === 'main') {
      return res
        .status(400)
        .json({ error: 'Player is already in the main roster' })
    }

    const game = db
      .prepare('SELECT max_players FROM games WHERE id = ?')
      .get(game_id)
    const { current_main_count } = db
      .prepare(
        "SELECT COUNT(*) as current_main_count FROM users_to_games WHERE game_id = ? AND status = 'main'"
      )
      .get(game_id)

    if (current_main_count >= game.max_players) {
      return res.status(400).json({
        error: 'Main roster is full. Remove someone first or increase limit.',
      })
    }

    const stmt = db.prepare(`
      UPDATE users_to_games 
      SET status = 'main' 
      WHERE game_id = ? AND user_id = ?
    `)

    const info = stmt.run(game_id, user_id)

    if (info.changes > 0) {
      res.json({
        success: true,
        message: 'Player promoted to main roster successfully',
      })
    } else {
      res.status(500).json({ error: 'Failed to update player status' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
