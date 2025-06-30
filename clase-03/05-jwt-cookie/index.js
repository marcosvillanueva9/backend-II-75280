import express from 'express'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { generateToken } from './utils.js'

const app = express()
const PORT = 8080
const users = []

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // para el registro

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const existing = users.find(u => u.username === username)
    if (existing) return res.status(400).json("ya existe")

    const hashedPassword = createHash(password)
    users.push({username, password: hashedPassword})
    res.status(201).json("creado")
})

app.get('/login/:username/:password', (req, res) => {
    const { username, password } = req.params;

    const user = users.find(u => u.username === username)
    if (!user || !isValidPassword(user, password)) return res.status(400).json("credenciales invalidas")
    
    const token = generateToken(user)

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
    })
    res.json('login exitoso')
})

app.listen(PORT, () => {
    console.log('ldasdasd')
})