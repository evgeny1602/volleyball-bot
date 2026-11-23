import express from 'express'
import * as userController from '../controllers/userController.js'

import { isAdmin, isRegistered } from '../middleware/auth.js'

const router = express.Router()

router.post('/promo', userController.createPromoRequest)
router.get('/promo', isAdmin, userController.getAllPromoRequests)
router.delete('/promo/:requestId', isAdmin, userController.deletePromoRequest)

router.post('/', userController.createUser)

router.get('/by_phone/:phone', isRegistered, userController.getUserByPhone)
router.get('/gen_psw/:tgId', isAdmin, userController.genPsw)
// router.get('/gen_psws', userController.genPsws)
router.get('/:tgId', isRegistered, userController.getUserByTgId)
router.get('/', isRegistered, userController.getAllUsers)

router.delete('/:tgId', isAdmin, userController.deleteUser)

router.patch('/approve/:tgId', isAdmin, userController.approveUser)
router.patch('/reject/:tgId', isAdmin, userController.rejectUser)

router.post('/set_avatar', isRegistered, userController.setAvatar)
router.post('/guest', isAdmin, userController.createGuestUser)
router.post('/login', userController.login)

export default router
