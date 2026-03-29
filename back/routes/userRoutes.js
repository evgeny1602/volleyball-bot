import express from 'express'
import * as userController from '../controllers/userController.js'

const router = express.Router()

router.post('/', userController.createUser)

router.get('/by_phone/:phone', userController.getUserByPhone)
router.get('/gen_psw/:tgId', userController.genPsw)
router.get('/gen_psws', userController.genPsws)
router.get('/:tgId', userController.getUserByTgId)
router.get('/', userController.getAllUsers)

router.delete('/:tgId', userController.deleteUser)

router.patch('/approve/:tgId', userController.approveUser)
router.patch('/reject/:tgId', userController.rejectUser)

router.post('/set_avatar', userController.setAvatar)
router.post('/guest', userController.createGuestUser)
router.post('/login', userController.login)

export default router
