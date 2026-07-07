import { createClient } from '@libsql/client';
import { seedDatabase } from './seed';
import path from 'path';

const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');

const client = createClient({
  url: `file:${dbPath}`,
});

async function initDatabase() {
  console.log('Initializing database...');
  
  // Create tables using raw SQL
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS course_enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      course_id INTEGER NOT NULL REFERENCES courses(id),
      enrolled_at INTEGER NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL REFERENCES courses(id),
      author_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS saved_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id),
      post_id INTEGER NOT NULL REFERENCES posts(id),
      saved_at INTEGER NOT NULL,
      deleted_at INTEGER
    )
  `);

  // Create indexes
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_posts_course_id ON posts(course_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_posts_course_created ON posts(course_id, created_at)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_saved_posts_user_id ON saved_posts(user_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_saved_posts_post_id ON saved_posts(post_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_saved_posts_user_deleted ON saved_posts(user_id, deleted_at)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_saved_posts_post_deleted ON saved_posts(post_id, deleted_at)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_course ON course_enrollments(user_id, course_id)`);

  console.log('Database tables created successfully');
  
  // Seed the database
  await seedDatabase();
}

initDatabase().catch(console.error);
