// src/routes/auth.routes.js
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as authController from '../controllers/auth.controller.js';
import { validateRegistration, validateLogin } from '../middlewares/validator.middleware.js';

const router = Router();

// 🔐 Stricter rate limit for auth endpoints (anti-brute-force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // only 5 attempts per 15 minutes per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login/register attempts. Please try again later.'
    }
});

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Jared"
 *               email:
 *                 type: string
 *                 example: "jared@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */
router.post('/register', authLimiter, validateRegistration, authController.registerUser);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login and receive a JWT
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "jared@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authLimiter, validateLogin, authController.loginUser);

export default router;
