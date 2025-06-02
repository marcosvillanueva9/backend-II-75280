import express from 'express';
import mongoose from 'mongoose';
import usuariosRouter from './src/routes/usuarios.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl = 'mongodb://localhost:27017/mongoose-04';

mongoose.connect(mongoUrl, {})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

app.use('/api/usuarios', usuariosRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
