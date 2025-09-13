// index.js
import express from 'express';
import morgan from 'morgan';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import config from './src/config/index.js';
import { testConnection } from './src/config/db.js';

const app = express();

app.use(express.json());
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

app.use('/posts', postRoutes);
app.use(commentRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
    testConnection(); // Test the database connection on startup
});


