import { users } from './users';
import { courses } from './courses';
import { courseEnrollments } from './courseEnrollments';
import { posts } from './posts';
import { savedPosts } from './savedPosts';

export const schema = {
  users,
  courses,
  courseEnrollments,
  posts,
  savedPosts,
};

export * from './users';
export * from './courses';
export * from './courseEnrollments';
export * from './posts';
export * from './savedPosts';
