import express from 'express';
import { createUser, loginUser } from '../controllers/userControllers';
import { authMiddleware } from '../middleware/authMiddleware';
import { createEvent, getEventsByDayOfWeek, deleteEventsByDayOfWeek, getEventById, deleteEventById } from '../controllers/eventsControllers';

const router = express.Router();

router.post('/users/sign-up', createUser);
router.post('/users/sign-in', loginUser);
router.post('/events', authMiddleware, createEvent);
router.get('/events', authMiddleware, getEventsByDayOfWeek);
router.delete('/events', authMiddleware, deleteEventsByDayOfWeek);
router.get('/events/:eventId', authMiddleware, getEventById);
router.delete('/events/:eventId', authMiddleware, deleteEventById); 

export default router;
