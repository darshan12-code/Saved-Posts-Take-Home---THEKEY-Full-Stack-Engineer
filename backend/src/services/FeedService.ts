import { AppError } from '../middleware';
import { PostRepository } from '../repositories';
import { AuthenticatedRequest } from '../types';
import { BaseService } from './BaseService';

export interface FeedResponse {
  posts: Array<{
    id: number;
    courseId: number;
    authorId: number;
    title: string;
    content: string;
    createdAt: number;
    hasSaved: boolean;
    savesCount: number;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export class FeedService extends BaseService {
  private postRepository: PostRepository;

  constructor() {
    super();
    this.postRepository = new PostRepository();
  }

  /**
   * Get feed for a course
   * Students can only see enrolled courses
   * Moderators can see all courses
   */
  async getCourseFeed(
    req: AuthenticatedRequest,
    courseId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<FeedResponse> {
    const user = req.user;
    if (!user) {
      throw new AppError(401, 'Unauthorized');
    }

    // Check if course exists
    const courseExists = await this.postRepository.courseExists(courseId);
    if (!courseExists) {
      throw new AppError(404, 'Course not found');
    }

    // Authorization check
    if (user.role === 'student') {
      const isEnrolled = await this.postRepository.isUserEnrolled(user.id, courseId);
      if (!isEnrolled) {
        throw new AppError(403, 'You are not enrolled in this course');
      }
    }

    // Get posts with pagination
    const posts = await this.postRepository.getCoursePosts(
      courseId,
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
