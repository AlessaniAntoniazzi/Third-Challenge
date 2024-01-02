import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Token not provided' });
    }
  
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      req.userId = decoded.userId;
      next();
    } catch (error) {
        console.log(error);
      return res.status(401).json({ error: 'Invalid token' });

    }
  };