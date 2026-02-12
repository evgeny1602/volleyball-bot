import express from 'express'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)
router.get('/:tgId', userController.getUserByTgId)
router.delete('/:tgId', userController.deleteUser)

router.patch('/approve/:tgId', userController.approveUser)
router.patch('/reject/:tgId', userController.rejectUser)

router.post('/guest', userController.createGuestUser)

export default router
