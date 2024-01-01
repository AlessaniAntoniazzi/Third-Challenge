import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import UserModel, { UserCreate } from '../models/models';

export const createUser = async (req: Request, res: Response) =>{
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json({
          message: 'User created successfully',
          user: newUser,
        });
      } catch (error: any) {
        console.error('Error creating user:', error);
        res.status(400).json({ error: error.message });
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

   