import { Router } from 'express';
import OrdersController from '../controllers/orders.controller.js';

const router = Router();

router.get('/', OrdersController.getOrders);
router.get('/:id', OrdersController.getOrderById);
router.post('/', OrdersController.createOrder);
router.put('/:id', OrdersController.resolveOrder);

export default router;