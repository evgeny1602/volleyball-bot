import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = join(__dirname, 'data', 'main.db')
const db = new Database(dbPath, { verbose: console.log })

db.pragma('journal_mode = WAL')

try {
  const result = db.prepare('SELECT sqlite_version() AS version').get()
  console.log(`✅ SQLite подключена. Версия: ${result.version}`)
} catch (err) {
  console.error('❌ Ошибка подключения к базе:', err.message)
  process.exit(1)
}
