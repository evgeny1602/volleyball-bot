import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDatabase } from './init-db.js'
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import templateRoutes from './routes/templateRoutes.js'
import newRoutes from './routes/newRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { validateTelegramData } from './middleware/auth.js'
import { dbLogger } from './middleware/logger.js'

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

app.use(dbLogger)

app.use('/uploads', express.static('uploads'))

app.use('/api/users', userRoutes)
app.use('/api/games', gameRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/news', newRoutes)
app.use('/api/upload', uploadRoutes)

app.listen(PORT, () =>
  console.log(
    `API запущен на порту ${PORT}\nТекущий режим: ${process.env.NODE_ENV}`
  )
)
