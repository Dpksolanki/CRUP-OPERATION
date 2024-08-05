// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../dbservices/categoryService';

const createCategoryController = async (req: Request, res: Response) => {
    try {
        const newCategory = await createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(400).json({ error: 'Failed to create category' });
    }
};

const getCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await getCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

const updateCategoryController = async (req: Request, res: Response) => {
    try {
        const categoryId = Number(req.params.categoryId);
        if (isNaN(categoryId)) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }
        const updatedCategory = await updateCategory(categoryId, req.body);
        res.status(200).json({message: 'Category update successfully', updatedCategory});;
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
};

const deleteCategoryController = async (req: Request, res: Response) => {
    try {
        const categoryId = Number(req.params.categoryId);
        if (isNaN(categoryId)) {
            return res.status(400).json({ error: 'Invalid category ID' });
        }
        await deleteCategory(categoryId);
        res.status(200).json({message: 'Category deleted successfully'});
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
};

export { createCategoryController, getCategoriesController, updateCategoryController, deleteCategoryController };
