import express from 'express';
import { createUser, loginUser } from '../controllers/userControllers';

const router = express.Router();

router.post('/users/sign-up', createUser);
router.post('/users/sign-in', loginUser);

export default router;
