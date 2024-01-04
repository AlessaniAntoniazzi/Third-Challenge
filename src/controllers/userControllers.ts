import { Request, Response } from 'express';
import { UserService } from '../services/userServices';
import { ValidationError } from 'joi';
import { validateSignIn } from '../middleware/createUserSchema';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json({
      message: 'User created',
      user: newUser,
    });
  } catch (error) {

    if (error instanceof ValidationError) {
      res.status(400).json({
        error: 'Bad Request',
        message: error.details.map((detail) => detail.message).join(', '),
      });
    } else {
      if (error instanceof Error){    
        if (error.message === 'Email already exists') {
          return res.status(409).json({
            error: error.message,
            message: error.message,
          });
        }
      }
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong',
      });
    }
  }
};


export const loginUser = async (req: Request, res: Response) => {
  try {
    await validateSignIn(req.body);
    const { email, password } = req.body;
    const { token, error } = await UserService.loginUser(email, password);
    if (error) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: error,
      });
    }
    res.status(200).json({
      message: 'User logged in successfully',
      token,
    });

  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });

  }
};




