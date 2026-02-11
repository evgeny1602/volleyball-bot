import express from 'express'
import cors from 'cors'
import { initDatabase } from './init-db.js'
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'

const app = express()
const PORT = 3000

initDatabase()

app.use(
  cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'] })
)
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/games', gameRoutes)

app.listen(PORT, () => console.log(`API запущен на порту ${PORT}`))
