import express from 'express';
const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

const usuarios = [
  { nombre: 'Tato', apellido: 'Villanueva', dni: '12345678' },
  { nombre: 'Tony', apellido: 'Stark', dni: '87654321' }
];

const routerUsuarios = express.Router();

routerUsuarios.use((req, res, next) => {
  console.log('Pasando por middleware de /api/usuarios');
  next();
});

routerUsuarios.get('/', (req, res) => {
  res.send(usuarios);
});

routerUsuarios.post('/', (req, res) => {
  const { nombre, apellido, dni } = req.body;

  if (!nombre || !apellido || !dni) {
    return res.status(400).send({ error: 'Faltan datos del usuario' });
  }

  usuarios.push({ nombre, apellido, dni });
  res.send({ mensaje: 'Usuario agregado', usuarios });
});

app.use('/api/usuarios', routerUsuarios);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
