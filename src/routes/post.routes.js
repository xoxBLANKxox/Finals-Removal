import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validatePost, validateComment } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Public
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

//  Protected: must be logged in
router.post('/', authMiddleware, validatePost, postController.createPost);
router.delete('/:id', authMiddleware, postController.deletePost);
router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.patch('/:id', authMiddleware, postController.patchPost);

// (your other comment routes etc...)
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);
router.get('/:postId/comments', commentController.getCommentsByPostId);

export default router;
