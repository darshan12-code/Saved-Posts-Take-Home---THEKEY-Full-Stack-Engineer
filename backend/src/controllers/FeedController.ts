import { Response, NextFunction } from 'express';
import { FeedService } from '../services';
import { BaseController } from './BaseController';
import { AuthenticatedRequest } from '../types';

export class FeedController extends BaseController {
  private feedService: FeedService;

  constructor() {
    super();
    this.feedService = new FeedService();
  }

  /**
   * GET /api/courses/:courseId/posts
   * Get paginated feed for a course
   */
  async getCourseFeed(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const { courseId } = req.params;
    const page = (req.query.page as string) ? parseInt(req.query.page as string, 10) : 1;
    const limit = (req.query.limit as string) ? parseInt(req.query.limit as string, 10) : 10;

    await this.handleRequest(async (req, res) => {
      const result = await this.feedService.getCourseFeed(
        req,
        parseInt(courseId, 10),
        page,
        limit
      );
      res.status(200).json(result);
    }, req, res, next);
  }
}
