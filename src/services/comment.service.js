// src/services/comment.service.js
import { pool } from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const createComment = async (commentData) => {
    const { content, postId, authorId } = commentData;

    try {
        const [result] = await pool.query(
            'INSERT INTO comments (content, postId, authorId) VALUES (?, ?, ?)',
            [content, postId, authorId]
        );

        const [rows] = await pool.query(
            'SELECT * FROM comments WHERE id = ?',
            [result.insertId]
        );

        return rows[0];
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, "Invalid postId or authorId. Related record does not exist.");
        }
        throw error;
    }
};

export const getAllComments = async () => {
    const [rows] = await pool.query('SELECT * FROM comments');
    return rows;
};


export const getCommentsByPostId = async (postId) => {
    const [rows] = await pool.query('SELECT * FROM comments WHERE postId = ?', [postId]);
    return rows;
};
