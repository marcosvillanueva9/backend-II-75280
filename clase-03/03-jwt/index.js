import express from 'express';
import { generateToken, authToken } from './utils.js';

const app = express();

// Controller o logica
app.post('/login/:username', (req, res) => {
    const username = req.params.username
    // autenticamos
    const user = { username }
    const token = generateToken(user)
    res.json({ token })
})

app.get('/protected', authToken, (req, res) => {
    res.json({ message: "ESTAS LOGUEADO!"})
})

app.listen(8080, () => {
    console.log("corriendo en el 8080")
})