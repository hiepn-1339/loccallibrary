import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as bookInstanceService from '../services/bookInstance.service';
import { t } from 'i18next';
import { BookInstance } from '../entities/bookInstance.entity';
import { ActionForm, BookInstanceStatus } from '../constant';
import { checkValidId } from '../middlewares';
import { Result, body, validationResult } from 'express-validator';

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

export const bookInstanceCreateGet = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookInstanceService.bookInstanceCreateGet();
  res.render('bookInstances/form', { title: t('home.createBook'), action: ActionForm.Create, books, statuses: BookInstanceStatus });
});

export const bookInstanceCreatePost = [
  body('imprint', t('error.imprintMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('status', t('error.statusMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('book', t('error.bookMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: IBookInstanceRequest, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      const books = await bookInstanceService.bookInstanceCreateGet();
      res.render('bookInstances/form', {
        title: t('home.createBook'),
        action: ActionForm.Create,
        books,
        statuses: BookInstanceStatus,
        bookInstance: req.body,
        errors: errors.array(),
      });
    }

    const newBookInstance = bookInstanceService.bookInstanceCreatePost(req.body);
    res.redirect(`/bookInstance/${newBookInstance.id}`);
  }),
];

export const bookInstanceUpdateGet = [checkValidId, checkExistsBookInstance, asyncHandler(async (req: IBookInstanceRequest, res: Response) => {
  const books = await bookInstanceService.bookInstanceCreateGet();
  res.render('bookInstances/form', { title: t('home.updateBook'), action: ActionForm.Update, books, bookInstance: req.bookInstance, statuses: BookInstanceStatus });
})];

export const bookInstanceUpdatePost = [
  checkValidId, 
  body('imprint', t('error.imprintMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('status', t('error.statusMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('book', t('error.bookMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  checkExistsBookInstance, 
  asyncHandler(async (req: IBookInstanceRequest, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      const books = await bookInstanceService.bookInstanceCreateGet();
      res.render('bookInstances/form', {
        title: t('home.updateBook'),
        action: ActionForm.Update,
        books,
        statuses: BookInstanceStatus,
        bookInstance: req.body,
        errors: errors.array(),
      });
    }

    const updatedBookInstance = await bookInstanceService.bookInstanceUpdatePost(req.bookInstance, req.body);
    res.redirect(`/bookInstance/${updatedBookInstance.id}`);
  },
)];

export const bookInstanceDeleteGet = [checkValidId, checkExistsBookInstance, (req: IBookInstanceRequest, res: Response) => {
  res.render('bookInstances/delete', { title: t('home.deleteBook'), bookInstance: req.bookInstance });
}];

export const bookInstanceDeletePost = [checkValidId, checkExistsBookInstance, asyncHandler(async (req: Request, res: Response) => {
  await bookInstanceService.bookInstanceDeletePost(parseInt(req.params.id));
  res.redirect('/bookInstance');
})];
