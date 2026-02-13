import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDatabase } from './init-db.js'
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import { validateTelegramData } from './middleware/auth.js'

const app = express()
const PORT = 3000

app.disable('etag')

initDatabase()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'x-telegram-init-data'],
  })
)
app.use(express.json())

app.use(validateTelegramData)

app.use('/api/users', userRoutes)
app.use('/api/games', gameRoutes)

app.listen(PORT, () =>
  console.log(
    `API запущен на порту ${PORT}\nТекущий режим: ${process.env.NODE_ENV}`
  )
)
