import db from '../db.js'

export const getAllTemplates = (req, res) => {
  try {
    const templates = db
      .prepare('SELECT * FROM templates ORDER BY name ASC')
      .all()
    res.json({ success: true, count: templates.length, data: templates })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getTemplateById = (req, res) => {
  try {
    const { id } = req.params
    const template = db.prepare(`SELECT * FROM templates WHERE id = ?`).get(id)
    res.json(
      template
        ? { success: true, template }
        : { success: false, error: 'Template not found' }
    )
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createTemplate = (req, res) => {
  try {
    const {
      name,
      location: location_name,
      address: location_address,
      date,
      time,
      duration,
      description,
      price,
      maxPlayers: max_players,
    } = req.body

    const requiredFields = ['name']

    for (const value of requiredFields) {
      if (!value || value === null || value === '') {
        return res
          .status(400)
          .json({ error: `Required fields: ${requiredFields.join(', ')}` })
      }
    }

    const stmt = db.prepare(`
      INSERT INTO templates (name, location_name, location_address, date, time, duration, description, price, max_players)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const info = stmt.run(
      name,
      location_name || '',
      location_address || '',
      date || '',
      time || '',
      duration || 120,
      description || '',
      price || 0,
      max_players || 14
    )

    res.status(201).json({
      success: true,
      message: 'Template created successfully',
      gameId: info.lastInsertRowid,
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTemplate = (req, res) => {
  try {
    const { id } = req.params
    const {
      name,
      location: location_name,
      address: location_address,
      date,
      time,
      duration,
      description,
      price,
      maxPlayers: max_players,
    } = req.body

    const stmt = db.prepare(`
      UPDATE templates 
      SET name = ?, location_name = ?, location_address = ?, date = ?, time = ?, 
          duration = ?, description = ?, price = ?, max_players = ? WHERE id = ?
    `)

    const info = stmt.run(
      name,
      location_name || '',
      location_address || '',
      date || '',
      time || '',
      duration || '',
      description || '',
      price || '',
      max_players || '',
      id
    )

    if (info.changes > 0) {
      res.json({ success: true, message: 'Template updated successfully' })
    } else {
      res.status(404).json({ success: false, error: 'Game not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteTemplate = (req, res) => {
  try {
    const { id } = req.params

    const info = db.prepare('DELETE FROM templates WHERE id = ?').run(id)

    if (info.changes > 0) {
      res.json({ success: true, message: `Template ${id} deleted` })
    } else {
      res.status(404).json({ success: false, error: 'Template not found' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
}
