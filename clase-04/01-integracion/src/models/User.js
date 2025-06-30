import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  role: { type: String, default: 'user' },
  password: String,
});

export default mongoose.model('User', userSchema);
