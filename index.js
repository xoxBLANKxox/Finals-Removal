import dotenv from 'dotenv';
dotenv.config(); // Load env

import express from 'express';
import morgan from 'morgan';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import config from './src/config/index.js';
import photoRoutes from './src/routes/photo.routes.js'; 
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

const app = express();

app.use(express.json());

// SERVE STATIC FILES
app.use('/uploads', express.static('uploads'));

if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/photos', photoRoutes);   

// ERROR HANDLER — must be last
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
    testConnection();
});
