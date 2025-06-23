import express from 'express';
import { generateToken, authToken } from './utils.js';

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Aquí iría la lógica de autenticación del usuario
  const user = { username }; // Simulación de usuario autenticado
  const token = generateToken(user);
  res.json({ token });
});

app.get('/protected', authToken, (req, res) => {
  res.json({ message: 'Esto esta protegido pero ENTRASTE!', user: req.user });
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});