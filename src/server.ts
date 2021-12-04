import express from 'express'
const PORT = Number(process.env.PORT) || 3008

const app = express()

app.use(express.json())
app.get('/', (request, response) => {
  return response.json({ message: 'Hellor, World!' })
})

app.listen(PORT, '0.0.0.0', () =>
  console.log(`Hosteando na ${PORT}`)
)
