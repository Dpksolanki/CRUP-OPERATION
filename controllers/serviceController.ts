// src/controllers/serviceController.ts
import { Request, Response } from 'express';
import { createService, getServices, updateService, deleteService, getServiceWithPrices } from '../dbservices/serviceService';
import { createBulkPriceOption, getBulkPriceOptionByServiceId, updateBulkPriceOption, deletePriceOptionsByServiceId, deletePriceOption } from '../dbservices/priceService';

export const createServiceController = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let priceOptions = data.priceOptions;
        delete data.priceOptions;
        const newService = await createService(Number(req.params.categoryId), data);
        priceOptions = priceOptions.map((price: any) => ({
            ...price,
            serviceId: newService.id
        }));
        console.log(priceOptions);
        
        const priceData = await createBulkPriceOption(priceOptions);

        // Combine newService and priceData
        const response = {
            ...newService.toJSON(),
            priceOptions: priceData
        };

        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(400).json({ error: 'Failed to create service' });
    }
};

export const getServicesController = async (req: Request, res: Response) => {
    try {
        const services = await getServices(Number(req.params.categoryId));
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(400).json({ error: 'Failed to fetch services' });
    }
};

export const updateServiceController = async (req: Request, res: Response) => {
    try {
        const serviceId = Number(req.params.serviceId);
        let { priceOptions, ...serviceData } = req.body;

        // Update service
        const updatedService = await updateService(serviceId, serviceData);

        // Update price options if provided
        if (priceOptions && Array.isArray(priceOptions)) {
            priceOptions = priceOptions.map(option => ({
                ...option,
                serviceId: serviceId
            }));
            await updateBulkPriceOption(serviceId, priceOptions);
        }

        // Fetch updated service with price options
        const serviceWithPrices = await getServiceWithPrices(serviceId);

        res.json(serviceWithPrices);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(400).json({ error: 'Failed to update service' });
    }
};

export const deleteServiceController = async (req: Request, res: Response) => {
    try {
        const serviceId = Number(req.params.serviceId);

        // Delete associated price options
        await deletePriceOptionsByServiceId(serviceId);

        // Delete the service
        await deleteService(serviceId);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(400).json({ error: 'Failed to delete service' });
    }
};

export const deletePriceOptionController = async (req: Request, res: Response) => {
    try {
        const serviceId = Number(req.params.serviceId);
        const priceId = Number(req.params.priceId);

        // Delete the specific price option
        const deletedCount = await deletePriceOption(serviceId, priceId);

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Price option not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting price option:', error);
        res.status(400).json({ error: 'Failed to delete price option' });
    }
};