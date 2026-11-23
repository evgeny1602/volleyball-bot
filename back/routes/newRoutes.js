import express from 'express'
import * as newController from '../controllers/newController.js'

import { isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/', isAdmin, newController.createNew)
router.get('/', newController.getAllNews)
router.get('/:id', newController.getNewById)
router.put('/:id', isAdmin, newController.updateNew)
router.delete('/:id', isAdmin, newController.deleteNew)
router.patch('/:id/status', isAdmin, newController.setNewStatus)

export default router
