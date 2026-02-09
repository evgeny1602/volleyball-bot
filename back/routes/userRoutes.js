import express from 'express'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:tgId', userController.getUserByTgId)
router.post('/', userController.createUser)
router.patch('/approve/:tgId', userController.approveUser)
router.patch('/reject/:tgId', userController.rejectUser)
router.delete('/:tgId', userController.deleteUser)

export default router
