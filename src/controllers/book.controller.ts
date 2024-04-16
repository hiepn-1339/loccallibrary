import * as bookService from './../services/book.service';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { t } from 'i18next';


export const bookList = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookService.bookList();
  res.render('books/index', { books, title: t('home.bookList') });
});

export const bookDetail = (req: Request, res: Response) => {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

export const bookCreate = (req: Request, res: Response) => {
  res.send('NOT IMPLEMENTED: Book create');
};

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
