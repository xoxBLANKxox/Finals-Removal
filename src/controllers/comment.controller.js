// src/controllers/comment.controller.js
import * as commentService from '../services/comment.service.js';

export const getAllComments = (req, res) => {
    res.json(commentService.getAllComments());
};

export const getCommentsByPostId = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    res.json(commentService.getCommentsByPostId(postId));
};

export const createComment = (req, res) => {
    const postId = parseInt(req.params.postId, 10);
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text is required.' });
    }
    const newComment = commentService.createComment(postId, text);
    res.status(201).json(newComment);
};
