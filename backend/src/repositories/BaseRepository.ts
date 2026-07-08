import { eq, and, desc, SQL } from 'drizzle-orm';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';

export abstract class BaseRepository<T extends SQLiteTable> {
  constructor(protected table: T) {}

  protected async findById(id: number) {
    // Implementation will be added in concrete repositories
    throw new Error('Method not implemented');
  }

  protected async findMany(conditions?: SQL[]) {
    // Implementation will be added in concrete repositories
    throw new Error('Method not implemented');
  }

  protected async create(data: any) {
    // Implementation will be added in concrete repositories
    throw new Error('Method not implemented');
  }

  protected async update(id: number, data: any) {
    // Implementation will be added in concrete repositories
    throw new Error('Method not implemented');
  }

  protected async delete(id: number) {
    // Implementation will be added in concrete repositories
    throw new Error('Method not implemented');
  }
}
