// src/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js'; // ⬅ add this
import { validatePost } from '../middlewares/validator.middleware.js';
import { validateComment } from '../middlewares/validator.middleware.js'; // ⬅ add this


const router = Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/:id', postController.patchPost);
router.post('/', validatePost, postController.createPost);
router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.patchPost); 
router.post('/:postId/comments', validateComment,commentController.createCommentForPost);
router.get('/:postId/comments', commentController.getCommentsByPostId);


export default router;