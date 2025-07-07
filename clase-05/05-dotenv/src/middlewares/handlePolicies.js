import jwt from 'jsonwebtoken';

export const handlePolicies = (policies) => (req, res, next) => {

    if (policies[0] === 'PUBLIC') return next()

    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({ status: 'error', error: 'no autorizado'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const user = jwt.verify(token, 'coderhouse')
        if (!policies.includes(user.role.toUpperCase())) {
            return res.status(403).send({ status: 'error', error: 'forbidden'})
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({ status: 'error', error: 'server error'})
    }
}