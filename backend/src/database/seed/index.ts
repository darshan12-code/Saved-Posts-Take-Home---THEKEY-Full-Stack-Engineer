import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { users, courses, courseEnrollments, posts, savedPosts } from '../schema';
import path from 'path';

const dbPath = path.join(__dirname, '..', '..', '..', 'database.sqlite');

const client = createClient({
  url: `file:${dbPath}`,
});

const db = drizzle(client, { schema: { users, courses, courseEnrollments, posts, savedPosts } });

export async function seedDatabase() {
  // Clear existing data
  await db.delete(savedPosts);
  await db.delete(posts);
  await db.delete(courseEnrollments);
  await db.delete(courses);
  await db.delete(users);

  // Create users
  const [student1] = await db.insert(users).values([
    {
      email: 'student1@example.com',
      name: 'Student One',
      role: 'student',
      createdAt: new Date('2024-01-01'),
    },
  ]).returning();

  const [student2] = await db.insert(users).values([
    {
      email: 'student2@example.com',
      name: 'Student Two',
      role: 'student',
      createdAt: new Date('2024-01-02'),
    },
  ]).returning();

  const [moderator] = await db.insert(users).values([
    {
      email: 'moderator@example.com',
      name: 'Moderator User',
      role: 'moderator',
      createdAt: new Date('2024-01-01'),
    },
  ]).returning();

  // Create courses
  const [course1] = await db.insert(courses).values([
    {
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming',
      createdAt: new Date('2024-01-01'),
    },
  ]).returning();

  const [course2] = await db.insert(courses).values([
    {
      title: 'Advanced Web Development',
      description: 'Deep dive into modern web technologies',
      createdAt: new Date('2024-01-15'),
    },
  ]).returning();

  // Enroll students in courses
  await db.insert(courseEnrollments).values([
    {
      userId: student1.id,
      courseId: course1.id,
      enrolledAt: new Date('2024-01-05'),
    },
    {
      userId: student1.id,
      courseId: course2.id,
      enrolledAt: new Date('2024-01-20'),
    },
    {
      userId: student2.id,
      courseId: course1.id,
      enrolledAt: new Date('2024-01-06'),
    },
  ]);

  // Create posts
  const [post1] = await db.insert(posts).values([
    {
      courseId: course1.id,
      authorId: student1.id,
      title: 'Help with loops',
      content: 'Can someone explain how for loops work?',
      createdAt: new Date('2024-01-10'),
    },
  ]).returning();

  const [post2] = await db.insert(posts).values([
    {
      courseId: course1.id,
      authorId: student2.id,
      title: 'Variables question',
      content: 'What is the difference between let and const?',
      createdAt: new Date('2024-01-11'),
    },
  ]).returning();

  const [post3] = await db.insert(posts).values([
    {
      courseId: course2.id,
      authorId: student1.id,
      title: 'React hooks',
      content: 'When should I use useEffect?',
      createdAt: new Date('2024-01-25'),
    },
  ]).returning();

  const [post4] = await db.insert(posts).values([
    {
      courseId: course2.id,
      authorId: student2.id,
      title: 'TypeScript types',
      content: 'How to type API responses properly?',
      createdAt: new Date('2024-01-26'),
    },
  ]).returning();

  // Create saved posts
  await db.insert(savedPosts).values([
    {
      userId: student1.id,
      postId: post2.id,
      savedAt: new Date('2024-01-12'),
    },
    {
      userId: student1.id,
      postId: post4.id,
      savedAt: new Date('2024-01-27'),
    },
    {
      userId: student2.id,
      postId: post1.id,
      savedAt: new Date('2024-01-13'),
    },
  ]);

  console.log('Database seeded successfully');
}
