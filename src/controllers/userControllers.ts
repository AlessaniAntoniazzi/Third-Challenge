import { Request, Response } from 'express';
import { userModel } from '../models/models';

export const createUser = async (req: Request, res: Response) => {
    try {
        const {
            firstName,
            lastName,
            birhtDate,
            city,
            country,
            email,
            password,
            confirmPassword,
        } = req.body;

        const newUser = await userModel.create({
            firstName,
            lastName,
            birhtDate,
            city,
            country,
            email,
            password,
            confirmPassword,
        });

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
