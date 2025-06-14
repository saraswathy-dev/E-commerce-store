import express from 'express';
const router = express.Router();
import { login, signup,logout } from '../controllers/auth.controller.js';

router.get('/signup',signup );

router.get('/login',login);

router.get('/logout',logout );

export default router;
