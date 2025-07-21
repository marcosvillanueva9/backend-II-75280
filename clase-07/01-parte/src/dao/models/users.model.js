import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin', 'business'], default: 'user' },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders'
        }
    ]
})

const userModel = mongoose.model(collection, schema);
export default userModel;