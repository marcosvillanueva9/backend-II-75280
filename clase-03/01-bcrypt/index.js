import express from 'express';
import bcrypt from 'bcrypt';

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const users = [];


const app = express();
app.use(express.json());
app.post('/signup', (req, res) => {
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
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = users.find(u => u.username === username);

    if (user && isValidPassword(user, password)) {
        res.json({ message: 'User authenticated successfully', user });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

app.get('/getUser/:username', (req, res) => {
  const { username } = req.params;

  const user = users.find(u => u.username === username);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});