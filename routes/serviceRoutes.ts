import { Router } from 'express';
import { createServiceController, getServicesController, updateServiceController, deleteServiceController, deletePriceOptionController } from '../controllers/serviceController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/category/:categoryId/service', authMiddleware, createServiceController);
router.get('/category/:categoryId/services', authMiddleware, getServicesController);
router.put('/category/:categoryId/service/:serviceId', authMiddleware, updateServiceController);
router.delete('/category/:categoryId/service/:serviceId', authMiddleware, deleteServiceController);
router.delete('/category/:categoryId/service/:serviceId/price/:priceId', authMiddleware, deletePriceOptionController);

export default router;