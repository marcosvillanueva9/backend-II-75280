import express from 'express';
import bcrypt from 'bcrypt';
import exphbs from 'express-handlebars'

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // para el registro
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password); // para el login

const users = []

const app = express()
app.use(express.json())

app.engine('handlebars', exphbs.engine({
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// RENDER VISTAS
app.get('/', (req, res) => {
    res.render('home', {})
})

app.get('/register', (req, res) => {
    res.render('register', {})
})

app.get('/forgot-password', (req, res) => {
    res.render('forgot-password', {})
})

// Controller o logica
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({error: 'usuario o password invalidas'})
    }

    res.status(200).json({ message: "login successfully", user})
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({error: 'usuario y password son requeridos'})
    }

    const user = users.find(u => u.username === username);
    if (user) {
        return res.status(401).json({error: 'usuario ya existe'})
    }

    const hashedPassword = createHash(password);
    users.push({ username, password: hashedPassword})
    res.status(201).json({ message: "creado"})
})

app.post('/forgot-password', (req, res) => {
    const { username, newPassword } = req.body;
    if (!username || !newPassword) {
        return res.status(401).json({error: 'usuario y password son requeridos'})
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({error: 'usuario no existe'})
    }

    const hashedPassword = createHash(newPassword);
    users.push({ username, password: hashedPassword})
    res.status(201).json({ message: "creado"})
})


app.listen(8080, () => {
    console.log("corriendo en el 8080")
})