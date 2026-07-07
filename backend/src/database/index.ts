import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { schema } from './schema';
import path from 'path';

const dbPath = path.join(__dirname, '..', '..', 'database.sqlite');

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(client, { schema });

export default db;
