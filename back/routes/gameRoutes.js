import express from 'express'
import * as gameController from '../controllers/gameController.js'

import { isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/', gameController.createGame)
router.post('/:gameId/join', gameController.joinGame)
router.post('/:gameId/leave', gameController.leaveGame)
router.post('/:gameId/promote', isAdmin, gameController.promotePlayer)

router.get('/', gameController.getAllGames)
router.get('/:gameId', gameController.getGameById)

router.put('/:gameId', isAdmin, gameController.updateGame)

router.delete('/:gameId', isAdmin, gameController.deleteGame)

export default router
