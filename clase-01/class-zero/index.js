import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routes/userRouter.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoUrl = 'mongodb://localhost:27017/class-zero';
mongoose.connect(mongoUrl, {})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

// Usar el router en /api/users
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
