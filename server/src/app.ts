import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import logger from './utils/logger'
import { MONGO_URI, PORT } from './utils/database'

// App
export const app = express()

// MongoDB connection
mongoose.connect(`${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB database connection established successfully'))
  .catch((error) => logger.error(`MongoDB connection error: ${error}`))

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

// Routes
import { IndexRouter } from './routes/index'
import { UserRouter } from './routes/user'
app.use('/', IndexRouter)
app.use('/user', UserRouter)

app.listen(PORT, () => { logger.info(`Server running on port ${PORT}`) })