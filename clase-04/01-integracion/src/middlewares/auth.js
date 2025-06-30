import { verifyToken } from '../utils/jwt.js';

export function requireAuth(req, res, next) {
  try {
    const token = req.signedCookies.currentUser;
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect('/users/login');
  }
}
