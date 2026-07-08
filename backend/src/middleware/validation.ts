import { Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AuthenticatedRequest, AppError } from '.';

/**
 * Validation middleware factory.
 * Creates middleware that validates request body against a Zod schema.
 */
export function validateBody<T>(schema: any) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');
        throw new AppError(400, `Validation error: ${errorMessage}`);
      }
      throw error;
    }
  };
}

/**
 * Validation middleware factory.
 * Creates middleware that validates request params against a Zod schema.
 */
export function validateParams<T>(schema: any) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');
        throw new AppError(400, `Validation error: ${errorMessage}`);
      }
      throw error;
    }
  };
}

/**
 * Validation middleware factory.
 * Creates middleware that validates request query against a Zod schema.
 */
export function validateQuery<T>(schema: any) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors
          .map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', ');
        throw new AppError(400, `Validation error: ${errorMessage}`);
      }
      throw error;
    }
  };
}
