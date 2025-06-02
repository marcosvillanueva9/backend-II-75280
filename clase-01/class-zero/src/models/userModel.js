import mongoose from 'mongoose';

const userCollection = 'usuarios';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true }
});

const UserModel = mongoose.model(userCollection, userSchema);
export default UserModel;
