import Order from "../dao/classes/orders.dao.js";
import User from "../dao/classes/users.dao.js";
import Business from "../dao/classes/business.dao.js";

const orderService = new Order();
const userService = new User();
const businessService = new Business();

class OrdersController {

    static async getOrders(req, res) {
        const orders = await orderService.getOrders();
        if (!orders) res.status(500).send({status: 'error', message: 'Failed to retrieve orders'});
        else if (orders.length === 0) res.status(404).send({status: 'error', message: 'No orders found'});
        else res.send({status: 'success', result: orders});
    }

    static async getOrderById(req, res) {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        if (!order) res.status(404).send({status: 'error', message: 'Order not found'});
        else res.send({status: 'success', result: order});
    }

    static async createOrder(req, res) {
        const {user, business, products} = req.body;

        const resultUser = await userService.getUserById(user);
        if (!resultUser) {
            res.status(404).send({status: 'error', message: 'User not found'});
            return;
        }
        const resultBusiness = await businessService.getBusinessById(business);
        if (!resultBusiness) {
            res.status(404).send({status: 'error', message: 'Business not found'});
            return;
        }

        let actualOrders = resultBusiness.products.filter( product => products.includes(product.id))
        let sum = actualOrders.reduce((acc, product) => acc + product.price, 0);
        let orderNumber = Date.now() + Math.floor(Math.random() * 1000);

        let order = {
            number: orderNumber,
            business,
            user,
            status: 'pending',
            products: actualOrders.map(product => product.id),
            totalPrice: sum
        };
        let orderResult = await orderService.createOrder(order);
        await userService.updateUser(user, { $push: { orders: orderResult._id } });
        res.send({status: 'success', result: orderResult});
    }

    static async resolveOrder(req, res) {
        const { id } = req.params;
        const productData = req.body;
        const updatedOrder = await orderService.updateOrder(id, { status: 'resolved', productData });
        if (!updatedOrder) res.status(500).send({status: 'error', message: 'Failed to resolve order'});
        else res.send({status: 'success', result: updatedOrder});
    }
}

export default OrdersController;