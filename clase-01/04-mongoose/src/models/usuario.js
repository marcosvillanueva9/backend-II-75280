import mongoose from 'mongoose';

const userCollection = 'usuarios';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, required: true, unique: true }
}, {
    strict: true,
});

export const Usuario = mongoose.model(userCollection, usuarioSchema);
