import { AppError } from '../middleware';
import { SavedPostRepository } from '../repositories';
import { AuthenticatedRequest } from '../types';
import { BaseService } from './BaseService';

export interface SavePostResponse {
  success: boolean;
  newlySaved: boolean;
}

export interface RemoveSavedPostResponse {
  success: boolean;
  newlyRemoved: boolean;
}

export interface SavedPostsResponse {
  posts: Array<{
    id: number;
    postId: number;
    userId: number;
    savedAt: number;
    post: {
      id: number;
      courseId: number;
      authorId: number;
      title: string;
      content: string;
      createdAt: number;
    };
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export class SavedPostService extends BaseService {
  private savedPostRepository: SavedPostRepository;

  constructor() {
    super();
    this.savedPostRepository = new SavedPostRepository();
  }

  /**
   * Save a post for the current user
   * Idempotent: duplicate saves are ignored
   */
  async savePost(req: AuthenticatedRequest, postId: number): Promise<SavePostResponse> {
    const user = req.user;
    if (!user) {
      throw new AppError(401, 'Unauthorized');
    }

    // Check if post exists
    const postExists = await this.savedPostRepository.postExists(postId);
    if (!postExists) {
      throw new AppError(404, 'Post not found');
    }

    // Authorization: students can only save posts from enrolled courses
    if (user.role === 'student') {
      const isEnrolled = await this.savedPostRepository.isUserEnrolledInPostCourse(
        user.id,
        postId
      );
      if (!isEnrolled) {
        throw new AppError(403, 'You are not enrolled in this course');
      }
    }

    // Save the post (idempotent)
    const result = await this.savedPostRepository.savePost(user.id, postId);

    return {
      success: true,
      newlySaved: result.newlySaved,
    };
  }

  /**
   * Remove a saved post for the current user (soft delete)
   * Idempotent: removing an already removed post succeeds
   */
  async removeSavedPost(req: AuthenticatedRequest, postId: number): Promise<RemoveSavedPostResponse> {
    const user = req.user;
    if (!user) {
      throw new AppError(401, 'Unauthorized');
    }

    // Check if post exists
    const postExists = await this.savedPostRepository.postExists(postId);
    if (!postExists) {
      throw new AppError(404, 'Post not found');
    }

    // Authorization: students can only remove posts from enrolled courses
    if (user.role === 'student') {
      const isEnrolled = await this.savedPostRepository.isUserEnrolledInPostCourse(
        user.id,
        postId
      );
      if (!isEnrolled) {
        throw new AppError(403, 'You are not enrolled in this course');
      }
    }

    // Remove the post (soft delete, idempotent)
    const result = await this.savedPostRepository.removeSavedPost(user.id, postId);

    return {
      success: true,
      newlyRemoved: result.newlyRemoved,
    };
  }

  /**
   * Get current user's saved posts
   * Only returns active saves (not soft-deleted)
   */
  async getUserSavedPosts(
    req: AuthenticatedRequest,
    page: number = 1,
    limit: number = 10
  ): Promise<SavedPostsResponse> {
    const user = req.user;
    if (!user) {
      throw new AppError(401, 'Unauthorized');
    }

    // Get saved posts with pagination
    const posts = await this.savedPostRepository.getUserSavedPosts(
      user.id,
      page,
      limit
    );

    // For simplicity, we're not implementing total count in this milestone
    // In production, you'd add a separate count query
    return {
      posts,
      pagination: {
        page,
        limit,
        total: posts.length, // This is the count for current page, not total
      },
    };
  }
}
