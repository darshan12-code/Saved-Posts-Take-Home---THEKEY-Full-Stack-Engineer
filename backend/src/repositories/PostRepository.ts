import { eq, and, desc, sql } from 'drizzle-orm';
import db from '../database';
import { posts, savedPosts, courseEnrollments } from '../database/schema';

export interface PostWithSaveStatus {
  id: number;
  courseId: number;
  authorId: number;
  title: string;
  content: string;
  createdAt: number;
  hasSaved: boolean;
  savesCount: number;
}

export class PostRepository {
  /**
   * Get posts for a course with pagination and save status for a user
   */
  async getCoursePosts(
    courseId: number,
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<PostWithSaveStatus[]> {
    const offset = (page - 1) * limit;

    // Get posts with save status
    const result = await db
      .select({
        id: posts.id,
        courseId: posts.courseId,
        authorId: posts.authorId,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
        hasSaved: sql<boolean>`CASE WHEN ${savedPosts.id} IS NOT NULL THEN 1 ELSE 0 END`,
      })
      .from(posts)
      .leftJoin(
        savedPosts,
        and(
          eq(savedPosts.postId, posts.id),
          eq(savedPosts.userId, userId),
          sql`${savedPosts.deletedAt} IS NULL`
        )
      )
      .where(eq(posts.courseId, courseId))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // The above query has an issue with the double join for savesCount
    // Let's fix it with a subquery approach
    const postsData = await db
      .select({
        id: posts.id,
        courseId: posts.courseId,
        authorId: posts.authorId,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(eq(posts.courseId, courseId))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    // Get save status for current user
    const postIds = postsData.map((p) => p.id);
    const savedPostIds = new Set(
      postIds.length > 0
        ? (
            await db
              .select({ postId: savedPosts.postId })
              .from(savedPosts)
              .where(
                and(
                  eq(savedPosts.userId, userId),
                  sql`${savedPosts.postId} IN (${sql.raw(postIds.join(','))})`,
                  sql`${savedPosts.deletedAt} IS NULL`
                )
              )
          ).map((s) => s.postId)
        : []
    );

    // Get save counts for all posts
    const saveCounts = new Map<number, number>();
    if (postIds.length > 0) {
      const counts = await db
        .select({
          postId: savedPosts.postId,
          count: sql<number>`COUNT(*)`,
        })
        .from(savedPosts)
        .where(
          and(
            sql`${savedPosts.postId} IN (${sql.raw(postIds.join(','))})`,
            sql`${savedPosts.deletedAt} IS NULL`
          )
        )
        .groupBy(savedPosts.postId);

      for (const count of counts) {
        saveCounts.set(count.postId, count.count);
      }
    }

    return postsData.map((post) => ({
      ...post,
      hasSaved: savedPostIds.has(post.id),
      savesCount: saveCounts.get(post.id) || 0,
      createdAt: post.createdAt instanceof Date ? post.createdAt.getTime() : post.createdAt,
    }));
  }

  /**
   * Check if user is enrolled in a course
   */
  async isUserEnrolled(userId: number, courseId: number): Promise<boolean> {
    const enrollment = await db
      .select({ id: courseEnrollments.id })
      .from(courseEnrollments)
      .where(
        and(eq(courseEnrollments.userId, userId), eq(courseEnrollments.courseId, courseId))
      )
      .limit(1);

    return enrollment.length > 0;
  }

  /**
   * Check if a course exists
   */
  async courseExists(courseId: number): Promise<boolean> {
    const courses = await db
      .select({ id: sql<number>`id` })
      .from(sql`courses`)
      .where(sql`id = ${courseId}`)
      .limit(1);

    return courses.length > 0;
  }
}
