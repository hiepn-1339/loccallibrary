import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as bookInstanceService from '../services/bookInstance.service';
import { t } from 'i18next';

export const bookInstanceList = asyncHandler(async (req: Request, res: Response) => {
  const bookInstances = await bookInstanceService.bookInstanceList();
  res.render('bookInstances/index', { bookInstances, title: t('home.bookInstanceList') });
});

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
