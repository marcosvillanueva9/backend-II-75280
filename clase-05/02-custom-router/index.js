// index.js
import express from 'express';

const app = express();
const router = express.Router();

app.use(express.json());

// Persistencia en memoria
const pets = [];

// Middleware para cargar la mascota con router.param
router.param('pet', (req, res, next, petName) => {
  const foundPet = pets.find(p => p.name.toLowerCase() === petName.toLowerCase());
  if (!foundPet) {
    return res.status(404).json({ error: 'Pet not found' });
  }
  req.pet = foundPet;
  next();
});

// POST '/' - Crear nueva mascota
router.post('/', (req, res) => {
  const { name, specie } = req.body;

  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: 'Invalid pet name format (only letters and spaces)' });
  }


  if (!name || !specie) {
    return res.status(400).json({ error: 'Name and specie are required' });
  }

  pets.push({ name, specie });
  res.status(201).json({ message: 'Pet created', pets });
});

router.get('/', (req, res) => {
  res.json(pets);
});

// GET '/:pet' - Obtener mascota por nombre (solo letras y espacios)
router.get('/:pet', (req, res) => {
  res.json(req.pet);
});

// PUT '/:pet' - Marcar como adoptada
router.put('/:pet', (req, res) => {
  req.pet.adopted = true;
  res.json({ message: 'Pet marked as adopted', pet: req.pet });
});

// Usamos el router
app.use('/api/pets', router);

// Levantar servidor
app.listen(8080, () => {
  console.log('Servidor escuchando en http://localhost:8080');
});
