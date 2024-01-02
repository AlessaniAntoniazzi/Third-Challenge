import express from 'express';
import { createUser, loginUser } from '../controllers/userControllers';
import { authMiddleware } from '../middleware/authMiddleware';
import { createEvent } from '../controllers/eventsControllers';

const router = express.Router();

router.post('/users/sign-up', createUser);
router.post('/users/sign-in', loginUser);
router.post('/events', authMiddleware, createEvent);

export default router;
