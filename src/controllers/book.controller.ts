import { Request, Response } from 'express';

export const bookList = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Book list');
};

export const bookDetail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

export const bookCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Book create');
};

export const bookUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Book update: ${req.params.id}`);
};

export const bookDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Book delete: ${req.params.id}`);
};
