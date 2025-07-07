import express from 'express';
import { handlePolicies } from '../middlewares/handlePolicies.js';

const router = express.Router()

router.get('/', handlePolicies(["PUBLIC"]), (req, res) => {
    res.send('Hola para todos!')
})

router.get('/currentUser', handlePolicies(["USER", "ADMIN"]), (req, res) => {
    res.send(req.user.email)
})

router.get('/currentAdmin', handlePolicies(["ADMIN"]), (req, res) => {
    console.log(req.user)
    res.send(req.user.email)
})

export class UserRouter {
    // HACER EN CASA
}

export default router