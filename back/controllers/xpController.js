import db from '../db.js'
import { GMT } from './utils.js'

const xpForGame = 100
const xpForReceivedThank = 15
const xpForSentThank = 25

const calcUserXpBalance = (
  playedGamesCount,
  receivedThanksCount,
  sentThanksCount
) => {
  const xpBalance =
    xpForGame * playedGamesCount +
    xpForReceivedThank * receivedThanksCount +
    xpForSentThank * sentThanksCount

  return xpBalance
}

export const getUserXp = (req, res) => {
  try {
    const { userId } = req.params

    const playedGamesCount = db
      .prepare(
        `SELECT COUNT(*) as count FROM users_to_games ug 
         JOIN games g ON ug.game_id = g.id 
         WHERE datetime(g.start_datetime, '+' || g.duration || ' minutes') < datetime('now', '+${GMT} hours') 
         AND ug.user_id = ? 
         AND ug.status = 'main';`
      )
      .get(userId).count

    const receivedThanksCount = db
      .prepare(`SELECT COUNT(*) as count FROM thanks WHERE to_user_id = ?;`)
      .get(userId).count

    const sentThanksCount = db
      .prepare(`SELECT COUNT(*) as count FROM thanks WHERE from_user_id = ?;`)
      .get(userId).count

    const xpBalance = calcUserXpBalance(
      playedGamesCount,
      receivedThanksCount,
      sentThanksCount
    )

    const rank = db
      .prepare(
        `
          SELECT number, name
          FROM user_ranks
          WHERE min_xp <= ?
          ORDER BY min_xp DESC
          LIMIT 1
        `
      )
      .get(xpBalance)

    const nextRank = db
      .prepare(
        `
          SELECT number, name, min_xp
          FROM user_ranks
          WHERE min_xp > ?
          ORDER BY min_xp ASC
          LIMIT 1
        `
      )
      .get(xpBalance)

    res.json({
      success: true,
      xpBalance,
      rank,
      nextRank,
      stats: {
        games: playedGamesCount,
        received: receivedThanksCount,
        sent: sentThanksCount,
      },
    })
  } catch (err) {
    console.error('XP Calculation Error:', err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}
