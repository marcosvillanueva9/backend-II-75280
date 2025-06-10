const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.post('/setCookie', (req, res) => {
  const { username, email } = req.body;

  const value = `${username}:${email}`;
  res.cookie('usuario', value, { maxAge: 30000 });
  res.send('¡Cookie creada!');
});

app.get('/getCookies', (req, res) => {
  console.log('Cookies recibidos:', req.cookies);
  res.json(req.cookies);
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
