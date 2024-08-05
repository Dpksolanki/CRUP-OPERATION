import { Router } from 'express';
import { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/category', authMiddleware, createCategoryController);
router.get('/categories', authMiddleware, getCategoriesController);
router.put('/category/:categoryId', authMiddleware, updateCategoryController);
router.delete('/category/:categoryId', authMiddleware, deleteCategoryController);

export default router;
