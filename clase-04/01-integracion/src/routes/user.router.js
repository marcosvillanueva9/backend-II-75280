import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
