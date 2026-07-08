import { migrate } from 'drizzle-orm/libsql/migrator';
import db from './index';
import { seedDatabase } from './seed';

async function initDatabase() {
  console.log('Running database migrations...');
  
  // Run migrations using Drizzle
  await migrate(db, { migrationsFolder: './src/database/migrations' });
  
  console.log('Migrations completed successfully');
  
  // Seed the database
  await seedDatabase();
}

initDatabase().catch(console.error);
