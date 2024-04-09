import * as bookService from './../services/book.service';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { t } from 'i18next';
import { Book } from '../entities/book.entity';

interface IBookRequest extends Request {
  book?: Book;
}

export const checkExistsBook = async (req: IBookRequest, res: Response, next: NextFunction) => {
  const book = await bookService.bookDetail(parseInt(req.params.id));
  if (book === null) {
    res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
  }

  req.book = book;
  next();
};

export const bookList = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookService.bookList();
  res.render('books/index', { books, title: t('home.bookList') });
});

export const bookDetail = [checkExistsBook, (req: IBookRequest, res: Response) => {
  res.render('books/show', {
    book: req.book,
    bookInstances: req.book?.bookInstances,
    bookGenres: req.book?.genres,
  });
}];

export const bookCreate = asyncHandler((req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Book create');
});

export const bookUpdate = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Book update: ${req.params.id}`);
};

export const bookDelete = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Book delete: ${req.params.id}`);
};

export const index = asyncHandler(async (req: Request, res: Response) => {
  const [numBooks, numBookInstances, availableBookInstances, numAuthors, numGenres] = await bookService.index();

  res.render('index', {
    title: t('home.sunAsterisk'),
    book_count: numBooks,
    book_instance_count: numBookInstances,
    book_instance_available_count: availableBookInstances[1],
    author_count: numAuthors,
    genre_count: numGenres,
  });
});
