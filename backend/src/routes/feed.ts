import { Router } from 'express';
import { FeedController, SavedPostController } from '../controllers';
import { validateParams, validateQuery } from '../middleware';
import { courseIdParamSchema, paginationSchema, postIdParamSchema } from '../validators';

const router = Router();
const feedController = new FeedController();
const savedPostController = new SavedPostController();

/**
 * GET /api/courses/:courseId/posts
 * Get paginated feed for a course
 */
router.get(
  '/courses/:courseId/posts',
  validateParams(courseIdParamSchema),
  validateQuery(paginationSchema),
  feedController.getCourseFeed.bind(feedController)
);

/**
 * PUT /api/posts/:postId/save
 * Save a post for the current user
 */
router.put(
  '/posts/:postId/save',
  validateParams(postIdParamSchema),
  savedPostController.savePost.bind(savedPostController)
);

/**
 * DELETE /api/posts/:postId/save
 * Remove a saved post for the current user (soft delete)
 */
router.delete(
  '/posts/:postId/save',
  validateParams(postIdParamSchema),
  savedPostController.removeSavedPost.bind(savedPostController)
);

/**
 * GET /api/me/saved-posts
 * Get current user's saved posts
 */
router.get(
  '/me/saved-posts',
  validateQuery(paginationSchema),
  savedPostController.getUserSavedPosts.bind(savedPostController)
);

export default router;
