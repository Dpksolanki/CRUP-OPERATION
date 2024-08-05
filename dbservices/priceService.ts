// src/services/serviceService.ts
import db from '../models/index';


export const createBulkPriceOption = async (prices: any[]) => {
    return db.ServicePriceOption.bulkCreate(prices);
};

export const getBulkPriceOptionByServiceId = async (id: number) => {
    console.log(id);
    
    return db.ServicePriceOption.findAll({where:{serviceId:id}});
};

export const updateBulkPriceOption = async (serviceId: number, priceOptions: any[]) => {
    // Delete existing price options
    await db.ServicePriceOption.destroy({ where: { serviceId } });
    
    // Create new price options
    return db.ServicePriceOption.bulkCreate(priceOptions);
};

export const deletePriceOptionsByServiceId = async (serviceId: number) => {
    return db.ServicePriceOption.destroy({ where: { serviceId } });
};

export const deletePriceOption = async (serviceId: number, priceId: number) => {
    return db.ServicePriceOption.destroy({
        where: {
            id: priceId,
            serviceId: serviceId
        }
    });
};