import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, AppError } from '.';

/**
 * Authentication stub middleware.
 * 
 * In production, this would validate JWT tokens or session cookies.
 * For this assessment, it stubs authentication by reading user info from headers.
 * 
 * Headers expected:
 * - X-User-Id: numeric user ID
 * - X-User-Email: user email
 * - X-User-Name: user name
 * - X-User-Role: 'student' or 'moderator'
 */
export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const userId = req.headers['x-user-id'];
  const userEmail = req.headers['x-user-email'];
  const userName = req.headers['x-user-name'];
  const userRole = req.headers['x-user-role'];

  // For development/testing, if no auth headers provided, use a default student
  // This allows the API to be tested without setting headers
  if (!userId || !userEmail || !userName || !userRole) {
    req.user = {
      id: 1,
      email: 'student1@example.com',
      name: 'Student One',
      role: 'student',
    };
    next();
    return;
  }

  const parsedUserId = parseInt(userId as string, 10);
  if (isNaN(parsedUserId)) {
    throw new AppError(401, 'Invalid user ID');
  }

  if (userRole !== 'student' && userRole !== 'moderator') {
    throw new AppError(401, 'Invalid user role');
  }

  req.user = {
    id: parsedUserId,
    email: userEmail as string,
    name: userName as string,
    role: userRole as 'student' | 'moderator',
  };

  next();
}
