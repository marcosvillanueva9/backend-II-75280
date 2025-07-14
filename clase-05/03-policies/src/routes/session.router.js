import express from 'express';
import jwt from 'jsonwebtoken';
import { handlePolicies } from '../middlewares/handlePolicies.js';

const router = express.Router()

const users = [
    { email: 'a@a', password: 'a', role: 'ADMIN'},
    { email: 'u@u', password: 'u', role: 'USER'}
]

router.post('/login', handlePolicies(["PUBLIC"]), (req, res) => {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password)
    if (!user) {
        return res.status(401).send({ status: 'error', error: 'usuario no encontrado'})
    }
    const token = jwt.sign({ email: user.email, role: user.role}, 'coderhouse')

    res.cookie('jwttoken', token).send({token})
})



export class SessionRouter {
    // HACER EN CASA
}

export default router