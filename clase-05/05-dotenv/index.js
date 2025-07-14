import express from 'express';
import sessionRouter from './src/routes/session.router.js'
import usersRouter from './src/routes/user.router.js'

// EXTRA
import { Command } from 'commander';
import dotenv from 'dotenv';

const program = new Command()

program.option('--mode <modo>', 'modo de ejecucion', 'development')

program.parse()

dotenv.config({
    path: program.opts().mode === 'production' ? '.env.production' : '.env.development'
})

const app = express()
const PORT = process.env.PORT || 1111

app.use(express.json())

app.use('/api/session', sessionRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => {
    console.log('escuchando en ', PORT)
})