// src/middlewares/errorHandler.middleware.js
import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (process.env.NODE_ENV === 'development') {
    message = err.message || message;
  }

  const payload = { success: false, message };

  if (process.env.NODE_ENV === 'development') {
    payload.stack = err.stack;
  }
    return res.status(statusCode).json({
        success: false,
        message: message,
    });
};