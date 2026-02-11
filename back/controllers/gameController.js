import db from '../db.js'

const getGamePlayers = (id) =>
  db
    .prepare(
      `select users.*, users_to_games.status from users_to_games LEFT JOIN users ON users_to_games.user_id=users.id where users_to_games.game_id=?`
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
        ? { success: true, game, players: getGamePlayers(id) }
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

    const parts = date.split('.')
    const start_datetime = `${parts[2]}-${parts[1]}-${parts[0]} ${time}`

    for (const value of [
      name,
      location_name,
      location_address,
      start_datetime,
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
      INSERT INTO games (name, location_name, location_address, start_datetime, duration, description, price, max_players)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const info = stmt.run(
      name,
      location_name || null,
      location_address || null,
      start_datetime,
      duration || 120,
      description || null,
      price || 0,
      max_players || 14
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
      location_name,
      location_address,
      start_datetime,
      duration,
      description,
      price,
      max_players,
    } = req.body

    const stmt = db.prepare(`
      UPDATE games 
      SET name = ?, location_name = ?, location_address = ?, start_datetime = ?, 
          duration = ?, description = ?, price = ?, max_players = ?
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
