// src/routes/comment.routes.js
import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = Router();

// Get all comments
router.get('/', commentController.getAllComments);

// Get all comments for a specific post
router.get('/post/:postId', commentController.getCommentsByPostId);

// Create a new comment for a specific post
router.post('/post/:postId', validateComment, commentController.createCommentForPost);

export default router;
