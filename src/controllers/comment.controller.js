// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from 'express-async-handler';

export const createComment = asyncHandler(async (req, res) => {
    const newComment = await commentService.createComment(req.body);

    return res
        .status(201)
        .json(new ApiResponse(201, newComment, "Comment created successfully"));
});

export const getAllComments = asyncHandler(async (req, res) => {
    const comments = await commentService.getAllComments();

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comments retrieved successfully"));
});
