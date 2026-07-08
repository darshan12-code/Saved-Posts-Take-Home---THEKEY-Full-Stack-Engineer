export abstract class BaseService {
  protected async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      // Error handling will be implemented in concrete services
      throw error;
    }
  }
}
