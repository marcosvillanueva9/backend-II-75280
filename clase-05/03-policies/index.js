import express from 'express';
import sessionRouter from './src/routes/session.router.js'
import usersRouter from './src/routes/user.router.js'

const app = express()
const PORT = 8080

app.use(express.json())

app.use('/api/session', sessionRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log('escuchando en ', PORT)
})