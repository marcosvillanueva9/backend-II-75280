import { Router } from 'express';
import UsersController from '../controller/users.controller.js';

const router = Router();
const usersController = new UsersController();

router.get('/', (req, res) => usersController.getAllUsers(req, res));
router.post('/', (req, res) => usersController.addUser(req, res));

export default router;