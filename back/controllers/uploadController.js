import path from 'path'
import fs from 'fs'

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded.' })
  }

  const targetFilename = `${new Date().getTime()}_${req.file.originalname}`

  const targetPath = path.join('uploads', targetFilename)
  const srcFilePath = path.join('uploads', req.file.filename)

  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(srcFilePath)
    return res
      .status(400)
      .json({ success: false, error: 'File already exists.' })
  }

  fs.renameSync(srcFilePath, targetPath)

  res.json({ success: true, url: `/uploads/${targetFilename}` })
}

export const deleteFile = (req, res) => {
  const { filename } = req.params

  if (filename.includes('/')) {
    return res.status(400).json({ success: false, error: 'Invalid filename' })
  }

  const filePath = path.join('uploads', filename)

  console.log('File path:', filePath)

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: 'File not found' })
  }

  try {
    fs.unlinkSync(filePath)
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ success: false, error: 'Failed to delete file' })
  }

  res.json({ success: true, message: 'File deleted successfully' })
}
