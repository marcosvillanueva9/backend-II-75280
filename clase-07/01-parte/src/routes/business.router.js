import { Router } from 'express';
import BusinessController from '../controllers/business.controller.js';

const router = Router();

router.get('/', BusinessController.getBusinesses);
router.get('/:id', BusinessController.getBusinessById);
router.post('/', BusinessController.createBusiness);
router.post('/:id/products', BusinessController.addProduct);

export default router;