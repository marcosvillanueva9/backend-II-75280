import mongoose from 'mongoose';

const collection = 'Business';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    products : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }]
});

const businessModel = mongoose.model(collection, schema);
export default businessModel;