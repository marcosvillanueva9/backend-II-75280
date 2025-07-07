import express from 'express';
import jwt from 'jsonwebtoken';
import { handlePolicies } from '../middlewares/handlePolicies.js';

const router = express.Router();

const users = [
  { email: 'user@example.com', password: 'password123', role: 'USER' },
  { email: 'admin@example.com', password: 'adminpass', role: 'ADMIN' }
];

router.post('/login', handlePolicies(["PUBLIC"]), (req, res) => {
  const user = users.find(u => u.email === req.body.email && u.password === req.body.password);
  if (!user) {
    return res.status(401).send({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ email: user.email, role: user.role }, 'CoderSecretClaseRouter');
  res.send({ token });
});

export default router;
