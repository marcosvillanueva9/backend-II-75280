import jwt from 'jsonwebtoken';

export function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}