import mongoose from "mongoose";

const collection = 'Products';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
});

const productModel = mongoose.model(collection, schema);

export default productModel;