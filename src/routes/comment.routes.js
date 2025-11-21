// src/routes/comment.routes.js
import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';
import { validateComment } from '../middlewares/validator.middleware.js';

const router = Router();

// POST /comments
router.post('/', validateComment, commentController.createComment);

// GET /comments
router.get('/', commentController.getAllComments);

export default router;
