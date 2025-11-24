// src/routes/photo.routes.js
import { Router } from 'express';
import * as photoController from '../controllers/photo.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// All routes require login
router.use(authMiddleware);

// GET /api/photos

/**
 * @openapi
 * /photos:
 *   get:
 *     summary: Get all photos for logged-in user
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user photos
 */

router.get('/', photoController.getUserPhotos);

// DELETE /api/photos/:id

/**
 * @openapi
 * /photos/{id}:
 *   delete:
 *     summary: Delete a photo by ID
 *     tags:
 *       - Photos
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
 *         description: Photo deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Photo not found
 */

router.delete('/:id', photoController.deleteUserPhoto);

// POST /api/photos/upload

/**
 * @openapi
 * /photos/upload:
 *   post:
 *     summary: Upload a photo
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 */

router.post(
    '/upload',
    upload.single('photo'),
    photoController.uploadPhoto
);

export default router;
