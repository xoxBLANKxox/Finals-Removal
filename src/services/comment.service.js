// src/services/comment.service.js

let comments = [
    { id: 1, text: 'Comment 1', postId: 1 },
    { id: 2, text: 'Comment 2', postId: 2 },
    { id: 3, text: 'Comment 3', postId: 3 },
];
let nextId = 4;

export const getAllComments = () => comments;

export const getCommentsByPostId = (postId) => {
    return comments.filter(comment => comment.postId === postId);
};

export const createComment = (postId, text) => {
    const newComment = { id: nextId++, text, postId };
    comments.push(newComment);
    return newComment;
};
