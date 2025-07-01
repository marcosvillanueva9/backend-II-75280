import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'coderhouseCLAVE!'

export const generateToken = (user) => {
    return jwt.sign({ username: user.username, vip: true}, PRIVATE_KEY, { expiresIn: '1h' })
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader, req.header)
    if (!authHeader) {
        return res.status(401).json({ error: "invalid token" })
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if (err) {
            return res.status(403).json({ error: "token invalido" })
        }
        req.user = credentials.user;
        next();
    })
}

// -H authorization: "Bearer dlaskherqwlmenqsadagweqwdsda"