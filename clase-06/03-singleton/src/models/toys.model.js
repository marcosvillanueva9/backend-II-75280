import mongoose from 'mongoose';

const toySchema = new mongoose.Schema({
  name: String,
  price: Number,
}, { timestamps: true });

const ToyModel = mongoose.model('Toy', toySchema);
export default ToyModel;
