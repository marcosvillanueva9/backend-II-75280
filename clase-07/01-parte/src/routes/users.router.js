import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const router = Router();

router.get('/', UsersController.getUsers);
router.get('/:id', UsersController.getUserById);
router.post('/', UsersController.createUser);

export default router;