// src/routes/auth.routes.js
import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validateRegistration, validateLogin } from '../middlewares/validator.middleware.js';


const router = Router();


// Registration
router.post('/register', validateRegistration, authController.registerUser);

// Login
router.post('/login', validateLogin, authController.loginUser);

export default router;