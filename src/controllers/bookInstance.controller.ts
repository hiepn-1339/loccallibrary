import { Request, Response } from 'express';

export const bookInstanceList = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: BookInstance list');
};

export const bookInstanceDetail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
};

export const bookInstanceCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: BookInstance create');
};

export const bookInstanceUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: BookInstance update: ${req.params.id}`);
};

export const bookInstanceDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: BookInstance delete: ${req.params.id}`);
};
