import dotenv from 'dotenv';
dotenv.config(); // Load env

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import config from './src/config/index.js';
import photoRoutes from './src/routes/photo.routes.js'; 
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';

const app = express();

app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173', // e.g. Vite frontend; update if needed
    credentials: true
}));

app.use(express.json());

// SERVE STATIC FILES
app.use('/uploads', express.static('uploads'));

if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                 // max 100 requests per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    }
});

app.use('/api', globalLimiter);

const API_PREFIX = '/api/v1';

// ROUTES
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/posts`, postRoutes);
app.use(`${API_PREFIX}/comments`, commentRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/photos`, photoRoutes);

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HelloWorldAPI – GT Multi-part File Upload',
            version: '1.0.0',
            description: 'Node.js Express API with authentication, posts, photos, and file upload.'
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
                description: 'Local dev server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        }
      
    },
    // Scan files for JSDoc/OpenAPI comments
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ERROR HANDLER 
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
    testConnection();
});
