import express from 'express'
import * as newController from '../controllers/newController.js'

const router = express.Router()

router.post('/', newController.createNew)
router.get('/', newController.getAllNews)
router.get('/:id', newController.getNewById)
router.put('/:id', newController.updateNew)
router.delete('/:id', newController.deleteNew)

export default router
