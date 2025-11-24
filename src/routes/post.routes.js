import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { validatePost, validateComment } from '../middlewares/validator.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Public
/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: List of all posts
 */

router.get('/', postController.getAllPosts);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post retrieved
 *       404:
 *         description: Post not found
 */

router.get('/:id', postController.getPostById);

//  Protected: must be logged in

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 */

router.post('/', authMiddleware, validatePost, postController.createPost);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 */

router.delete('/:id', authMiddleware, postController.deletePost);
router.put('/:id', authMiddleware, validatePost, postController.updatePost);
router.patch('/:id', authMiddleware, postController.patchPost);

// (your other comment routes etc...)
router.post('/:postId/comments', validateComment, commentController.createCommentForPost);
router.get('/:postId/comments', commentController.getCommentsByPostId);

export default router;
