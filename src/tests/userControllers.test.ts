import { Request, Response } from 'express';
import { ValidationError } from 'joi';
import  supertest from 'supertest';
import express from 'express';
import { createUser } from '../controllers/userControllers';
import { UserService } from '../services/userServices';


jest.mock('../services/userServices');
const app = express();
const request = supertest(app);

describe('createUser', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  it('should create a new user and return a success response', async () => {
    const newUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
    req.body = newUser;

    
      async function createUser(req: any, res: any) {
        
        const newUser = { id: '123', name: 'John Doe', email: 'john@example.com' };
        UserService.createUser = jest.fn().mockResolvedValue(newUser);
        req.body = newUser;

      
        expect(UserService.createUser).toHaveBeenCalledWith(newUser);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
        message: 'User created',
        user: newUser,
      });
    }

});
});


