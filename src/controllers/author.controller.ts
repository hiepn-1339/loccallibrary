import { Request, Response } from 'express';

export const authorList = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Author list');
};

export const authorDetail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};

export const authorCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Author create');
};

export const authorUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Author update: ${req.params.id}`);
};

export const authorDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Author delete: ${req.params.id}`);
};
