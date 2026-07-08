import { Router } from 'express';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes will be registered here
// router.use('/api/v1/posts', postsRoutes);
// router.use('/api/v1/saved', savedPostsRoutes);

export default router;
