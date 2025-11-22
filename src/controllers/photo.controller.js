import * as photoService from '../services/photo.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from 'express-async-handler';

export const uploadPhoto = asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "Please upload a file");

    const caption = req.body.caption || null;
    const userId = req.user.id;
    const filePath = req.file.path;

    const newPhoto = await photoService.createPhoto({
        caption,
        filePath,
        userId
    });

    return res.status(201).json(
        new ApiResponse(201, newPhoto, "Photo uploaded successfully")
    );
});

export const getUserPhotos = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const photos = await photoService.getPhotosByUserId(userId);

    return res.status(200).json(
        new ApiResponse(200, photos, "User photos retrieved successfully")
    );
});

export const deleteUserPhoto = asyncHandler(async (req, res) => {
    const photoId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    await photoService.deletePhoto(photoId, userId);

    return res.status(200).json(
        new ApiResponse(200, null, "Photo deleted successfully")
    );
});
