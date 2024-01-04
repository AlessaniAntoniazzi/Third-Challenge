import { Request, Response } from 'express';
import { UserService } from '../services/userServices';


export const createUser = async (req: Request, res: Response) =>{
    try {
        const newUser = await UserService.createUser(req.body);
        res.status(201).json({
          message: 'User created',
          user: newUser,
        });
      } catch (error: any) {
        res.status(400).json({ 
          error: error.message });
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong',
      })
    };

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.loginUser(email, password);

        res.status(200).json({
            message: 'User logged in successfully',
            token,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    })
};

   