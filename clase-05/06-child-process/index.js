import express from 'express'
import { fork } from 'child_process'

const app = express()
const PORT = 8080

let visistas = 0

app.get('/', (req, res) => {
    visistas++
    res.send(visistas)
})

app.get('/calculo-bloq', (req, res) => {
    let suma = 0
    for (let i = 0; i < 5e9; i++) {
        suma++
    }
    res.send(`la suma BLOQUEANTE es ${suma}`)
})

app.get('/calculo-nobloq', (req, res) => {
    const child = fork('./sumador.js')
    child.send('iniciar')

    child.on('message', (suma) => {
        res.send(`la suma NO BLOQUEANTE es ${suma}`)
    })
})

app.listen(PORT, () => {
    console.log('escuchando', PORT)
})