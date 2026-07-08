import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler, requestLogger, authenticate } from './middleware';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(authenticate);

// Routes
app.use('/', routes);

// Error handling (must be after routes)
app.use(errorHandler);

export default app;
