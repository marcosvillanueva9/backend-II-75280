import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import User from '../models/User.js';

const router = Router();

router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

router.get('/current', requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  res.render('current', { user });
});

export default router;
