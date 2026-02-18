import db from '../db.js'
import fs from 'fs'

export const getAllNews = (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all()

    res.json({
      success: true,
      count: news.length,
      data: news,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

export const getNewById = (req, res) => {
  try {
    const { id } = req.params
    const item = db.prepare(`SELECT * FROM news WHERE id = ?`).get(id)

    res.json(
      item
        ? { success: true, data: item }
        : { success: false, error: 'New not found' }
    )
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

export const createNew = (req, res) => {
  try {
    const { title, content, image_url, enabled } = req.body

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: false, error: 'Title and content are required' })
    }

    const stmt = db.prepare(`
      INSERT INTO news (title, content, image_url, enabled)
      VALUES (?, ?, ?, ?)
    `)

    const info = stmt.run(title, content, image_url || '', enabled || 0)

    res.status(201).json({
      success: true,
      message: 'New created successfully',
      newsId: info.lastInsertRowid,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

export const updateNew = (req, res) => {
  try {
    const { id } = req.params
    const { title, content, image_url, enabled } = req.body

    const stmt = db.prepare(`
      UPDATE news 
      SET title = ?, content = ?, image_url = ?, enabled = ?
      WHERE id = ?
    `)

    const info = stmt.run(title, content, image_url || '', enabled || 0, id)

    if (info.changes > 0) {
      res.json({ success: true, message: 'New updated successfully' })
    } else {
      res.status(404).json({ success: false, error: 'New not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

const deleteFileByUrl = (url) => {
  if (!url || url == '') return

  const imagePath = url.split('/')
  const imageName = imagePath[imagePath.length - 1]
  const filePath = `./uploads/${imageName}`

  if (!fs.existsSync(filePath)) return

  try {
    fs.unlinkSync(filePath)
  } catch (err) {
    console.error(err)
  }
}

export const deleteNew = (req, res) => {
  try {
    const { id } = req.params

    const imageData = db
      .prepare(`SELECT image_url FROM news WHERE id = ?`)
      .get(id)

    deleteFileByUrl(imageData.image_url)

    const info = db.prepare('DELETE FROM news WHERE id = ?').run(id)

    if (info.changes > 0) {
      res.json({ success: true, message: `New ${id} deleted` })
    } else {
      res.status(404).json({ success: false, error: 'New not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

export const setNewStatus = (req, res) => {
  try {
    const { id } = req.params
    const { enabled } = req.body

    const info = db
      .prepare('UPDATE news SET enabled = ? WHERE id = ?')
      .run(enabled, id)

    if (info.changes > 0) {
      res.json({ success: true, message: `Status set to ${enabled}` })
    } else {
      res.status(404).json({ success: false, error: 'New not found' })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}
