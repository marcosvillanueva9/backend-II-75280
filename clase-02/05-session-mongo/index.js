import express from 'express'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

const app = express()

mongoose.connect('mongodb://localhost:27017/sessions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Conectado a MongoDB")).catch(console.error)

app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/sessions',
    ttl: 60,
    collectionName: 'sessionssss'
  }),
  secret: 'sadsd!',
  resave: false,
  saveUninitialized: false
}))

app.get('/', (req, res) => {
  if (!req.session.contador) {
    req.session.contador = 1
    req.session.nombre = req.query.nombre || "Anakin"
    res.send("Hello there " + req.session.nombre)
  } else {
    req.session.contador++
    res.send("Hello there " + req.session.nombre + ", has visitado esta página " + req.session.contador + " veces.")
  }
})

app.get("/olvidar", (req, res) => {
  const nombre = req.session.nombre || ""
  req.session.destroy(err => {
    if (err) {
      res.json({ error: "Algo salió mal", descripcion: err })
    } else {
      res.json({ respuesta: "Hasta luego " + nombre })
    }
  })
})

const PORT = 8080
app.listen(PORT, () => console.log("Servidor escuchando en el puerto 8080"))
