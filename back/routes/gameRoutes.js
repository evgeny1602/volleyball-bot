import express from 'express'
import * as gameController from '../controllers/gameController.js'

const router = express.Router()

router.post('/', gameController.createGame)
router.get('/', gameController.getAllGames)
router.get('/:id', gameController.getGameById)
router.put('/:id', gameController.updateGame)
router.delete('/:id', gameController.deleteGame)

router.post('/:id/join', gameController.joinGame)
router.post('/:id/leave', gameController.leaveGame)
router.post('/:id/promote', gameController.promotePlayer)

export default router
