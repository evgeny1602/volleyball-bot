import db from '../db.js'
import { getDateFromStr, GMT } from './utils.js'

const LOOKBACK_DAYS = 184

export const getAllGames = (req, res) => {
  const startDate = `datetime('now', '-${LOOKBACK_DAYS} days')`

  try {
    const thanks = db
      .prepare(
        `
          SELECT
            tt.id AS id,
            tt.name AS name,
            t.game_id AS game_id,
            t.from_user_id AS from_user_id,
            t.to_user_id AS to_user_id
          FROM
            thanks t
          JOIN
            thank_types tt ON t.type_id = tt.id
          WHERE
            datetime(t.created_at) > ${startDate}
        `
      )
      .all()

    const players = db
      .prepare(
        `
          SELECT 
            u.*, 
            ug.game_id AS game_id, 
            ug.status, 
            ug.created_at AS login_date
          FROM 
            users_to_games ug 
          LEFT JOIN 
            users u ON ug.user_id=u.id 
          WHERE 
            datetime(ug.created_at) > ${startDate}
          ORDER BY 
            ug.created_at ASC
        `
      )
      .all()

    const games = db
      .prepare(
        `
          SELECT *
          FROM games
          WHERE datetime(start_datetime) > ${startDate}
          ORDER BY start_datetime ASC
        `
      )
      .all()

    const gamesWithPlayersAndThanks = games.map((game) => ({
      ...game,
      players: players
        .filter((player) => player.game_id === game.id)
        .map((player) => ({
          ...player,
          thanks: thanks.filter(
            (thank) =>
              thank.to_user_id === player.id && thank.game_id === game.id
          ),
        })),
    }))

    res.json({
      success: true,
      data: gamesWithPlayersAndThanks,
      count: gamesWithPlayersAndThanks.length,
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getGameById = (req, res) => {
  try {
    const { gameId } = req.params

    const thanks = db
      .prepare(
        `
          SELECT
            tt.id AS id,
            tt.name AS name,
            t.game_id AS game_id,
            t.from_user_id AS from_user_id,
            t.to_user_id AS to_user_id
          FROM
            thanks t
          JOIN 
            thank_types tt ON t.type_id = tt.id
          WHERE 
            t.game_id = ?
        `
      )
      .all(gameId)

    const players = db
      .prepare(
        `
          SELECT 
            u.*, 
            ug.status, 
            ug.created_at AS login_date
          FROM 
            users_to_games ug 
          LEFT JOIN 
            users u ON ug.user_id=u.id 
          WHERE 
            ug.game_id = ? 
          ORDER BY 
            ug.created_at ASC
        `
      )
      .all(gameId)

    const game = db
      .prepare(
        `
          SELECT * FROM games 
          WHERE id = ?
        `
      )
      .get(gameId)

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    const playersWithThanks = players.map((player) => ({
      ...player,
      thanks: thanks.filter((thank) => thank.to_user_id === player.id),
    }))

    const gameWithPlayers = {
      ...game,
      players: playersWithThanks,
    }

    return res.json({
      success: true,
      game: gameWithPlayers,
    })
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

    const info = db
      .prepare(
        `
          INSERT INTO games (
            name,
            location_name,
            location_address,
            start_datetime,
            duration,
            description,
            price,
            max_players,
            mode,
            created_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', '+${GMT} hours'))
        `
      )
      .run(
        name,
        location_name || '',
        location_address || '',
        getDateFromStr(`${date} ${time}`, 0),
        duration || 120,
        description || '',
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
    const { gameId } = req.params
    const {
      name,
      location,
      address,
      date,
      time,
      duration,
      description,
      price,
      maxPlayers,
      mode,
    } = req.body

    const info = db
      .prepare(
        `
          UPDATE games 
          SET 
            name = ?, 
            location_name = ?, 
            location_address = ?, 
            start_datetime = ?, 
            duration = ?, 
            description = ?, 
            price = ?, 
            max_players = ?, 
            mode = ?
          WHERE id = ?
        `
      )
      .run(
        name,
        location,
        address,
        getDateFromStr(`${date} ${time}`, 0),
        duration,
        description,
        price,
        maxPlayers,
        mode,
        gameId
      )

    if (info.changes > 0) {
      res.json({
        success: true,
        message: 'Game updated successfully',
      })
    } else {
      res.status(404).json({
        success: false,
        error: 'Game not found',
      })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteGame = (req, res) => {
  try {
    const { gameId } = req.params

    const guestIds = db
      .prepare(
        `
          SELECT 
            u.id as id 
          FROM 
            users_to_games ug 
          LEFT JOIN 
            users u ON ug.user_id=u.id 
          WHERE 
            u.tg_username = 'Guest' 
            AND ug.game_id = ?
        `
      )
      .all(gameId)
      .map((guest) => guest.id)

    const deleteMany = db.transaction((userIds) => {
      const stmt = db.prepare(
        `
          DELETE FROM users 
          WHERE id = ?
        `
      )
      for (const userId of userIds) {
        stmt.run(userId)
      }
    })

    deleteMany(guestIds)

    db.prepare(
      `
        DELETE FROM users_to_games 
        WHERE game_id = ?
      `
    ).run(gameId)

    const info = db
      .prepare(
        `
          DELETE FROM games 
          WHERE id = ?
        `
      )
      .run(gameId)

    if (info.changes > 0) {
      res.json({
        success: true,
        message: `Game ${gameId} deleted`,
      })
    } else {
      res.status(404).json({
        success: false,
        error: 'Game not found',
      })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const joinGame = (req, res) => {
  try {
    const { gameId } = req.params
    const { user_id: userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const game = db
      .prepare(
        `
          SELECT max_players, mode 
          FROM games 
          WHERE id = ?
        `
      )
      .get(gameId)

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    const existingPlayer = db
      .prepare(
        `
          SELECT id 
          FROM users_to_games 
          WHERE game_id = ? AND user_id = ?
        `
      )
      .get(gameId, userId)

    if (existingPlayer) {
      return res.status(400).json({ error: 'Player already joined this game' })
    }

    const { cnt: currentCountMain } = db
      .prepare(
        `
          SELECT COUNT(*) as cnt 
          FROM users_to_games 
          WHERE game_id = ? AND status = 'main'
        `
      )
      .get(gameId)

    const restCountMain = game.max_players - currentCountMain

    const status =
      game.mode == 'reserve'
        ? 'reserve'
        : restCountMain > 0
        ? 'main'
        : 'reserve'

    const gameNewMode = restCountMain <= 1 ? 'reserve' : 'main'

    db.prepare(
      `
        INSERT INTO users_to_games (game_id, user_id, status, created_at)
        VALUES (?, ?, ?, datetime('now', '+${GMT} hours'))
      `
    ).run(gameId, userId, status)

    if (game.mode == 'main' && gameNewMode == 'reserve') {
      db.prepare(
        `
          UPDATE games 
          SET mode = ? 
          WHERE id = ?
        `
      ).run(gameNewMode, gameId)
    }

    const message = {
      main: 'Joined main roster',
      reserve: 'Joined reserve',
    }[status]

    res.json({
      success: true,
      status,
      message,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const leaveGame = (req, res) => {
  try {
    const { gameId } = req.params
    const { user_id: userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const game = db
      .prepare(
        `
          SELECT max_players, mode 
          FROM games 
          WHERE id = ?
        `
      )
      .get(gameId)

    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }

    const playerRecord = db
      .prepare(
        `
          SELECT status 
          FROM users_to_games 
          WHERE game_id = ? AND user_id = ?
        `
      )
      .get(gameId, userId)

    if (!playerRecord) {
      return res.status(404).json({ error: 'Player record not found' })
    }

    db.prepare(
      `
        DELETE FROM users_to_games 
        WHERE game_id = ? AND user_id = ?
      `
    ).run(gameId, userId)

    const { cnt: currentCount } = db
      .prepare(
        `
          SELECT COUNT(*) as cnt 
          FROM users_to_games 
          WHERE game_id = ? AND status = 'main'
        `
      )
      .get(gameId)

    const restCount = game.max_players - currentCount

    const { cnt: currentCountReserve } = db
      .prepare(
        `
          SELECT COUNT(*) as cnt 
          FROM users_to_games 
          WHERE game_id = ? AND status = 'reserve'
        `
      )
      .get(gameId)

    if (restCount > 0 && currentCountReserve == 0 && game.mode == 'reserve') {
      db.prepare(
        `
          UPDATE games 
          SET mode = 'main' 
          WHERE id = ?
        `
      ).run(gameId)
    }

    const userData = db
      .prepare(
        `
          SELECT tg_username
          FROM users 
          WHERE id = ?
        `
      )
      .get(userId)

    if (userData?.tg_username == 'Guest') {
      db.prepare(
        `
          DELETE FROM users 
          WHERE id = ?
        `
      ).run(userId)
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
    const { gameId } = req.params
    const { user_id: userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    const playerRecord = db
      .prepare(
        `
          SELECT status 
          FROM users_to_games 
          WHERE game_id = ? AND user_id = ?
        `
      )
      .get(gameId, userId)

    if (!playerRecord) {
      return res.status(404).json({ error: 'Player not found in this game' })
    }

    if (playerRecord.status === 'main') {
      return res
        .status(400)
        .json({ error: 'Player is already in the main roster' })
    }

    const game = db
      .prepare(
        `
          SELECT max_players 
          FROM games 
          WHERE id = ?
        `
      )
      .get(gameId)

    const { cnt: currentMainCount } = db
      .prepare(
        `
          SELECT COUNT(*) as cnt 
          FROM users_to_games 
          WHERE game_id = ? AND status = 'main'
        `
      )
      .get(gameId)

    if (currentMainCount >= game.max_players) {
      return res.status(400).json({
        error: 'Main roster is full. Remove someone first or increase limit.',
      })
    }

    const info = db
      .prepare(
        `
          UPDATE users_to_games 
          SET status = 'main' 
          WHERE game_id = ? AND user_id = ?
        `
      )
      .run(gameId, userId)

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
