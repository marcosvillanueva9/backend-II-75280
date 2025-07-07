import express from 'express';

const app = express();
const router = express.Router();

app.use(express.json())

const pets = []

router.param('pet', (req, res, next, petName) => {
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(petName)) {
        return res.status(400).json('Invalid pet name')
    }

    const foundPet = pets.find(p => p.name.toLowerCase() === petName.toLowerCase())
    if (!foundPet) {
        return res.status(404).json('Pet not found')
    }
    
    req.pet = foundPet
    next()
})

router.post('/', (req, res) => {
    const { name, specie } = req.body

    if (!name || !specie) {
        return res.status(400).json('No name or specie')
    }

    pets.push({name, specie})

    res.status(201).json({ message: 'pet created', pets})
})

router.get('/', (req, res) => {
    res.json(pets)
})

router.get('/:pet', (req, res) => {
    res.json(req.pet)
})

router.put('/:pet', (req, res) => {
    req.pet.adopted = true;
    
    // guardamos

    res.json({ message: 'pet marked as adopted', pet: req.pet })
})

app.use('/api/pets', router)

app.listen(8080, () => {
    console.log('escuchando 8080')
})