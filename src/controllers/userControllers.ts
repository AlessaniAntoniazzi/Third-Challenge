import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import UserModel, { UserCreate } from '../models/models';

export const createUser = async (req: Request, res: Response) =>{
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

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.loginUser(email, password);

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

   