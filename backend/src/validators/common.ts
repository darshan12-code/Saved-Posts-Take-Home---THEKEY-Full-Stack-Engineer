import { z } from 'zod';

/**
 * Common validation schemas
 */
export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
});

export const idParamSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

export const courseIdParamSchema = z.object({
  courseId: z.string().transform((val) => parseInt(val, 10)),
});

export const postIdParamSchema = z.object({
  postId: z.string().transform((val) => parseInt(val, 10)),
});
