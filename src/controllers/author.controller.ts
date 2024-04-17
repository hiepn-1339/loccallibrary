import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as authorService from '../services/author.service';
import { t } from 'i18next';
import { Author } from '../entities/author.entity';
import { validationResult, Result, body } from 'express-validator';
import * as authMiddleware from '../middlewares/author.middleware';
import { ActionForm } from '../constant';
import { checkValidId } from '../middlewares';

interface IAuthorRequest extends Request {
  author?: Author;
}

const checkExistsAuthor = async (req: IAuthorRequest, res: Response, next: NextFunction) => {
  const author = await authorService.authorDetail(parseInt(req.params.id));
  if (author === null) {
    res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
  }

  req.author = author;
  next();
};

export const authorList = asyncHandler(async (req: Request, res: Response) => {
  const authors = await authorService.authorList();
  res.render('authors/index', { authors, title: t('home.authorList') });
});

export const authorDetail = [checkExistsAuthor, (req: IAuthorRequest, res: Response) => {
  res.render('authors/show', {
    author: req.author,
    books: req.author?.books,
  });
}];

export const authorCreateGet = (req: Request, res: Response) => {
  res.render('authors/form', { title: t('home.createAuthor'), action: ActionForm.Create });
};

export const authorCreatePost = [
  body('firstName', t('error.firstNameMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('familyName', t('error.familyNameMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  authMiddleware.checkValidDateOfBirth,
  authMiddleware.checkValidDateOfDeath, 
  (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (errors.isEmpty()) {
      const newAuthor = authorService.authorCreate(req.body);

      if (newAuthor) {
        res.redirect(`/author/${newAuthor.id}`);
      } else {
        res.redirect('/author');
      }
    }

    res.render('authors/form', {
      title: t('home.createAuthor'),
      action: 'create',
      errors: errors.array(),
    });
  },
];

export const authorUpdateGet = [checkValidId, checkExistsAuthor, (req: IAuthorRequest, res: Response) => {
  res.render('authors/form', { title: t('home.updateAuthor'), action: ActionForm.Update, author: req.author });
}];

export const authorUpdatePost = [
  checkValidId,
  body('firstName', t('error.firstNameMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('familyName', t('error.familyNameMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  authMiddleware.checkValidDateOfBirth,
  authMiddleware.checkValidDateOfDeath,  
  checkExistsAuthor, 
  asyncHandler(async (req: IAuthorRequest, res: Response) => {
  const errors: Result = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('authors/form', {
      title: t('home.updateAuthor'),
      action: ActionForm.Update,
      author: req.body,
      errors: errors.array(),
    });
  }

  const newAuthor = await authorService.authorUpdate(req.author, req.body);
  if (newAuthor) {
    res.redirect('/');
  } else {
    res.redirect('/author');
  }
})];

export const authorDeleteGet = [checkValidId, checkExistsAuthor, (req: IAuthorRequest, res: Response) => {
  const allBooksByAuthor = req.author?.books;
  res.render('authors/delete', { title: t('home.deleteAuthor'), author: req.author, authorBooks: allBooksByAuthor });
}];

export const authorDeletePost = [checkValidId, checkExistsAuthor, asyncHandler(async (req: IAuthorRequest, res: Response) => {
  const allBooksByAuthor = req.author?.books;
  if (allBooksByAuthor && allBooksByAuthor.length > 0) {
    res.render('authors/delete', {
      title: t('home.deleteAuthor'),
      author: req.author,
      authorBooks: allBooksByAuthor,
    });
    return;
  } else {
    await authorService.authorDelete(parseInt(req.params.id));
    res.redirect('/author');
  }
})];
