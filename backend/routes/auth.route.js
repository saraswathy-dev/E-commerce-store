import express from 'express';
const router = express.Router();
import { login, signup,logout,refreshAccessToken} from '../controllers/auth.controller.js';

router.post('/signup',signup );

router.post('/login',login);

router.post('/logout',logout );

router.post('/refresh-token',refreshAccessToken)

export default router;
