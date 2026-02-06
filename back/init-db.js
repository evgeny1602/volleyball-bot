import db from './db.js'

export const initDatabase = () => {
  const createTables = db.transaction(() => {
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tg_id INTEGER UNIQUE NOT NULL,
        username TEXT,
        first_name TEXT,
        last_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    ).run()

    console.log('✅ База данных успешно проверена/инициализирована')
  })

  try {
    createTables()
  } catch (err) {
    console.error('❌ Ошибка при инициализации базы данных:', err)
    throw err
  }
}
