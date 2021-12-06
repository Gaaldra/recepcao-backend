import 'dotenv/config'
import express from 'express'
import { routes } from './routes'
import './database/config'
const PORT = Number(process.env.PORT) || 3008

const app = express()

app.use(express.json())
app.use(routes)

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Hosteando na ${PORT}`)
)

export { app }
