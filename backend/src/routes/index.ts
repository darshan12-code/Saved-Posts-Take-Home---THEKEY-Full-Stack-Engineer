import { Router } from 'express';
import feedRoutes from './feed';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
router.use('/api', feedRoutes);

export default router;
