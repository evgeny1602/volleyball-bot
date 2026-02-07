import express from 'express'
import cors from 'cors'
import { initDatabase } from './init-db.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const PORT = 3000

initDatabase()

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'] }))
app.use(express.json())

app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`API запущен на порту ${PORT}`))
