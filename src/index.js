import './helpers/dotenv'

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import logger from './helpers/logger'
import router from './routes'
import { notFound, errorHandler } from './helpers/errors'

const port = Number(process.env.PORT)
const app = express()

app.use(morgan(process.env.MORGAN_LOG))
app.use(cors({ origin: process.env.ORIGIN, exposedHeaders: ['x-total-count', 'x-total-pages'] }))
app.use(helmet())
app.use(bodyParser.json())


app.use('/', router)

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => logger.info(`Application started at http://localhost:${process.env.PORT}`),
)
