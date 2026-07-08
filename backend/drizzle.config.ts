import type { Config } from 'drizzle-kit';

export default {
  schema: './src/database/schema/index.ts',
  out: './src/database/migrations',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:./database.sqlite',
  },
} satisfies Config;
