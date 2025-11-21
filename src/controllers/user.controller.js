// src/controllers/user.controller.js
import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';
import * as postService from '../services/post.service.js';

export const createUser = asyncHandler(async (req, res) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(new ApiResponse(201, newUser, "User created successfully"));
});

export const getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully"));
});

// Get all posts for a specific user
export const getPostsByUser = asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    // Basic validation for the param
    if (isNaN(userId)) {
        throw new ApiError(400, "Invalid user ID format.");
    }

    // Optional but good practice: ensure the user exists
    await userService.getUserById(userId); 
    // This will throw ApiError(404, "User not found") if no such user

    // Fetch posts written by this user
    const posts = await postService.getPostsByAuthorId(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, posts, "Posts for this user retrieved successfully"));
});