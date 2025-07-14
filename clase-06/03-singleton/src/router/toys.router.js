import { Router } from 'express';
import ToysController from '../controller/toys.controller.js';

const router = Router();
const toysController = new ToysController();

router.get('/', (req, res) => toysController.getAllToys(req, res));
router.post('/', (req, res) => toysController.addToy(req, res));

export default router;