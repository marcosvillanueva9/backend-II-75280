import express from 'express';
import bcrypt from 'bcrypt';

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // para el registro

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const users = [];

const app = express()
app.use(express.json())

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridas"})
    } 

    const hashedPassword = createHash(password);
    users.push({username, password: hashedPassword})
    res.status(201).json({ username, password: hashedPassword})
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridas"})
    }

    const user = users.find(u => u.username === username);

    if (user && isValidPassword(user, password)) {
        res.status(200).json({ message: "usted se logueo correctamente" })
    } else {
        res.status(401).json({ error: "contrasena no valida" })
    }
});

app.get('/users', (req, res) => {
    res.json({ users })
})

app.listen(8080, () => {
    console.log("corriendo en el 8080")
})

//$2b$10$hMVZfASGNX7lrNbhxbqx5.FrJXkdQlGNpou7nE.WHtXznY7W9AJqi
//$2b$10$BPapA8kFrof2u/PZ4i7oKuBnIXFK6HL4vR0eJgZRFE.djR1CHSJLC