import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { posts } from './posts';

export const savedPosts = sqliteTable('saved_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  postId: integer('post_id').notNull().references(() => posts.id),
  savedAt: integer('saved_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }), // Soft delete - NULL means active
});

export type SavedPost = typeof savedPosts.$inferSelect;
export type NewSavedPost = typeof savedPosts.$inferInsert;
