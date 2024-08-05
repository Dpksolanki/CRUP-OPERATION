// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
// import { config } from '../config';

const USER_CREDENTIALS = {
    email: 'admin@codesfortomorrow.com',
    password: 'Admin123!@#'
};

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === USER_CREDENTIALS.email && password === USER_CREDENTIALS.password) {
        const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
