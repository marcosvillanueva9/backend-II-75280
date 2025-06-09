import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import handlebars from 'express-handlebars'
import sessionsRouter from './routes/sessions.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()

mongoose.connect('mongodb://localhost:27017/loginApp')

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/loginApp',
    ttl: 60
  }),
  secret: 'secretcoder',
  resave: false,
  saveUninitialized: false
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/', viewsRouter)
app.use('/api/sessions', sessionsRouter)

app.listen(8080, () => console.log("Servidor corriendo en http://localhost:8080"))
