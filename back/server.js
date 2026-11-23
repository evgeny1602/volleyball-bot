import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { initDatabase } from './init-db.js'

import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import templateRoutes from './routes/templateRoutes.js'
import thankRoutes from './routes/thankRoutes.js'
import newRoutes from './routes/newRoutes.js'
import xpRoutes from './routes/xpRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { isRegistered } from './middleware/auth.js'

const app = express()
const PORT = 3000

app.disable('etag')

initDatabase()

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/uploads', express.static('uploads'))
app.use('/avatars', express.static('avatars'))

app.use('/api/users', isRegistered, userRoutes)
app.use('/api/games', isRegistered, gameRoutes)
app.use('/api/templates', isRegistered, templateRoutes)
app.use('/api/news', isRegistered, newRoutes)
app.use('/api/thanks', isRegistered, thankRoutes)
app.use('/api/xp', isRegistered, xpRoutes)
app.use('/api/upload', isRegistered, uploadRoutes)

app.listen(PORT, () =>
  console.log(
    `API запущен на порту ${PORT}\nТекущий режим: ${process.env.NODE_ENV}`
  )
)
