import express from 'express'
import * as templateController from '../controllers/templateController.js'

import { isAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/', isAdmin, templateController.createTemplate)
router.get('/', templateController.getAllTemplates)
router.get('/:id', templateController.getTemplateById)
router.put('/:id', isAdmin, templateController.updateTemplate)
router.delete('/:id', isAdmin, templateController.deleteTemplate)

export default router
