import { eq, and, sql, desc } from 'drizzle-orm';
import db from '../database';
import { savedPosts, posts, courseEnrollments } from '../database/schema';

export interface SavedPostWithDetails {
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
}

export class SavedPostRepository {
  /**
   * Save a post for a user (idempotent)
   * Returns true if the post was newly saved, false if already saved
   */
  async savePost(userId: number, postId: number): Promise<{ newlySaved: boolean }> {
    // Check if already saved (not soft-deleted)
    const existing = await db
      .select({ id: savedPosts.id })
      .from(savedPosts)
      .where(
        and(
          eq(savedPosts.userId, userId),
          eq(savedPosts.postId, postId),
          sql`${savedPosts.deletedAt} IS NULL`
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return { newlySaved: false };
    }

    // Check if there's a soft-deleted record to restore
    const deleted = await db
      .select({ id: savedPosts.id })
      .from(savedPosts)
      .where(
        and(
          eq(savedPosts.userId, userId),
          eq(savedPosts.postId, postId),
          sql`${savedPosts.deletedAt} IS NOT NULL`
        )
      )
      .limit(1);

    if (deleted.length > 0) {
      // Restore the soft-deleted record
      await db
        .update(savedPosts)
        .set({ deletedAt: null })
        .where(eq(savedPosts.id, deleted[0].id));
      return { newlySaved: true };
    }

    // Create new save record
    await db.insert(savedPosts).values({
      userId,
      postId,
      savedAt: new Date(),
      deletedAt: null,
    });

    return { newlySaved: true };
  }

  /**
   * Check if a post exists
   */
  async postExists(postId: number): Promise<boolean> {
    const post = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    return post.length > 0;
  }

  /**
   * Check if user is enrolled in the post's course
   */
  async isUserEnrolledInPostCourse(userId: number, postId: number): Promise<boolean> {
    const result = await db
      .select({ id: courseEnrollments.id })
      .from(courseEnrollments)
      .innerJoin(posts, eq(posts.courseId, courseEnrollments.courseId))
      .where(
        and(
          eq(courseEnrollments.userId, userId),
          eq(posts.id, postId)
        )
      )
      .limit(1);

    return result.length > 0;
  }

  /**
   * Remove a saved post (soft delete)
   * Returns true if the post was newly removed, false if already removed
   */
  async removeSavedPost(userId: number, postId: number): Promise<{ newlyRemoved: boolean }> {
    // Check if the save exists and is not already soft-deleted
    const existing = await db
      .select({ id: savedPosts.id })
      .from(savedPosts)
      .where(
        and(
          eq(savedPosts.userId, userId),
          eq(savedPosts.postId, postId),
          sql`${savedPosts.deletedAt} IS NULL`
        )
      )
      .limit(1);

    if (existing.length === 0) {
      // Already removed or never saved
      return { newlyRemoved: false };
    }

    // Soft delete by setting deletedAt
    await db
      .update(savedPosts)
      .set({ deletedAt: new Date() })
      .where(eq(savedPosts.id, existing[0].id));

    return { newlyRemoved: true };
  }

  /**
   * Get user's saved posts with pagination
   * Only returns active saves (not soft-deleted)
   * Ordered by savedAt descending (newest first)
   */
  async getUserSavedPosts(
    userId: number,
    page: number = 1,
    limit: number = 10
  ): Promise<SavedPostWithDetails[]> {
    const offset = (page - 1) * limit;

    const result = await db
      .select({
        id: savedPosts.id,
        postId: savedPosts.postId,
        userId: savedPosts.userId,
        savedAt: savedPosts.savedAt,
        post: {
          id: posts.id,
          courseId: posts.courseId,
          authorId: posts.authorId,
          title: posts.title,
          content: posts.content,
          createdAt: posts.createdAt,
        },
      })
      .from(savedPosts)
      .innerJoin(posts, eq(savedPosts.postId, posts.id))
      .where(
        and(
          eq(savedPosts.userId, userId),
          sql`${savedPosts.deletedAt} IS NULL`
        )
      )
      .orderBy(desc(savedPosts.savedAt))
      .limit(limit)
      .offset(offset);

    return result.map((row) => ({
      id: row.id,
      postId: row.postId,
      userId: row.userId,
      savedAt: row.savedAt instanceof Date ? row.savedAt.getTime() : row.savedAt,
      post: {
        id: row.post.id,
        courseId: row.post.courseId,
        authorId: row.post.authorId,
        title: row.post.title,
        content: row.post.content,
        createdAt: row.post.createdAt instanceof Date ? row.post.createdAt.getTime() : row.post.createdAt,
      },
    }));
  }
}
