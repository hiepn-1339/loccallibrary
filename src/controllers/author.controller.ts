import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as authorService from '../services/author.service';
import { t } from 'i18next';

export const authorList = asyncHandler(async (req: Request, res: Response) => {
  const authors = await authorService.authorList();
  res.render('authors/index', { authors, title: t('home.authorList') });
});

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
