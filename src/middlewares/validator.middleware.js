// src/middlewares/validator.middleware.js
import { body, validationResult } from 'express-validator';

export const validatePost = [
    // Title must not be empty and is sanitized
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required.'),

    // Content must not be empty and is sanitized
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required.'),

    //NEW VALIDATION RULE
     body('authorId')
        .isInt({ min: 1 })
        .withMessage('A valid author ID is required.'),

    // This function handles the result of the validations
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];


export const validateComment = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required.'),

    body('postId')
        .notEmpty()
        .withMessage('postId is required.')
        .bail()
        .isInt({ gt: 0 })
        .withMessage('postId must be a positive integer.'),

    body('authorId')
        .notEmpty()
        .withMessage('authorId is required.')
        .bail()
        .isInt({ gt: 0 })
        .withMessage('authorId must be a positive integer.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];