import { environment } from './config/config';
import express from 'express'
import { routes } from './routes/router'
import cors from 'cors'
import path from 'path'
const app = express()
const corsOptions = environment.security.cors
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files/images/locales', express.static(path.resolve(__dirname, '..', 'tmp', 'images', 'locales')))

export { app }