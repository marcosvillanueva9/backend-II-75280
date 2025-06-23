import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'your-private-key';

export const generateToken = (user) => {
  return jwt.sign({ username: user.username }, PRIVATE_KEY, { expiresIn: '1h' });
}

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if (err) {
        return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = credentials.user;
        next();
    });
}