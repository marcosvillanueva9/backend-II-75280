import { Router } from 'express';

const router = Router();

const users = [];

router.post('/register', (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  users.push({
    first_name,
    last_name,
    email,
    age,
    password
  });

  req.session.user = {
    first_name,
    last_name,
    email,
    age
  };

  res.redirect('/profile');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email y contraseña son obligatorios');
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).send('Credenciales inválidas');
  }

  req.session.user = {
    email: user.email,
    first_name: user.first_name,
  };

  res.redirect('/productos');
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/');
  });
});

export default router;
