import db from './db.js'

export const initDatabase = () => {
  const createTables = db.transaction(() => {
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tg_id INTEGER UNIQUE NOT NULL,
        tg_username TEXT,
        tg_avatar_url TEXT,
        fio TEXT,
        gender TEXT,
        phone TEXT,
        birthday DATETIME,
        role TEXT,
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
