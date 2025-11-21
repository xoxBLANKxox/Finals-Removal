// src/controllers/auth.controller.js
import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const registerUser = asyncHandler(async (req, res) => {
    const user = await userService.registerUser(req.body);

    // 🛡️ Extra safety: remove password if it somehow exists
    const { password, ...safeUser } = user;

    res
        .status(201)
        .json(new ApiResponse(201, safeUser, "User registered successfully"));
});

// Login controller
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userService.authenticateUser(email, password);

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Login successful"));
});
