// src/routes/comment.routes.js
import { Router } from 'express';
import * as commentController from '../controllers/comment.controller.js';

const router = Router();

router.get('/comments', commentController.getAllComments);
router.get('/posts/:postId/comments', commentController.getCommentsByPostId);
router.post('/posts/:postId/comments', commentController.createComment);

export default router;
