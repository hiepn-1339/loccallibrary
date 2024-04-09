import { Request, Response } from 'express';

export const genreList = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Genre list');
};

export const genreDetail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
};

export const genreCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Genre create');
};

export const genreUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre update: ${req.params.id}`);
};

export const genreDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Genre delete: ${req.params.id}`);
};
