import express from 'express';
import { Usuario } from '../models/usuario.js';

const router = express.Router();

// GET /api/usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.send(usuarios);
});

// POST /api/usuarios
router.post('/', async (req, res) => {
  const { nombre, apellido, dni } = req.body;

  if (!nombre || !apellido || !dni) {
    return res.status(400).send({ error: 'Faltan datos del usuario' });
  }

  try {
    const nuevoUsuario = new Usuario({ nombre, apellido, dni });
    await nuevoUsuario.save();
    res.status(201).send({ mensaje: 'Usuario creado', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
