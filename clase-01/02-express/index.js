import express from 'express';
const app = express();

app.use(express.json());

const usuarios = [
  { nombre: 'Tato', apellido: 'Villanueva', dni: '12345678' },
  { nombre: 'Tony', apellido: 'Stark', dni: '87654321' }
];

// GET: obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  res.send(usuarios);
});

// POST: agregar nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, apellido, dni } = req.body;

  if (!nombre || !apellido || !dni) {
    return res.status(400).send({ error: 'Faltan datos del usuario' });
  }

  usuarios.push({ nombre, apellido, dni });
  res.send({ mensaje: 'Usuario agregado con éxito', usuarios });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log('Servidor escuchando en el puerto ' + PORT);
});
