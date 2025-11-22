// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from 'express-async-handler';
import { getUserById } from '../services/user.service.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            // 2. Decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Fetch the user from DB
            const user = await getUserById(decoded.id);

            if (!user) {
                throw new ApiError(401, "User no longer exists");
            }

            // 4. Attach user to request
            req.user = user;

            return next();
        } catch (error) {
            console.error("JWT ERROR:", error);
            throw new ApiError(401, "Not authorized, token failed");
        }
    }

    // If no token at all
    if (!token) {
        throw new ApiError(401, "Not authorized, no token provided");
    }
});
