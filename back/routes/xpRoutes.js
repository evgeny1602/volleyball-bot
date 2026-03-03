import express from 'express'
import * as xpController from '../controllers/xpController.js'

const router = express.Router()

router.get('/:userId', xpController.getUserXp)

export default router
