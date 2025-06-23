import express from 'express';
import bcrypt from 'bcrypt';
import exphbs  from 'express-handlebars';

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const users = [];

const app = express();
app.use(express.json());
app.engine('handlebars', exphbs.engine({ extname: ".handlebars" }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Sign Up' });
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { title: 'Forgot Password' });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const hashedPassword = createHash(password);
  users.push({ username, password: hashedPassword });
  res.json({ username, password: hashedPassword });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !isValidPassword(user, password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  res.json({ message: 'Login successful', user: { username: user.username } });
});

app.post('/forgot-password', (req, res) => {
  const { username, newPassword } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  user.password = createHash(newPassword);
  res.json({ message: 'Password updated successfully' });
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});