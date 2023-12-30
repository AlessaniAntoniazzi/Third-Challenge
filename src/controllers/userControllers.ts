import { Request, Response } from 'express';
import { UserService } from '../services/signupServices';
import UserModel, { UserCreate } from '../models/models';

export const createUser = async (req: Request, res: Response) => {
    try {
        const userData: UserCreate = req.body;
        const newUser = await UserService.createUser(userData);

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};