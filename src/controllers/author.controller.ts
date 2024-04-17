import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as authorService from '../services/author.service';
import { t } from 'i18next';
import { Author } from '../entities/author.entity';

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

export const authorUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Author update: ${req.params.id}`);
};

export const authorDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Author delete: ${req.params.id}`);
};
