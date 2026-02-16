import db from './db.js'

const initSqls = [
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
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location_name TEXT,
      location_address TEXT,
      start_datetime DATETIME,
      duration INTEGER,
      description TEXT,
      price FLOAT,
      max_players INTEGER,
      mode TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      location_name TEXT,
      location_address TEXT,
      date TEXT,
      time TEXT,
      duration INTEGER,
      description TEXT,
      price FLOAT,
      max_players INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS users_to_games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      game_id INTEGER,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  `
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
]

export const initDatabase = () => {
  const createTables = db.transaction(() => {
    for (const sql of initSqls) {
      db.prepare(sql).run()
    }

    console.log('✅ База данных успешно проверена/инициализирована')
  })

  try {
    createTables()
  } catch (err) {
    console.error('❌ Ошибка при инициализации базы данных:', err)
    throw err
  }
}
