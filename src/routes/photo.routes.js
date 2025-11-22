// src/routes/photo.routes.js
import { Router } from 'express';
import * as photoController from '../controllers/photo.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();

// All routes require login
router.use(authMiddleware);

// GET /api/photos
router.get('/', photoController.getUserPhotos);

// DELETE /api/photos/:id
router.delete('/:id', photoController.deleteUserPhoto);

// POST /api/photos/upload
router.post(
    '/upload',
    upload.single('photo'),
    photoController.uploadPhoto
);

export default router;
