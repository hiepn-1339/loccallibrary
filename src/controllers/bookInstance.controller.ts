import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as bookInstanceService from '../services/bookInstance.service';
import { t } from 'i18next';
import { BookInstance } from '../entities/bookInstance.entity';

interface IBookInstanceRequest extends Request {
  bookInstance?: BookInstance;
}

export const checkExistsBookInstance = async (req: IBookInstanceRequest, res: Response, next: NextFunction) => {
  const bookInstance = await bookInstanceService.bookInstanceDetail(parseInt(req.params.id));
  if (bookInstance === null) {
    res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
  }

  req.bookInstance = bookInstance;
  next();
};

export const bookInstanceList = asyncHandler(async (req: Request, res: Response) => {
  const bookInstances = await bookInstanceService.bookInstanceList();
  res.render('bookInstances/index', { bookInstances, title: t('home.bookInstanceList') });
});

export const bookInstanceDetail = [checkExistsBookInstance, (req: IBookInstanceRequest, res: Response) => {
  res.render('bookInstances/show', {
    bookInstance: req.bookInstance,
    book: req.bookInstance?.book,
  });
}];

export const bookInstanceCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: BookInstance create');
};

export const bookInstanceUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: BookInstance update: ${req.params.id}`);
};

export const bookInstanceDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: BookInstance delete: ${req.params.id}`);
};
