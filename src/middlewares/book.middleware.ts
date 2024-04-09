import { Request, Response, NextFunction } from 'express';

export const checkValidGenreBook = (req: Request, res: Response, next: NextFunction) => {
  if (!Array.isArray(req.body.genre)) {
    req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    next();
  }
};
