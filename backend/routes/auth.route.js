import express from 'express';
const router = express.Router();
import { login, signup,logout,refreshAccessToken,getProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

router.post('/signup',signup );

router.post('/login',login);

router.post('/logout',logout );

router.post('/refresh-token',refreshAccessToken)

router.get("/profile",protectRoute,getProfile)

export default router;
