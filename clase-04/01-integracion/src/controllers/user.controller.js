import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js';

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.redirect('/login?error=1');
  }

  const token = generateToken(user);
  res.cookie('currentUser', token, { signed: true, httpOnly: true });
  res.redirect('/current');
}

export async function registerUser(req, res) {
  const { first_name, last_name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ first_name, last_name, email, password: hashed });
  res.json({ message: 'User created', id: newUser._id });
}