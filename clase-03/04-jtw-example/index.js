import express from 'express';
import exphbs from 'express-handlebars';
import bcrypt from 'bcrypt';
import { generateToken, authToken } from './utils.js';

const app = express();
const PORT = 8080;

const users = [];

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

app.engine('handlebars', exphbs.engine({ extname: ".handlebars" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', authToken, (req, res) => {
  res.render('home', {
    title: 'Home',
  });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Sign Up' });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashedPassword = createHash(password);
  users.push({ username, password: hashedPassword });
  res.redirect('/login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !isValidPassword(user, password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = generateToken(user);
  res.json({ message: 'Login successful', token });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
