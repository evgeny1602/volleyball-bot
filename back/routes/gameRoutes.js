import express from 'express'
import * as gameController from '../controllers/gameController.js'

const router = express.Router()

router.post('/', gameController.createGame)
router.post('/:gameId/join', gameController.joinGame)
router.post('/:gameId/leave', gameController.leaveGame)
router.post('/:gameId/promote', gameController.promotePlayer)

router.get('/', gameController.getAllGames)
router.get('/:gameId', gameController.getGameById)

router.put('/:gameId', gameController.updateGame)

router.delete('/:gameId', gameController.deleteGame)

export default router
