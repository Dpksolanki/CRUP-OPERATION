// src/services/categoryService.ts
import db from '../models/index';

export const createCategory = async (data: any) => {
    return db.Category.create(data);
};

export const getCategories = async () => {
    return db.Category.findAll();
};

export const updateCategory = async (id: number, data: any) => {
    return await  db.Category.update(data, { where: { id } });
}

export const deleteCategory = async (id: number) => {
     await db.Category.destroy({ where: { id } });
  
};
