import express from 'express'
import * as uploadController from '../controllers/uploadController.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

const router = express.Router()

router.post('/', upload.single('image'), uploadController.uploadFile)
router.delete('/:filename', uploadController.deleteFile)

export default router
