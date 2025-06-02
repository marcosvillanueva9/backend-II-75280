import express from 'express';
import UserModel from '../models/userModel.js';

const router = express.Router();

// GET todos los usuarios
router.get('/', async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// GET usuario por ID
router.get('/:id', async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return res.status(404).send({ error: 'Usuario no encontrado' });
  res.json(user);
});

// POST nuevo usuario
router.post('/', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT actualizar usuario por ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).send({ error: 'Usuario no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE eliminar usuario
router.delete('/:id', async (req, res) => {
  const deleted = await UserModel.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send({ error: 'Usuario no encontrado' });
  res.json({ mensaje: 'Usuario eliminado', usuario: deleted });
});

export default router;
