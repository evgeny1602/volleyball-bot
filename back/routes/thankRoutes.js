import express from 'express'
import * as thankController from '../controllers/thankController.js'

const router = express.Router()

router.post('/', thankController.addThank)
router.get(
  '/given/:gameId/:fromUserId/:toUserId',
  thankController.getGivenThank
)
router.get('/rest/:gameId/:fromUserId/:toUserId', thankController.getRestThanks)
router.get('/:toUserId', thankController.getUserThanks)

export default router
