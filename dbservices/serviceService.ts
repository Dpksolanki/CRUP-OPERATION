// src/services/serviceService.ts
import db from '../models/index';


export const createService = async (categoryId: number, data: any) => {
    const category = await db.Category.findOne({ where: { id: categoryId } });
    if (!category) throw new Error('Category not found');
    
    return db.Service.create({ ...data, categoryId });
};

export const getServices = async (categoryId: number) => {
  return db.Service.findAll({
    where: { categoryId },
    include: [{ 
      model: db.ServicePriceOption, 
      as: 'priceOptions' 
    }]
  });
};

export const updateService = async (serviceId: number, data: any) => {
    const service = await db.Service.update(data, { where: { serviceId } });
    if (!service) throw new Error('Service not found');
    return service.update(data);
};

export const deleteService = async (serviceId: number) => {
    const service = await db.Service.destroy({ where: { serviceId } });
};

export const getServiceWithPrices = async (serviceId: number) => {
    return db.Service.findOne({
        where: { id: serviceId },
        include: [{ model: db.ServicePriceOption, as: 'priceOptions' }]
    });
};