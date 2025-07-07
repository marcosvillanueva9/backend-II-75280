import express from 'express';
import { handlePolicies } from '../middlewares/handlePolicies.js';

const router = express.Router();

router.get('/', handlePolicies(["PUBLIC"]), (req, res) => {
  res.send("Hola, Coders");
});

router.get('/currentUser', handlePolicies(["USER", "USER_PREMIUM"]), (req, res) => {
  res.send(req.user);
});

export default router;
