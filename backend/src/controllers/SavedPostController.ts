import { Response, NextFunction } from 'express';
import { SavedPostService } from '../services';
import { BaseController } from './BaseController';
import { AuthenticatedRequest } from '../types';

export class SavedPostController extends BaseController {
  private savedPostService: SavedPostService;

  constructor() {
    super();
    this.savedPostService = new SavedPostService();
  }

  /**
   * PUT /api/posts/:postId/save
   * Save a post for the current user
   */
  async savePost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const { postId } = req.params;

    await this.handleRequest(async (req, res) => {
      const result = await this.savedPostService.savePost(
        req,
        parseInt(postId, 10)
      );
      res.status(200).json(result);
    }, req, res, next);
  }

  /**
   * DELETE /api/posts/:postId/save
   * Remove a saved post for the current user (soft delete)
   */
  async removeSavedPost(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const { postId } = req.params;

    await this.handleRequest(async (req, res) => {
      const result = await this.savedPostService.removeSavedPost(
        req,
        parseInt(postId, 10)
      );
      res.status(200).json(result);
    }, req, res, next);
  }

  /**
   * GET /api/me/saved-posts
   * Get current user's saved posts
   */
  async getUserSavedPosts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    const page = (req.query.page as string) ? parseInt(req.query.page as string, 10) : 1;
    const limit = (req.query.limit as string) ? parseInt(req.query.limit as string, 10) : 10;

    await this.handleRequest(async (req, res) => {
      const result = await this.savedPostService.getUserSavedPosts(
        req,
        page,
        limit
      );
      res.status(200).json(result);
    }, req, res, next);
  }
}
