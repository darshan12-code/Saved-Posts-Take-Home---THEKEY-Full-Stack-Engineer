import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { courses } from './courses';

export const courseEnrollments = sqliteTable('course_enrollments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  courseId: integer('course_id').notNull().references(() => courses.id),
  enrolledAt: integer('enrolled_at', { mode: 'timestamp' }).notNull(),
});

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type NewCourseEnrollment = typeof courseEnrollments.$inferInsert;
