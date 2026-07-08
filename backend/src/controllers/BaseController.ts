import { Request, Response, NextFunction } from 'express';

export abstract class BaseController {
  protected async handleRequest(
    handler: (req: Request, res: Response) => Promise<void>,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  }
}
