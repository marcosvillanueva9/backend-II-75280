import orderModel from "../models/orders.model.js";

export default class Order {
    getOrders = async () => {
        try {
            const orders = await orderModel.find().populate('business').populate('user');
            return orders;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getOrderById = async (id) => {
        try {
            const order = await orderModel.findOne({ _id: id }).populate('business').populate('user');
            return order;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    createOrder = async (orderData) => {
        try {
            const newOrder = await orderModel.create(orderData);
            return newOrder;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    resolveOrder = async (id, orderData) => {
        try {
            const updatedOrder = await orderModel.updateOne({ _id: id }, orderData);
            return updatedOrder;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}