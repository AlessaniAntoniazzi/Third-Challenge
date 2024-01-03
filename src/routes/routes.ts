import express from 'express';
import { createUser, loginUser } from '../controllers/userControllers';
import { authMiddleware } from '../middleware/authMiddleware';
import { createEvent, getEvents, deleteEventsByDayOfWeek } from '../controllers/eventsControllers';

const router = express.Router();

router.post('/users/sign-up', createUser);
router.post('/users/sign-in', loginUser);
router.post('/events', authMiddleware, createEvent);
router.get('/events', authMiddleware, getEvents);
router.delete('/events', authMiddleware, deleteEventsByDayOfWeek);

export default router;
