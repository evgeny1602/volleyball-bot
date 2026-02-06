import express from 'express'
import { initDatabase } from './init-db.js'

const app = express()

initDatabase()

app.use(express.json())

app.post('/api/users', (req, res) => {
  const { name, telegram_id } = req.body

  try {
    const stmt = db.prepare(
      'INSERT INTO users (name, telegram_id) VALUES (?, ?)'
    )
    const info = stmt.run(name, telegram_id)
    res.json({ id: info.lastInsertRowid })
  } catch (error) {
    res.status(400).json({ error: 'User already exists' })
  }
})

app.listen(3000, () => console.log('API запущен на порту 3000'))
